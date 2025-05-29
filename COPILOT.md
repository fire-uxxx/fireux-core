# 🧠 Copilot Instructions for `fireux` Monorepo

This file guides GitHub Copilot and ChatGPT when generating or updating code within the `fireux` monorepo. Keep instructions scoped to the **monorepo structure and relationships only**.

## ✅ Mental Model

- This is a **Yarn 4 monorepo** with three workspace roots:

  - `"."` → Monorepo root
  - `"packages/*"` → Shared Nuxt modules (e.g., `fireux-core`)
  - `"projects/*/*"` → Individual Nuxt apps (multi-tenant structure)

- Shared modules live in `packages/`
  - Example: `packages/fireux-core` exports composables, utils, etc.
- Each app lives in a double-layer folder like `projects/misebox/misebox-app`
  - `projects/<tenant>/<app>`

## 🎯 Goals

- Encourage **module reuse** from `packages/fireux-core`
- Keep **apps isolated** unless sharing logic via packages
- Use **`package.json.repository.url`** to determine Git URLs
- Use `yarn workspaces foreach` to detect local changes per workspace
- Ensure the monorepo is functional with a "Hello World" system across apps and packages

## 🤖 Suggested Behaviors

Copilot or ChatGPT should:

- ⚙️ Respect workspace boundaries
- ✅ Use `yarn workspace <name>` commands when applicable
- 🧹 Never suggest writing logic directly in the monorepo root
- 🛠 Use `fireux-core` for shared composables, types, or API utilities
- 🔍 Read Git metadata using:
  - `.git` status per workspace
  - package-level `repository.url` for source tracking
- 🏗 Scaffold shared modules using Nuxt's official module template

## 🛠️ Repository URL Setup

When creating a new package or project, ensure the `package.json` includes the correct `repository.url` field. This should point to the Git repository for the package or project. For example:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/fire-uxxx/<repo-name>.git"
}
```

Replace `<repo-name>` with the appropriate repository name.

## 🚫 Avoid

- Don’t scaffold entire apps in the monorepo root
- Don’t hardcode repo URLs — always infer from `package.json`
- Don’t reference tools or folders that don’t exist (e.g. `apps/`, `modules/`)

## 🧪 Testing Workspaces

Use intelligent Yarn 4 CLI commands:

```bash
yarn workspaces list
yarn workspaces foreach run lint
yarn workspace misebox-app dev
yarn workspace @fireux/core build
```
