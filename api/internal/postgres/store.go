// Package postgres contains AXON's PostgreSQL persistence adapters.
package postgres

import (
	"context"
	"errors"
	"fmt"

	"github.com/axon/api/internal/agent"
	"github.com/axon/api/internal/platform"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Store is the shared PostgreSQL adapter for the current platform and runtime
// repositories. It holds persistence concerns only; lifecycle rules stay in
// the application services.
type Store struct{ pool *pgxpool.Pool }

func NewStore(pool *pgxpool.Pool) *Store { return &Store{pool: pool} }

func (s *Store) CreateOrganization(ctx context.Context, org platform.Organization) error {
	_, err := s.pool.Exec(ctx, `INSERT INTO organizations (id, name, created_at) VALUES ($1, $2, $3)`, org.ID, org.Name, org.CreatedAt)
	return err
}

func (s *Store) CreateAPIKey(ctx context.Context, organizationID, hash string) error {
	_, err := s.pool.Exec(ctx, `INSERT INTO api_keys (id, organization_id, name, key_hash, prefix, created_at) VALUES ($1, $2, $3, $4, $5, now())`, hash, organizationID, "Default", hash, "axon_")
	return err
}

func (s *Store) Authenticate(ctx context.Context, raw string) (platform.Principal, error) {
	var organizationID string
	err := s.pool.QueryRow(ctx, `UPDATE api_keys SET last_used_at = now() WHERE key_hash = $1 AND revoked_at IS NULL RETURNING organization_id`, platform.HashAPIKey(raw)).Scan(&organizationID)
	if errors.Is(err, pgx.ErrNoRows) {
		return platform.Principal{}, platform.ErrUnauthorized
	}
	if err != nil {
		return platform.Principal{}, err
	}
	return platform.Principal{OrganizationID: organizationID}, nil
}

func (s *Store) CreateWorkspace(ctx context.Context, workspace platform.Workspace) error {
	_, err := s.pool.Exec(ctx, `INSERT INTO workspaces (id, organization_id, name, created_at) VALUES ($1, $2, $3, $4)`, workspace.ID, workspace.OrganizationID, workspace.Name, workspace.CreatedAt)
	return err
}

func (s *Store) GetWorkspace(ctx context.Context, id string) (platform.Workspace, error) {
	var workspace platform.Workspace
	err := s.pool.QueryRow(ctx, `SELECT id, organization_id, name, created_at FROM workspaces WHERE id = $1`, id).Scan(&workspace.ID, &workspace.OrganizationID, &workspace.Name, &workspace.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return platform.Workspace{}, platform.ErrNotFound
	}
	return workspace, err
}

func (s *Store) ListWorkspaces(ctx context.Context, organizationID string, limit int, cursor string) ([]platform.Workspace, string, error) {
	rows, err := s.pool.Query(ctx, `SELECT id, organization_id, name, created_at FROM workspaces WHERE organization_id = $1 AND id > $2 ORDER BY id ASC LIMIT $3`, organizationID, cursor, limit+1)
	if err != nil {
		return nil, "", err
	}
	defer rows.Close()
	workspaces := make([]platform.Workspace, 0, limit)
	for rows.Next() {
		var workspace platform.Workspace
		if err := rows.Scan(&workspace.ID, &workspace.OrganizationID, &workspace.Name, &workspace.CreatedAt); err != nil {
			return nil, "", err
		}
		workspaces = append(workspaces, workspace)
	}
	if err := rows.Err(); err != nil {
		return nil, "", err
	}
	next := ""
	if len(workspaces) > limit {
		next = workspaces[limit-1].ID
		workspaces = workspaces[:limit]
	}
	return workspaces, next, nil
}

func (s *Store) ClaimReplay(ctx context.Context, organizationID, key, fingerprint string) (platform.Replay, bool, error) {
	result, err := s.pool.Exec(ctx, `INSERT INTO idempotency_keys (organization_id, key, fingerprint, state, created_at) VALUES ($1, $2, $3, 'in_progress', now()) ON CONFLICT DO NOTHING`, organizationID, key, fingerprint)
	if err != nil {
		return platform.Replay{}, false, err
	}
	if result.RowsAffected() == 1 {
		return platform.Replay{}, false, nil
	}
	var storedFingerprint, state string
	err = s.pool.QueryRow(ctx, `SELECT fingerprint, state FROM idempotency_keys WHERE organization_id = $1 AND key = $2`, organizationID, key).Scan(&storedFingerprint, &state)
	if err != nil {
		return platform.Replay{}, false, fmt.Errorf("load idempotency key: %w", err)
	}
	if storedFingerprint != fingerprint {
		return platform.Replay{}, false, platform.ErrIdempotencyConflict
	}
	if state != "completed" {
		return platform.Replay{}, false, platform.ErrIdempotencyInProgress
	}
	var replay platform.Replay
	err = s.pool.QueryRow(ctx, `SELECT response_status, response_body, response_content_type FROM idempotency_keys WHERE organization_id = $1 AND key = $2`, organizationID, key).Scan(&replay.Status, &replay.Body, &replay.ContentType)
	if err != nil {
		return platform.Replay{}, false, fmt.Errorf("load idempotency response: %w", err)
	}
	replay.Fingerprint = fingerprint
	return replay, true, nil
}

func (s *Store) CompleteReplay(ctx context.Context, organizationID, key string, replay platform.Replay) error {
	result, err := s.pool.Exec(ctx, `UPDATE idempotency_keys SET state = 'completed', response_status = $1, response_body = $2, response_content_type = $3, completed_at = now() WHERE organization_id = $4 AND key = $5 AND fingerprint = $6`, replay.Status, replay.Body, replay.ContentType, organizationID, key, replay.Fingerprint)
	if err != nil {
		return err
	}
	if result.RowsAffected() == 0 {
		return platform.ErrNotFound
	}
	return nil
}

func (s *Store) Create(ctx context.Context, value agent.Agent) error {
	_, err := s.pool.Exec(ctx, `INSERT INTO agents (id, workspace_id, name, goal, status, created_at) VALUES ($1, $2, $3, $4, $5, $6)`, value.ID, value.Workspace, value.Name, value.Goal, value.Status, value.CreatedAt)
	return err
}

func (s *Store) Get(ctx context.Context, id string) (agent.Agent, error) {
	var value agent.Agent
	err := s.pool.QueryRow(ctx, `SELECT id, workspace_id, name, goal, status, created_at FROM agents WHERE id = $1`, id).Scan(&value.ID, &value.Workspace, &value.Name, &value.Goal, &value.Status, &value.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return agent.Agent{}, agent.ErrNotFound
	}
	return value, err
}

func (s *Store) UpdateStatus(ctx context.Context, id string, status agent.Status) (agent.Agent, error) {
	var value agent.Agent
	err := s.pool.QueryRow(ctx, `UPDATE agents SET status = $1 WHERE id = $2 RETURNING id, workspace_id, name, goal, status, created_at`, status, id).Scan(&value.ID, &value.Workspace, &value.Name, &value.Goal, &value.Status, &value.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return agent.Agent{}, agent.ErrNotFound
	}
	return value, err
}

func (s *Store) CreateRun(ctx context.Context, run agent.Run) error {
	_, err := s.pool.Exec(ctx, `INSERT INTO runs (id, agent_id, status, created_at) VALUES ($1, $2, $3, $4)`, run.ID, run.AgentID, run.Status, run.CreatedAt)
	return err
}

func (s *Store) Logs(ctx context.Context, agentID string) ([]agent.Log, error) {
	if _, err := s.Get(ctx, agentID); err != nil {
		return nil, err
	}
	rows, err := s.pool.Query(ctx, `SELECT at, kind, message FROM agent_logs WHERE agent_id = $1 ORDER BY id ASC`, agentID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	logs := make([]agent.Log, 0)
	for rows.Next() {
		var entry agent.Log
		if err := rows.Scan(&entry.At, &entry.Kind, &entry.Message); err != nil {
			return nil, err
		}
		logs = append(logs, entry)
	}
	return logs, rows.Err()
}

func (s *Store) AppendLog(ctx context.Context, agentID string, entry agent.Log) error {
	_, err := s.pool.Exec(ctx, `INSERT INTO agent_logs (agent_id, at, kind, message) VALUES ($1, $2, $3, $4)`, agentID, entry.At, entry.Kind, entry.Message)
	return err
}
