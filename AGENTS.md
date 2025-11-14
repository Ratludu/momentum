# Agent Guidelines for momentum

## Build/Test Commands
- Build: `go build ./...`
- Test: `go test ./...`
- Test single file: `go test -run TestSpecificFunction ./path/to/package`
- Lint: `go vet ./...` and `gofmt -s -w .`
- Format: `gofmt -s -w .`

## Code Style Guidelines
- Use standard Go formatting (gofmt)
- Import groups: stdlib, third-party, project packages (blank line between groups)
- Naming: camelCase for variables, PascalCase for exported, snake_case for unexported
- Error handling: always check errors, use fmt.Errorf for wrapping
- Package comments: required for public packages
- Function comments: required for exported functions
- Use go.mod 1.24.9 features where appropriate
- Keep functions small and focused
- Prefer explicit returns over named returns unless clarity improves