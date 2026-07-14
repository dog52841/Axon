// Package database provides the narrow transaction boundary used by PostgreSQL
// repositories. Application services remain unaware of pgx types.
package database

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

type executor interface {
	Exec(context.Context, string, ...any) (pgconn.CommandTag, error)
	Query(context.Context, string, ...any) (pgx.Rows, error)
	QueryRow(context.Context, string, ...any) pgx.Row
}

type transactionKey struct{}

// WithinTransaction commits the operation only when it completes without an
// error. A panic still triggers the deferred rollback.
func WithinTransaction(ctx context.Context, pool *pgxpool.Pool, operation func(context.Context) error) (err error) {
	tx, err := pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer func() { _ = tx.Rollback(context.Background()) }()
	if err := operation(context.WithValue(ctx, transactionKey{}, tx)); err != nil {
		return err
	}
	return tx.Commit(ctx)
}

// Executor selects the active transaction when one is attached to the request
// context, otherwise it uses the shared connection pool.
func Executor(ctx context.Context, pool *pgxpool.Pool) executor {
	if tx, ok := ctx.Value(transactionKey{}).(pgx.Tx); ok {
		return tx
	}
	return pool
}
