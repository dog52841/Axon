// Package agent contains AXON's provider-neutral runtime contracts.
package agent

import (
	"context"
	"errors"
	"time"
)

type Status string

const (
	StatusActive Status = "active"
	StatusPaused Status = "paused"
)

type Agent struct {
	ID        string    `json:"id"`
	Workspace string    `json:"workspace"`
	Name      string    `json:"name"`
	Goal      string    `json:"goal"`
	Status    Status    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

type CreateInput struct {
	Workspace string `json:"workspace"`
	Name      string `json:"name"`
	Goal      string `json:"goal"`
}

type Run struct {
	ID        string    `json:"id"`
	AgentID   string    `json:"agent_id"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
}

type Log struct {
	At      time.Time `json:"at"`
	Kind    string    `json:"kind"`
	Message string    `json:"message"`
}

var ErrNotFound = errors.New("agent not found")

type Store interface {
	Create(context.Context, Agent) error
	Get(context.Context, string) (Agent, error)
	UpdateStatus(context.Context, string, Status) (Agent, error)
	CreateRun(context.Context, Run) error
	Logs(context.Context, string) ([]Log, error)
	AppendLog(context.Context, string, Log) error
}
