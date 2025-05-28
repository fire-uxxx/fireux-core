#!/usr/bin/env node

import { execSync } from "child_process";

const [, , workspace] = process.argv;

if (!workspace) {
  console.error(
    "❌ Please provide a workspace name.\nExample: yarn lint @fireux/core"
  );
  process.exit(1);
}

try {
  console.log(`🔧 Running: yarn workspace ${workspace} lint`);
  execSync(`yarn workspace ${workspace} lint`, { stdio: "inherit" });
} catch (error) {
  console.error(`❌ Failed to run lint in workspace ${workspace}`);
  process.exit(1);
}
