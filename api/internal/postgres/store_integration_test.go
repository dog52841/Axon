package postgres_test

import (
	"context"
	"database/sql"
	"errors"
	"os"
	"path/filepath"
	"runtime"
	"testing"

	"github.com/axon/api/internal/agent"
	"github.com/axon/api/internal/platform"
	store "github.com/axon/api/internal/postgres"
	"github.com/golang-migrate/migrate/v4"
	migratepostgres "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/jackc/pgx/v5/stdlib"
)

func TestPostgresStorePersistsResourcesAndTransactions(t *testing.T) {
	pool := integrationPool(t)
	resetDatabase(t, pool)
	ctx := context.Background()
	persistence := store.NewStore(pool)
	platformService := platform.NewService(persistence)
	agentService := agent.NewService(persistence)

	organization, key, err := platformService.CreateOrganization(ctx, "Acme")
	if err != nil {
		t.Fatal(err)
	}
	if _, err := platformService.Authenticate(ctx, key); err != nil {
		t.Fatalf("authenticate created API key: %v", err)
	}
	workspace, err := platformService.CreateWorkspace(ctx, organization.ID, "Production")
	if err != nil {
		t.Fatal(err)
	}
	created, err := agentService.Create(ctx, agent.CreateInput{Workspace: workspace.ID, Name: "research", Goal: "find opportunities"})
	if err != nil {
		t.Fatal(err)
	}
	if _, err := agentService.Run(ctx, created.ID); err != nil {
		t.Fatal(err)
	}
	logs, err := agentService.Logs(ctx, created.ID)
	if err != nil || len(logs) != 2 {
		t.Fatalf("logs = %d, %v", len(logs), err)
	}

	rollback := errors.New("rollback")
	err = platformService.WithinTransaction(ctx, func(txCtx context.Context) error {
		if _, found, err := platformService.ClaimReplay(txCtx, organization.ID, "workspace-create", "fingerprint"); err != nil || found {
			if err != nil {
				return err
			}
			return errors.New("replay was unexpectedly found")
		}
		if _, err := platformService.CreateWorkspace(txCtx, organization.ID, "Rolled back"); err != nil {
			return err
		}
		return rollback
	})
	if !errors.Is(err, rollback) {
		t.Fatalf("transaction error = %v", err)
	}
	if _, found, err := platformService.ClaimReplay(ctx, organization.ID, "workspace-create", "fingerprint"); err != nil || found {
		t.Fatalf("rollback left replay behind: found %t, err %v", found, err)
	}
	workspaces, _, err := platformService.ListWorkspaces(ctx, organization.ID, 10, "")
	if err != nil || len(workspaces) != 1 {
		t.Fatalf("workspaces = %d, %v", len(workspaces), err)
	}
}

func integrationPool(t *testing.T) *pgxpool.Pool {
	t.Helper()
	databaseURL := os.Getenv("AXON_TEST_DATABASE_URL")
	if databaseURL == "" {
		t.Skip("set AXON_TEST_DATABASE_URL to run PostgreSQL integration tests against a disposable database")
	}
	applyMigrations(t, databaseURL)
	pool, err := pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(pool.Close)
	return pool
}

func applyMigrations(t *testing.T, databaseURL string) {
	t.Helper()
	_, file, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatal("locate integration test")
	}
	migrationsPath := "file://" + filepath.ToSlash(filepath.Join(filepath.Dir(file), "..", "..", "migrations"))
	db, err := sql.Open("pgx", databaseURL)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = db.Close() })
	driver, err := migratepostgres.WithInstance(db, &migratepostgres.Config{})
	if err != nil {
		t.Fatal(err)
	}
	migration, err := migrate.NewWithDatabaseInstance(migrationsPath, "postgres", driver)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _, _ = migration.Close() })
	if err := migration.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		t.Fatal(err)
	}
}

func resetDatabase(t *testing.T, pool *pgxpool.Pool) {
	t.Helper()
	_, err := pool.Exec(context.Background(), `TRUNCATE organizations CASCADE`)
	if err != nil {
		t.Fatal(err)
	}
}
