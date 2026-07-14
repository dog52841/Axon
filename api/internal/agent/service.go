package agent

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"strings"
	"time"
)

type Service struct{ store Store }

func NewService(store Store) *Service { return &Service{store: store} }

func (s *Service) Create(ctx context.Context, input CreateInput) (Agent, error) {
	agent := Agent{ID: newID("agt"), Workspace: strings.TrimSpace(input.Workspace), Name: strings.TrimSpace(input.Name), Goal: strings.TrimSpace(input.Goal), Status: StatusActive, CreatedAt: time.Now().UTC()}
	if err := s.store.Create(ctx, agent); err != nil {
		return Agent{}, err
	}
	_ = s.store.AppendLog(ctx, agent.ID, Log{At: agent.CreatedAt, Kind: "agent.created", Message: "Agent created"})
	return agent, nil
}

func (s *Service) Pause(ctx context.Context, id string) (Agent, error) {
	return s.transition(ctx, id, StatusPaused, "agent.paused")
}
func (s *Service) Resume(ctx context.Context, id string) (Agent, error) {
	return s.transition(ctx, id, StatusActive, "agent.resumed")
}

func (s *Service) Run(ctx context.Context, id string) (Run, error) {
	agent, err := s.store.Get(ctx, id)
	if err != nil {
		return Run{}, err
	}
	if agent.Status == StatusPaused {
		return Run{}, ErrPaused
	}
	run := Run{ID: newID("run"), AgentID: id, Status: "queued", CreatedAt: time.Now().UTC()}
	if err := s.store.CreateRun(ctx, run); err != nil {
		return Run{}, err
	}
	_ = s.store.AppendLog(ctx, id, Log{At: run.CreatedAt, Kind: "run.queued", Message: "Run queued for execution"})
	return run, nil
}

func (s *Service) Logs(ctx context.Context, id string) ([]Log, error) { return s.store.Logs(ctx, id) }
func (s *Service) Get(ctx context.Context, id string) (Agent, error)  { return s.store.Get(ctx, id) }

func (s *Service) transition(ctx context.Context, id string, status Status, event string) (Agent, error) {
	agent, err := s.store.UpdateStatus(ctx, id, status)
	if err != nil {
		return Agent{}, err
	}
	_ = s.store.AppendLog(ctx, id, Log{At: time.Now().UTC(), Kind: event, Message: "Agent status changed to " + string(status)})
	return agent, nil
}

var ErrPaused = &StateError{Message: "agent is paused"}

type StateError struct{ Message string }

func (e *StateError) Error() string { return e.Message }

func newID(prefix string) string {
	b := make([]byte, 8)
	_, _ = rand.Read(b)
	return prefix + "_" + hex.EncodeToString(b)
}
