# SEDS SL project management Frontend

Frontend for the SEDS SL project management and team collaboration web application.

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm (Install via: `npm install -g pnpm`)

### Setup Instructions

```bash
# Clone the repository
git clone https://github.com/sedssrilanka/sedssl-pm-frontend
cd sedssl-pm-frontend

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

> App will be running at [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```bash
.
├── src/
├── tsconfig.json
└── tailwind.config.ts
```

---

## Scripts

| Script       | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start the dev server     |
| `pnpm build` | Build the production app |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

## Git Workflow

- Create a new branch for each task or feature:

```bash
git checkout -b feat/your-feature-name
```

- Use **Conventional Commits** for commit messages:

| Type        | Description                    |
| ----------- | ------------------------------ |
| `feat:`     | New feature                    |
| `fix:`      | Bug fix                        |
| `docs:`     | Documentation update           |
| `style:`    | Code style (formatting) only   |
| `refactor:` | Code restructure, no new logic |
| `chore:`    | Maintenance (deps, config)     |

**Examples:**

```bash
git commit -m "feat: implement user registration"
git commit -m "docs: update README with setup guide"
```
