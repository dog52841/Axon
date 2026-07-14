package agent

import (
	"context"
	"sync"
)

// MemoryStore is a development adapter. Postgres will implement Store without
// changing HTTP handlers or the agent service.
type MemoryStore struct {
	mu     sync.RWMutex
	agents map[string]Agent
	logs   map[string][]Log
	runs   map[string]Run
}

func NewMemoryStore() *MemoryStore {
	return &MemoryStore{agents: map[string]Agent{}, logs: map[string][]Log{}, runs: map[string]Run{}}
}
func (s *MemoryStore) Create(_ context.Context, a Agent) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.agents[a.ID] = a
	return nil
}
func (s *MemoryStore) Get(_ context.Context, id string) (Agent, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	a, ok := s.agents[id]
	if !ok {
		return Agent{}, ErrNotFound
	}
	return a, nil
}
func (s *MemoryStore) UpdateStatus(_ context.Context, id string, status Status) (Agent, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	a, ok := s.agents[id]
	if !ok {
		return Agent{}, ErrNotFound
	}
	a.Status = status
	s.agents[id] = a
	return a, nil
}
func (s *MemoryStore) CreateRun(_ context.Context, r Run) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	s.runs[r.ID] = r
	return nil
}
func (s *MemoryStore) Logs(_ context.Context, id string) ([]Log, error) {
	if _, err := s.Get(context.Background(), id); err != nil {
		return nil, err
	}
	s.mu.RLock()
	defer s.mu.RUnlock()
	return append([]Log(nil), s.logs[id]...), nil
}
func (s *MemoryStore) AppendLog(_ context.Context, id string, log Log) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	if _, ok := s.agents[id]; !ok {
		return ErrNotFound
	}
	s.logs[id] = append(s.logs[id], log)
	return nil
}
