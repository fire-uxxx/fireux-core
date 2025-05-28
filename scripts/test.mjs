#!/usr/bin/env node

import { execSync } from "child_process";

const [, , workspace] = process.argv;

if (!workspace) {
  console.error(
    "❌ Please provide a workspace name.\nExample: yarn test @fireux/core"
  );
  process.exit(1);
}

try {
  console.log(`🔧 Running: yarn workspace ${workspace} test`);
  execSync(`yarn workspace ${workspace} test`, { stdio: "inherit" });
} catch (error) {
  console.error(`❌ Failed to run test in workspace ${workspace}`);
  process.exit(1);
}
