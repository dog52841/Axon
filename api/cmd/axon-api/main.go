package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/axon/api/internal/agent"
	"github.com/axon/api/internal/httpapi"
	"github.com/axon/api/internal/platform"
)

func main() {
	logger := log.New(os.Stdout, "axon-api ", log.LstdFlags|log.LUTC)
	store := agent.NewMemoryStore()
	service := agent.NewService(store)
	platformService := platform.NewService(platform.NewMemoryStore())
	address := os.Getenv("AXON_API_ADDR")
	if address == "" {
		address = "127.0.0.1:4318"
	}
	server := &http.Server{Addr: address, Handler: httpapi.NewRouter(service, platformService, os.Getenv("AXON_BOOTSTRAP_TOKEN"), logger), ReadHeaderTimeout: 5 * time.Second, IdleTimeout: 60 * time.Second}
	logger.Printf("listening on %s", server.Addr)
	errs := make(chan error, 1)
	go func() { errs <- server.ListenAndServe() }()
	select {
	case err := <-errs:
		if err != nil && err != http.ErrServerClosed {
			logger.Printf("server stopped: %v", err)
			os.Exit(1)
		}
	case <-shutdownSignal():
		logger.Print("shutdown requested")
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := server.Shutdown(ctx); err != nil {
			logger.Printf("graceful shutdown failed: %v", err)
		}
	}
}

func shutdownSignal() <-chan os.Signal {
	signals := make(chan os.Signal, 1)
	signal.Notify(signals, os.Interrupt, syscall.SIGTERM)
	return signals
}
