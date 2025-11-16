# Momentum Frontend

React + TypeScript + Vite frontend for the Momentum fitness diary application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
Create a `.env` file with:
```
VITE_API_URL=http://localhost:8080
```

3. Run development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

- **Register**: Create a new user account
- **Entries**: Log workout entries with categories and notes
- **Goals**: Set and track fitness goals
- **Analysis**: Get AI-powered workout analysis and recommendations

## API Integration

The frontend connects to the Go backend API. Make sure the backend is running on the configured `VITE_API_URL`.

## User ID

After registration, your user ID is saved in localStorage. You can use it across all pages to interact with your data.

## Build for Production

```bash
npm run build
npm run preview
```
