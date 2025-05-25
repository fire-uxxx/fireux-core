<!--
🛠️ Copilot Task: Standardize all package.json files

For each of:
  - `./package.json`
  - `./packages/fireux-core/package.json`
  - `./projects/*/package.json`

1. Remove any `"workspaces"` field from individual apps.
2. Ensure `"private": true` and `"type": "module"`.
3. Unify the `scripts` block to include exactly:

```jsonc
"scripts": {
  "dev":        "clear && nuxt dev",
  "build":      "echo 'workspace build no-op'",
  "real-build": "nuxt build",
  "generate":   "nuxt generate",
  "preview":    "nuxt preview",
  "lint":       "eslint .",
  "lint:fix":   "eslint --fix .",
  "prepare":    "echo 'workspace build no-op'",
  "postinstall":"echo 'workspace postinstall no-op'",
  "prebuild":   "echo 'No prebuild checks'",
  "analyze":    "npx nuxi analyze"
}
```

4. Align dependencies (alphabetical order) to at least:

```jsonc
"dependencies": {
  "@fireux/core":         "workspace:*",
  "@nuxt/kit":            "^3.17.4",
  "@nuxt/ui":             "^3.x.x",
  "@vite-pwa/nuxt":       "^0.10.6",
  "@vueuse/core":         "^13.x.x",
  "dompurify":            "^3.x.x",
  "firebase":             "^11.x.x",
  "firebase-admin":       "^13.x.x",
  "firebase-functions":   "^6.x.x",
  "nuxt":                 "^3.17.4",
  "nuxt-vuefire":         "^1.0.x",
  "reka-ui":              "^2.x.x",
  "stripe":               "^18.x.x",
  "vue":                  "^3.5.14",
  "vue-router":           "^4.5.x",
  "vuefire":              "^3.2.x"
}
```

5. Align devDependencies (alphabetical):

```jsonc
"devDependencies": {
  "@iconify-json/heroicons":   "^1.2.x",
  "@iconify-json/lucide":      "^1.2.x",
  "@nuxt/eslint":              "^1.1.x",
  "@types/dompurify":          "^3.x.x",
  "@vite-pwa/nuxt":            "^0.10.6",
  "cross-env":                 "^7.x.x",
  "eslint":                    "^9.x.x",
  "sass-embedded":             "^1.x.x",
  "typescript":                "^5.x.x"
}
```

6. Ensure the root `package.json` has:
```jsonc
{
  "private": true,
  "packageManager": "yarn@4.9.1",
  "workspaces": ["packages/*", "projects/**"],
  "scripts": {
    "clean":       "rm -rf node_modules packages/*/node_modules projects/**/node_modules",
    "install:all": "yarn install"
  }
}
```

7. Save or commit the updated package.json files.

Once applied, delete all top-level and app-level `node_modules` and any `yarn.lock` in subfolders, then run a clean:

```bash
defaults write com.apple.desktopservices DSDontWriteNetworkStores true
rm -rf node_modules
find projects packages -name 'node_modules' -prune -exec rm -rf {} +
find projects packages -name 'yarn.lock' -delete
yarn install
```

This will leave you with a consistent, working set of `package.json` files everywhere.
-->
