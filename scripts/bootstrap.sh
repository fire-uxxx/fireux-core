#!/usr/bin/env bash
set -euo pipefail

# 0) Drop any nested git repos in projects/*
echo "→ Removing stray .git folders in projects/…"
find projects -type d -name ".git" -prune -exec rm -rf {} +

# 1) Clean up
echo "→ Cleaning all node_modules and yarn.locks…"
rm -rf node_modules
find packages projects -type d -name node_modules -prune -exec rm -rf {} +
find . -type f -name yarn.lock -delete

# 2) Install top-level workspaces
echo "→ Installing root dependencies (yarn install)…"
yarn install

# 3) Build your core package
echo "→ Building @fireux/core…"
cd packages/fireux-core
yarn install
yarn build
cd -

# 4) Install each app’s deps
echo "→ Installing each app in one shot…"
yarn workspaces foreach --since --topological-dev --verbose run install

# 5) List your workspaces
echo "→ All workspaces:"
yarn workspaces list

echo

echo "✅ Done! Now you can e.g.:"
echo "   cd projects/cleanbox/cleanbox-app && yarn dev"
echo "   cd projects/misebox/misebox-app && yarn dev"
