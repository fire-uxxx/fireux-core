#!/usr/bin/env node

import { execSync } from "child_process";

const [, , command, workspace] = process.argv;

if (!command) {
  console.error("❌ Please provide a repository command (e.g., push, status).");
  process.exit(1);
}

if (!workspace) {
  console.error(
    "❌ Please provide a workspace name.\nExample: yarn repo push misebox"
  );
  process.exit(1);
}

try {
  const repoPath = {
    misebox:
      "/Users/danielwatson/Developer/Monorepos/fireux/projects/misebox/misebox-app",
    fireux:
      "/Users/danielwatson/Developer/Monorepos/fireux/projects/fireux/fireux-app",
    core: "/Users/danielwatson/Developer/Monorepos/fireux/packages/fireux-core",
  }[workspace];

  if (!repoPath) {
    throw new Error(`Workspace ${workspace} is not recognized.`);
  }

  console.log(`🔧 Switching to repository: ${repoPath}`);
  process.chdir(repoPath);

  console.log(`🔧 Running: git ${command}`);
  execSync(`git ${command}`, { stdio: "inherit" });
} catch (error) {
  console.error(`❌ Failed to execute repository command: ${error.message}`);
  process.exit(1);
}
