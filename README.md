# Streamger

Streamger is a full-stack web application combining a high-performance Rust backend with a modern, reactive frontend.

## 📂 Project Structure

- **`frontend/`**: A React application built with Vite and the TanStack ecosystem.
- **`backend/`**: A Rust API server built with Axum.
- **`docker-compose.yml`**: Orchestrates the multi-container setup for easy deployment.

## 🚀 Tech Stack

### Frontend
- **Framework:** TanStack Start
- **UI Library:** React 19
- **Build Tool:** Vite
- **Routing:** TanStack Router
- **Styling:** Tailwind CSS 4
- **State/Data:** TanStack Query (via plugins)

### Backend
- **Framework:** Axum (Rust)
- **Runtime:** Tokio
- **Documentation:** Utoipa (Swagger UI)
- **Serialization:** Serde
- **HTTP Client:** Reqwest

## 🛠️ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/) & Docker Compose
- *Or for local development:*
  - Node.js (v18+)
  - Rust (latest stable)

### Running with Docker (Recommended)

To spin up the entire application stack:

```bash
docker-compose up --build
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8000](http://localhost:8000)

### Local Development

#### Frontend

```bash
cd frontend
pnpm install
pnpm run dev
```
The development server will start at `http://localhost:3000`.

#### Backend

```bash
cd backend
cargo run
```
The server will start at `http://localhost:8000`.

## 📜 Scripts

### Frontend (`frontend/package.json`)
- `pnpm run dev`: Start dev server
- `pnpm run build`: Build for production
- `pnpm run test`: Run tests with Vitest
- `pnpm run lint`: Lint code with ESLint
- `pnpm run format`: Format code with Prettier

### Backend
- `cargo run`: Run the server
- `cargo check`: Check code without building
