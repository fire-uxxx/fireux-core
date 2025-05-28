#!/usr/bin/env node

import { execSync } from "child_process";

const [, , workspace] = process.argv;

if (!workspace) {
  console.error(
    "❌ Please provide a workspace name.\nExample: yarn build @fireux/core"
  );
  process.exit(1);
}

try {
  console.log(`🔧 Running: yarn workspace ${workspace} build`);
  execSync(`yarn workspace ${workspace} build`, { stdio: "inherit" });
} catch (error) {
  console.error(`❌ Failed to run build in workspace ${workspace}`);
  process.exit(1);
}
