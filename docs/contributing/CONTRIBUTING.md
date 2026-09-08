<!-- Imported from Fotetsa/hullbay master: CONTRIBUTING.md -->
# Contributing to hullbay

Thank you for considering a contribution to hullbay.

This guide outlines the development setup, contribution flow, and quality checks expected for changes to the project.

## Code of conduct

By participating in this project, you agree to respect its code of conduct and to contribute in a constructive and respectful manner.

## Reporting an issue

Before opening an issue, please check whether it already exists in the GitHub issue tracker. Include the following details when relevant:

- steps to reproduce
- expected behavior versus observed behavior
- Node and Docker versions
- relevant logs, with secrets removed

## Proposing a feature

If you want to propose a new capability or workflow, open an issue first to describe the use case and the expected outcome before starting implementation.

## Development environment

### Prerequisites

- Node.js 20 or newer with npm
- A local Docker daemon
- PostgreSQL and Redis for local development

### Start infrastructure dependencies

For local development, only the supporting services are started in containers. The API and web applications run from the workspace in watch mode.

```bash
docker compose up -d postgres redis
```

### Environment variables

```bash
cp .env.template .env

# Generate the master secrets
openssl rand -hex 32   # -> JWT_SECRET
openssl rand -hex 32   # -> MFA_ENCRYPTION_KEY
```

Common local development values are already documented in the template file.

### Install dependencies and prepare the database

```bash
npm install
npm run prisma:generate --workspace @hullbay/shared
npm run prisma:migrate --workspace @hullbay/api
```

### Start the development servers

Run the following in two separate terminals from the repository root:

```bash
npm run predev --workspace @hullbay/shared
npm run dev --workspace @hullbay/api
npm run dev --workspace @hullbay/web
```

The web app runs on port 5273 and calls the API on port 4000. The first launch of the UI should guide you through the bootstrap flow to create the initial owner account.

### Production / Swarm deployment

Production runs as a **Swarm stack** (`docker stack deploy`). The stack **must** contain a Caddy service the API can reach by DNS, otherwise every domain or gateway operation fails with `getaddrinfo EAI_AGAIN caddy`.

Required wiring (mirrors `docker-compose.prod.yml`):

1. **Caddy service in the stack**, on the same overlay networks as the API (the `default` stack network plus the `boz_system` overlay created by `install.sh`), publishing `80` and `443`, mounting `./Caddyfile` and the `caddy_data` / `caddy_config` volumes. Its `deploy` block must set a restart policy (the API will boot-fail DNS lookups while Caddy is down).
2. **API environment**: set `CADDY_ADMIN_URL` to the Caddy admin endpoint that resolves from the API container.
3. **DNS naming (Swarm gotcha)**: services declared **in the stack compose file** resolve by BOTH their compose name (`caddy`, `api`, `web`) and their swarm name (`<stack>_caddy`…). Services added ad-hoc via `docker service create` resolve **only** by their swarm name.

### Monorepo structure

The `packages/shared` package is the single source of truth for shared types and validation rules. Changes affecting the shape of projects, nodes, edges, or connection rules should be made there first and then propagated to the API and web layers.

## Git workflow

Use short, descriptive branch names such as `feature/...`, `fix/...`, or `chore/...` and keep changes focused on a single concern.

## Required checks before pushing

### Internationalization (i18n)

The web app uses `react-i18next`. New translations must be added to both `en.json` and `fr.json` and validated with `npm run i18n:validate --workspace @hullbay/web`.

### API tests and coverage

```bash
cd packages/api
npm test
npm run test:coverage
```

### Web E2E (Playwright)

```bash
cd packages/web
npm run e2e:install
npm run e2e
```

## Architecture

See `docs/architecture.md` in the upstream repo for the full set of architecture conventions (subscribers, module boundaries, initialization patterns).

## Pull requests

Before opening a pull request, ensure that:

- the change is linked to an issue when appropriate
- the relevant type changes pass through `packages/shared`
- typechecking and builds succeed locally
- the PR description clearly explains the motivation and impact

## Security

For security vulnerabilities, do not open a public issue. Please follow the responsible disclosure process described in `SECURITY.md` in the upstream repo.

## License

By contributing, you agree that your contributions may be distributed under the MIT License.
