<!--
🛠️ Copilot Task: Prevent Yarn workspace autobuild errors

For each workspace under `projects/**/package.json`, locate the `"scripts"` section and append:

  "prepare": "echo 'workspace build no-op'"

So that it looks like:

```jsonc
"scripts": {
  "dev": "nuxt dev",
  "build": "nuxt build",
  "lint": "eslint .",
  "prepare": "echo 'workspace build no-op'"
}
```

This stub prepare ensures that when you run `yarn install`, Yarn’s workspace autobuild sees a valid prepare step and does nothing (echo 'workspace build no-op') instead of trying your real build and failing. Once applied, delete all node_modules and any sub-package yarn.lock files, then run `yarn install` at the root and the install/link phase will complete cleanly.
-->

### What that “no-op prepare” does

- **Yarn Workspaces autobuild**: by default, Yarn will run each workspace’s `prepare` (or `build`) script during `yarn install` so that packages are ready for consumption.
- **Your real apps don’t need a build step right now** during install — you only build them in CI or via `yarn workspace <app> build`.
- **By echoing a no-op**, you satisfy Yarn’s requirement to run something, but it immediately exits successfully, preventing the “must be built” errors.
- **As soon as you want a proper build**, just replace or augment that stub `prepare` with your real build command.
