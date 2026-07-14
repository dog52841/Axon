package platform

import (
	"context"
	"errors"
	"testing"
)

func TestReplayClaimPreventsConcurrentDuplicateWork(t *testing.T) {
	service := NewService(NewMemoryStore())
	org, _, err := service.CreateOrganization(context.Background(), "Acme")
	if err != nil {
		t.Fatal(err)
	}
	if _, found, err := service.ClaimReplay(context.Background(), org.ID, "create-1", "fingerprint"); err != nil || found {
		t.Fatalf("first claim = found %t, err %v", found, err)
	}
	if _, _, err := service.ClaimReplay(context.Background(), org.ID, "create-1", "fingerprint"); !errors.Is(err, ErrIdempotencyInProgress) {
		t.Fatalf("duplicate in progress error = %v", err)
	}
	if err := service.StoreReplay(context.Background(), org.ID, "create-1", "fingerprint", 201, []byte(`{"id":"ws_1"}`), "application/json"); err != nil {
		t.Fatal(err)
	}
	replay, found, err := service.ClaimReplay(context.Background(), org.ID, "create-1", "fingerprint")
	if err != nil || !found {
		t.Fatalf("completed claim = found %t, err %v", found, err)
	}
	if replay.Status != 201 || string(replay.Body) != `{"id":"ws_1"}` {
		t.Fatalf("unexpected replay: %#v", replay)
	}
}

func TestReplayClaimRejectsDifferentRequest(t *testing.T) {
	service := NewService(NewMemoryStore())
	org, _, err := service.CreateOrganization(context.Background(), "Acme")
	if err != nil {
		t.Fatal(err)
	}
	if _, _, err := service.ClaimReplay(context.Background(), org.ID, "create-1", "first"); err != nil {
		t.Fatal(err)
	}
	if _, _, err := service.ClaimReplay(context.Background(), org.ID, "create-1", "second"); !errors.Is(err, ErrIdempotencyConflict) {
		t.Fatalf("different request error = %v", err)
	}
}
