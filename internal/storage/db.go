package storage

import (
	"database/sql"
	"github.com/joho/godotenv"
	"log"
	"os"
)

var db *sql.DB

func InitDB() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("warning: assuming default configuration. .env unreadable: %v", err)
	}
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Println("DATABASE_URL environment variable is not set")
		log.Println("Running without CRUD endpoints")
	} else {
		db, err := sql.Open("libsql", dbURL)
		if err != nil {
			log.Fatal(err)

		}

		err = db.Ping()
		if err != nil {
			log.Fatal(err)
		}

		log.Println("Connected to database!")
	}
}

func GetDB() *sql.DB {
	return db
}
