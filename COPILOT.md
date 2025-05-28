## 🧠 Evolving Scripts for Reusable Logic

As the project grows, ensure that scripts in the `scripts/` folder evolve to:

1. **Reduce Repetition**: Identify repeated steps across scripts and refactor them into reusable functions or modules.
2. **Enhance Convenience**: Add logic to handle common edge cases or automate frequent tasks.
3. **Improve Logging**: Provide clear and actionable logs for contributors and maintainers.

### Example Enhancements

- **Centralized Error Handling**: Create a shared error handler for all scripts.
- **Workspace Validation**: Automatically validate workspace names before executing commands.
- **Dynamic Autocomplete**: Suggest valid workspace names based on the `workspaces` array in `package.json`.

By continuously improving these scripts, you can streamline development and ensure maintainability.

# 🧠 Copilot Instructions for FireUX Monorepo

This is the official Copilot integration guide for contributing to FireUX using Yarn 4 workspaces, reusable Nuxt modules, and scalable app logic.
It enables Copilot to understand structure, generate scripts, and maintain conventions.

⸻

## 📦 Workspace-Aware Commands

This repo uses Yarn 4 Workspaces with structure like:

```
packages/
  fireux-core/
    src/
      runtime/
        composables/
          admin/
          app/
          firebase/
          firestore/
          utils/
    playground/
projects/
  fireux/
    fireux-app/
  misebox/
    misebox-app/
```

Use workspace-aware scripts instead of raw yarn workspace commands.

⸻

## ✅ High-Level Dev Commands

These commands wrap workspace logic with validation and improved logging:

```bash
yarn dev <workspace>         # Start dev server
yarn build <workspace>       # Build for production
yarn lint <workspace>        # Run linter
yarn test <workspace>        # Run tests
```

Copilot: When suggesting shell commands, prefer these over raw yarn workspace commands.

⸻

## 🧩 Suggested Script File Prompts

### scripts/dev.mjs

```javascript
// scripts/dev.mjs
// 🧠 Copilot: Prompt - "Run dev server for a workspace. Validate name, show errors if invalid, print clear output"
```

### scripts/utils.mjs

```javascript
// scripts/utils.mjs
// 🧠 Copilot: Prompt - "Get list of valid workspace names from root package.json"
```

⸻

## 💬 Logging & UX Patterns

When writing scripts, Copilot should:

- Prefix logs: 🔧, 🚨, 📦, ✅, etc.
- Always confirm success: ✅ Build complete for misebox
- Fail early if:
  - No workspace name is passed
  - The workspace does not exist

⸻

## 🔁 Reusable Script Logic

Move shared logic to:

```javascript
// scripts/utils.mjs
export function getWorkspaces() {
  /* parse root package.json */
}
export function validateWorkspace(name) {
  /* throw if not in workspaces */
}
```

Copilot: When repeating logic across scripts, extract to utils.mjs.

⸻

## 🧠 File Headers for Copilot Context

Always include the filename and purpose as the first comment line:

```javascript
// scripts/build.mjs - Builds a specific workspace using yarn workspace
```

This keeps Copilot aware across multiple open files.

⸻

## 🧠 Conventions to Preserve

| Area                 | Rule                                                         |
| -------------------- | ------------------------------------------------------------ |
| 📁 Folders           | All composables under runtime/composables/                   |
| 🧪 Tests             | Use vitest with per-package test commands                    |
| 💬 Scripts           | Log clearly, fail fast, reuse utils                          |
| 🔍 Imports           | Use addImportsDir() for auto-imports in modules              |
| 📄 app.vue           | Kept consistent across all apps unless explicitly overridden |
| 📝 Type Declarations | Always verify imports.d.ts if auto-imports fail              |
| 🔧 Build Logic       | Use nuxt-module-build for core module packaging              |

⸻

## 📌 Example Copilot Prompts for Nuxt Module Dev

When writing Nuxt module logic in fireux-core:

```javascript
// 🧠 Copilot: Prompt - "Register all composables in nested folders for auto-imports"
addImportsDir(resolver.resolve("./runtime/composables"));

// 🧠 Copilot: Prompt - "List all registered composables to debug import issues"
nuxt.hook("imports:extend", (imports) => {
  console.log(imports);
});
```

⸻

## 📚 Related Scripts to Expand Later

- scripts/list.mjs → show all workspaces
- scripts/prepare.mjs → build + link a workspace
- scripts/release.mjs → run changelogen + version bump
- scripts/sync.mjs → sync shared files across workspaces (like app.vue, theme files)

⸻

## 🛠 Copilot Tips

- Use yarn workspaces info to help Copilot get context
- Always write file-oriented prompts in comments
- Suggest file stubs and completion when missing

⸻

## ✨ Final Copilot Prompt for All Files

```html
<!-- 🧠 Copilot: This project is a Nuxt/Firebase mono-repo using Yarn 4 workspaces. When completing code, prefer validated workspace scripts (dev.mjs, build.mjs), suggest modular Nuxt patterns, and preserve file-oriented headers and auto-import paths. -->
```

⸻

## 🧠 Maintaining Context Across Chats

To ensure continuity and alignment with the evolving FireUX monorepo, contributors and Copilot should:

1. **Document Changes**: Always update `COPILOT.md` and `README.md` with any new conventions, scripts, or workspace structures.
2. **Preserve Context**: Include detailed comments in scripts and files to help Copilot and future contributors understand the purpose and logic.
3. **Proactively Update**: Regularly review and refine documentation to reflect the latest system changes.

### Example Practices

- **Workspace Structure**: Ensure `COPILOT.md` accurately reflects the current workspace structure.
- **Script Logic**: Add comments to scripts explaining reusable logic and validation steps.
- **Conventions**: Update conventions in `COPILOT.md` as new patterns emerge.

By maintaining these practices, contributors and Copilot can stay aligned and productive, even across multiple sessions.

⸻

## 🧠 Memory

This section is reserved for notes, reminders, and context that Copilot can use to maintain alignment across sessions. These notes can be in any format or language that helps preserve continuity.

### Example Notes

- **Workspace Updates**: Remember to update the workspace structure in `COPILOT.md` whenever new projects or packages are added.
- **Script Enhancements**: Consider adding centralized error handling and workspace validation logic to `scripts/utils.mjs`.
- **Documentation**: Ensure `README.md` and `COPILOT.md` are synced with the latest conventions and commands.

### Internal Notes

- 🧠 "Always check for consistency in workspace names across scripts and documentation."
- 🧠 "Refactor repetitive logic into reusable modules to simplify maintenance."

⸻

## 🧠 Repository Management

To ensure operations are executed in the correct repository context, use the `repo.mjs` script located in the `scripts/` folder.

### Available Commands

- **Push Changes**: Push changes to the remote repository for a specific workspace.

  ```bash
  yarn repo push <workspace>
  ```

  Example:

  ```bash
  yarn repo push misebox
  ```

- **Check Status**: Check the Git status for a specific workspace.
  ```bash
  yarn repo status <workspace>
  ```
  Example:
  ```bash
  yarn repo status fireux
  ```

### Notes

- Ensure the workspace name matches the repository structure defined in `repo.mjs`.
- This script prevents accidental pushes to the wrong repository by validating the workspace context.
