# AgentCare Web

Frontend applications for AgentCare - AI-Powered Maintenance Service Management Platform

## Structure

This is a Turborepo monorepo containing:

```
apps/
├── landing/           # Marketing website (Next.js)
├── customer-portal/   # Customer eService portal (Next.js)
└── backoffice/        # Admin back office (Next.js)

packages/
├── ui/                # Shared UI components (shadcn/ui + Tailwind)
├── types/             # Shared TypeScript types
├── utils/             # Shared utility functions
├── i18n/              # Translations (EN + AR)
├── api-client/        # API client SDK
├── eslint-config/     # Shared ESLint config
└── typescript-config/ # Shared TypeScript config
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Install dependencies
pnpm install

# Start all apps in development
pnpm dev

# Start specific app
pnpm dev:landing     # Port 3000
pnpm dev:portal      # Port 3001
pnpm dev:backoffice  # Port 3002
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm lint` | Lint all packages |
| `pnpm format` | Format code with Prettier |
| `pnpm type-check` | Type check all packages |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui + Radix UI
- **i18n:** next-intl (EN + AR with RTL)
- **State:** Zustand + React Query
- **Build:** Turborepo

## Related Repositories

- [agentcare-api](../agentcare-api) - Backend API
- [agentcare-ai](../agentcare-ai) - AI Service
- [agentcare-docs](../agentcare-docs) - Documentation

## License

Proprietary - All rights reserved.
