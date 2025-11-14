package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/ratludu/momentum/internal/handlers"
	"github.com/ratludu/momentum/internal/storage"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
)

func main() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("warning: assuming default configuration. .env unreadable: %v", err)
	}

	port := os.Getenv("PORT")
	if port == "" {
		log.Fatalf("fatal: port was not set, please set port in env")
	}

	storage.InitDB()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/healthz", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})
	e.POST("/users", handlers.CreateUsers)

	e.Logger.Fatal(e.Start(port))
}
