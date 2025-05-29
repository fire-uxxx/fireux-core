# FireUX Monorepo

This is the root of the **FireUX** monorepo, which manages shared code and multiple Nuxt-based applications.

## 📁 Structure

fireux/
├── packages/ # Shared modules (e.g. fireux-core)
├── projects/ # Applications by domain or tenant (e.g. misebox, fireux)
├── scripts/ # Utility scripts (e.g. git-report.mjs)
├── package.json # Yarn 4 workspaces root
├── tsconfig.json # Shared TypeScript config
└── .gitignore # Ignores packages/ and projects/ by default

## 🧩 Workspace Layout

- **packages/** → Nuxt modules shared across apps (e.g., `fireux-core`)
- **projects/** → Independent Nuxt 3 applications (multi-tenant pattern)
  - `projects/misebox/misebox-app`
  - `projects/fireux/fireux-app`

## ⚙️ Setup

````bash
yarn install  # Installs all dependencies

▶️ Running Apps

yarn workspace misebox-app dev
yarn workspace fireux-app dev

🛠️ Building Modules

yarn workspace @fireux/core build

🔍 Git Status Report

Use the custom script to report git status per workspace:

node scripts/git-report.mjs

It outputs three sections:
	•	Monorepo — Root-level changes
	•	Packages — Shared modules
	•	Apps — Each discovered Nuxt app in projects/*/*

URLs are read from each package.json.repository.url.

🧠 Notes
	•	This monorepo uses Yarn 4 Workspaces.
	•	Git ignores packages/ and projects/ unless explicitly included.
	•	To scaffold a new app or module, add it to projects/ or packages/ and update package.json > workspaces.

## 🛠️ Repository URL Setup

When creating a new package or project, ensure the `package.json` includes the correct `repository.url` field. This should point to the Git repository for the package or project. For example:

```json
"repository": {
  "type": "git",
  "url": "https://github.com/fire-uxxx/<repo-name>.git"
}
````

Replace `<repo-name>` with the appropriate repository name.

⸻

Let me know if you’d like to:
• Add CI checks for dirty workspaces
• Auto-deploy on push
• Generate a visual dependency graph
