# Style Guide Monorepo

Internal style guide docs monorepo built with pnpm workspaces.

## Structure
- apps/docs: Next.js docs app

## Scripts
- `pnpm dev`: Run docs app dev server
- `pnpm -C apps/docs dev`: Run docs app directly
- `pnpm build`: Build all packages (docs build uses webpack)
- `pnpm -C apps/docs build:turbopack`: Optional Turbopack build
- `pnpm lint`: Lint all packages
