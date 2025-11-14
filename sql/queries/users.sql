-- name: CreateUser :exec
INSERT INTO users (id, created_at, updated_at, name, email, password_hash)
VALUES (
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
);
--

-- name: GetUser :one
SELECT * FROM users WHERE email = ?;
--
