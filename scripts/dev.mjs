#!/usr/bin/env node

import { execSync } from "child_process";

const [, , workspace] = process.argv;

if (!workspace) {
  console.error(
    "❌ Please provide a workspace name.\nExample: yarn dev misebox"
  );
  process.exit(1);
}

try {
  console.log(`🔧 Running: yarn workspace ${workspace} dev`);
  execSync(`yarn workspace ${workspace} dev`, { stdio: "inherit" });
} catch (error) {
  console.error(`❌ Failed to run dev in workspace ${workspace}`);
  process.exit(1);
}
