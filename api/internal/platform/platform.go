// Package platform owns AXON tenancy, API credentials, workspaces, and request replay.
package platform

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"sort"
	"strings"
	"sync"
	"time"
)

var ErrUnauthorized = errors.New("unauthorized")
var ErrNotFound = errors.New("resource not found")
var ErrIdempotencyConflict = errors.New("idempotency key reused with a different request")
var ErrIdempotencyInProgress = errors.New("idempotency request is in progress")

type Organization struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
}
type Workspace struct {
	ID             string    `json:"id"`
	OrganizationID string    `json:"organization_id"`
	Name           string    `json:"name"`
	CreatedAt      time.Time `json:"created_at"`
}
type Principal struct{ OrganizationID string }
type Replay struct {
	Fingerprint string
	Status      int
	Body        []byte
	ContentType string
}

type Store interface {
	CreateOrganization(context.Context, Organization) error
	CreateAPIKey(context.Context, string, string) error
	Authenticate(context.Context, string) (Principal, error)
	CreateWorkspace(context.Context, Workspace) error
	GetWorkspace(context.Context, string) (Workspace, error)
	ListWorkspaces(context.Context, string, int, string) ([]Workspace, string, error)
	ClaimReplay(context.Context, string, string, string) (Replay, bool, error)
	CompleteReplay(context.Context, string, string, Replay) error
}

type Service struct{ store Store }

func NewService(store Store) *Service { return &Service{store: store} }
func (s *Service) CreateOrganization(ctx context.Context, name string) (Organization, string, error) {
	org := Organization{ID: newID("org"), Name: strings.TrimSpace(name), CreatedAt: time.Now().UTC()}
	if org.Name == "" {
		return Organization{}, "", errors.New("organization name is required")
	}
	key, hash := newAPIKey()
	if err := s.store.CreateOrganization(ctx, org); err != nil {
		return Organization{}, "", err
	}
	if err := s.store.CreateAPIKey(ctx, org.ID, hash); err != nil {
		return Organization{}, "", err
	}
	return org, key, nil
}
func (s *Service) Authenticate(ctx context.Context, raw string) (Principal, error) {
	return s.store.Authenticate(ctx, raw)
}
func (s *Service) CreateWorkspace(ctx context.Context, organizationID, name string) (Workspace, error) {
	workspace := Workspace{ID: newID("ws"), OrganizationID: organizationID, Name: strings.TrimSpace(name), CreatedAt: time.Now().UTC()}
	if workspace.Name == "" {
		return Workspace{}, errors.New("workspace name is required")
	}
	if err := s.store.CreateWorkspace(ctx, workspace); err != nil {
		return Workspace{}, err
	}
	return workspace, nil
}
func (s *Service) Workspace(ctx context.Context, id, organizationID string) (Workspace, error) {
	workspace, err := s.store.GetWorkspace(ctx, id)
	if err != nil {
		return Workspace{}, err
	}
	if workspace.OrganizationID != organizationID {
		return Workspace{}, ErrNotFound
	}
	return workspace, nil
}
func (s *Service) ListWorkspaces(ctx context.Context, org string, limit int, cursor string) ([]Workspace, string, error) {
	return s.store.ListWorkspaces(ctx, org, limit, cursor)
}
func (s *Service) ClaimReplay(ctx context.Context, org, key, fingerprint string) (Replay, bool, error) {
	return s.store.ClaimReplay(ctx, org, key, fingerprint)
}
func (s *Service) StoreReplay(ctx context.Context, org, key, fingerprint string, status int, body []byte, contentType string) error {
	return s.store.CompleteReplay(ctx, org, key, Replay{Fingerprint: fingerprint, Status: status, Body: body, ContentType: contentType})
}

type MemoryStore struct {
	mu         sync.RWMutex
	orgs       map[string]Organization
	keys       map[string]string
	workspaces map[string]Workspace
	replays    map[string]Replay
}

func NewMemoryStore() *MemoryStore {
	return &MemoryStore{orgs: map[string]Organization{}, keys: map[string]string{}, workspaces: map[string]Workspace{}, replays: map[string]Replay{}}
}
func (s *MemoryStore) CreateOrganization(_ context.Context, org Organization) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.orgs[org.ID] = org
	return nil
}
func (s *MemoryStore) CreateAPIKey(_ context.Context, org, hash string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.keys[hash] = org
	return nil
}
func (s *MemoryStore) Authenticate(_ context.Context, raw string) (Principal, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	org, ok := s.keys[hashKey(raw)]
	if !ok {
		return Principal{}, ErrUnauthorized
	}
	return Principal{OrganizationID: org}, nil
}
func (s *MemoryStore) CreateWorkspace(_ context.Context, w Workspace) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.workspaces[w.ID] = w
	return nil
}
func (s *MemoryStore) GetWorkspace(_ context.Context, id string) (Workspace, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	w, ok := s.workspaces[id]
	if !ok {
		return Workspace{}, ErrNotFound
	}
	return w, nil
}
func (s *MemoryStore) ListWorkspaces(_ context.Context, org string, limit int, cursor string) ([]Workspace, string, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	var all []Workspace
	for _, w := range s.workspaces {
		if w.OrganizationID == org {
			all = append(all, w)
		}
	}
	sort.Slice(all, func(i, j int) bool { return all[i].ID < all[j].ID })
	start := 0
	if cursor != "" {
		for i, w := range all {
			if w.ID == cursor {
				start = i + 1
				break
			}
		}
	}
	end := start + limit
	if end > len(all) {
		end = len(all)
	}
	next := ""
	if end < len(all) {
		next = all[end-1].ID
	}
	return all[start:end], next, nil
}
func (s *MemoryStore) ClaimReplay(_ context.Context, org, key, fingerprint string) (Replay, bool, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	storageKey := org + ":" + key
	replay, ok := s.replays[storageKey]
	if !ok {
		s.replays[storageKey] = Replay{Fingerprint: fingerprint}
		return Replay{}, false, nil
	}
	if replay.Fingerprint != fingerprint {
		return Replay{}, false, ErrIdempotencyConflict
	}
	if replay.Status == 0 {
		return Replay{}, false, ErrIdempotencyInProgress
	}
	return replay, true, nil
}
func (s *MemoryStore) CompleteReplay(_ context.Context, org, key string, r Replay) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	storageKey := org + ":" + key
	claimed, ok := s.replays[storageKey]
	if !ok || claimed.Fingerprint != r.Fingerprint {
		return ErrNotFound
	}
	s.replays[storageKey] = r
	return nil
}

func newID(prefix string) string {
	b := make([]byte, 8)
	_, _ = rand.Read(b)
	return prefix + "_" + hex.EncodeToString(b)
}
func newAPIKey() (string, string) {
	b := make([]byte, 24)
	_, _ = rand.Read(b)
	raw := "axon_" + hex.EncodeToString(b)
	return raw, hashKey(raw)
}
func hashKey(raw string) string { sum := sha256.Sum256([]byte(raw)); return hex.EncodeToString(sum[:]) }

// HashAPIKey returns the database representation of an AXON API key.
// API keys are high-entropy random values, so a deterministic hash permits
// lookup without retaining the plaintext credential.
func HashAPIKey(raw string) string { return hashKey(raw) }
