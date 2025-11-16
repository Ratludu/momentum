-- +goose Up
CREATE TABLE goals (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    user_id TEXT NOT NULL,
    category TEXT NOT NULL,
    goal TEXT, 
    is_active BOOLEAN NOT NULL DEFAULT 1,
    is_complete BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- +goose Down
DROP TABLE goals;
