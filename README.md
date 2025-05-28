Here’s a clean and informative starter README.md for your monorepo:

# FireUX Monorepo

This is the root of the **FireUX** monorepo. It will host multiple Nuxt-based applications and shared modules.

## Structure

fireux/
├── packages/ # Shared Nuxt modules (e.g., fireux-core)
├── projects/ # Individual applications or tenants (e.g., misebox, fireux)
├── tsconfig.base.json
├── package.json
├── yarn.lock
└── .gitignore

## Goals

- Modular architecture
- Multi-tenant Nuxt 3 apps
- Shared core module (`fireux-core`)
- Support for Firebase, Stripe, Vuefire, PWA, and more

## Setup

1. Install dependencies:

   ```bash
   yarn install
   ```

2. To run an app (once created):

   ```bash
   yarn workspace <app-name> dev
   ```

3. To build a module:
   ```bash
   yarn workspace @fireux/core build
   ```

## 🚀 Workspace Utilities

### Start a Dev Server

```bash
yarn dev misebox
```

### Build a Package

```bash
yarn build @fireux/core
```

### Show Git Status Across Workspaces

```bash
yarn workspace-status
```

All commands work with intelligent path resolution and clean console output.

## 🧠 Copilot: Git Status Reporting

Use `scripts/git-report.mjs` to generate a clear report of Git changes across all parts of the monorepo.

```bash
node scripts/git-report.mjs
```

It prints 3 sections:
- **Monorepo**
- **Packages**
- **Apps**

Each includes the target name, GitHub URL (from `package.json.repository.url`), and number of changes.

This script auto-discovers apps in `projects/*/*`, and packages in `packages/*`.

Let me know if you'd like to:
- Add sorting or filters
- Export this as JSON/CSV for automation
- Make a `yarn git:report` alias
- Add CI checks for dirty workspaces.

⸻

Monorepo managed with Yarn 4 Workspaces.

Let me know when you'd like to scaffold the `packages/fireux-core` module or define `projects/` structure.
