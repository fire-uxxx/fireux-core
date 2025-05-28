import { execSync } from "child_process";
import { readFileSync, existsSync, readdirSync } from "fs";
import path from "path";

function getGitUrl(dir) {
  const pkgPath = path.join(dir, "package.json");
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    if (pkg.repository && pkg.repository.url) {
      return pkg.repository.url;
    }
  } catch {
    // ignore if no package.json or invalid
  }

  // fallback to git
  try {
    return execSync(`git -C ${dir} config --get remote.origin.url`, {
      encoding: "utf-8",
    }).trim();
  } catch {
    return "No remote URL";
  }
}

function getGitChanges(dir) {
  try {
    const output = execSync(`git -C ${dir} status --porcelain`, {
      encoding: "utf-8",
    });
    return output.split("\n").filter(Boolean).length;
  } catch {
    return 0;
  }
}

function isGitRepo(dir) {
  try {
    const isSubmodule = execSync(
      `git -C ${dir} rev-parse --show-superproject-working-tree`,
      {
        encoding: "utf-8",
      }
    ).trim();
    if (isSubmodule) {
      return false; // Ignore submodules
    }
    execSync(`git -C ${dir} rev-parse --is-inside-work-tree`, {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function getChangedFiles(path) {
  try {
    const output = execSync(`git diff --name-only HEAD -- ${path}`, {
      encoding: "utf-8",
    });
    return output.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

function getLastCommit(path) {
  try {
    return execSync(`git log -1 --pretty=format:"%h %s" -- ${path}`, {
      encoding: "utf-8",
    }).trim();
  } catch {
    return "No recent commits";
  }
}

function section(title) {
  console.log(`\n${title}:\n${"=".repeat(title.length)}\n`);
}

function listChanges(label, baseDir) {
  const dirs = existsSync(baseDir) ? readdirSync(baseDir) : [];
  for (const dir of dirs) {
    const fullPath = path.join(baseDir, dir);
    const changes = getChangedFiles(fullPath);
    if (changes.length) {
      console.log(`📦 ${label}/${dir}`);
      console.log(`  📝 Last commit: ${getLastCommit(fullPath)}`);
      console.log(`  ✏️  Changed files:`);
      changes.forEach((f) => console.log(`     - ${f}`));
      console.log();
    }
  }
}

function reportMonorepo() {
  const dir = ".";
  const name = "monorepo";
  const gitUrl = getGitUrl(dir);
  const changes = getGitChanges(dir);
  return [{ Target: name, Repository: gitUrl, Changes: changes }];
}

function reportPackages() {
  const packagesDir = path.resolve("packages");
  const packages = [];

  if (existsSync(packagesDir)) {
    const subdirs = execSync(`find ${packagesDir} -type d -maxdepth 1`, {
      encoding: "utf-8",
    })
      .split("\n")
      .filter(
        (dir) => dir.trim() !== "" && existsSync(path.join(dir, "package.json"))
      );

    for (const dir of subdirs) {
      if (!isGitRepo(dir)) continue;
      const name = path.basename(dir);
      const gitUrl = getGitUrl(dir);

      // Exclude changes in the monorepo root
      const changes = getChangedFiles(dir).filter(
        (file) => !file.startsWith("../")
      ).length;

      packages.push({ Target: name, Repository: gitUrl, Changes: changes });
    }
  }

  return packages;
}

function reportApps() {
  const projectsDir = path.resolve("projects");
  const apps = [];

  if (existsSync(projectsDir)) {
    const subdirs = execSync(`find ${projectsDir} -type d -maxdepth 2`, {
      encoding: "utf-8",
    })
      .split("\n")
      .filter(
        (dir) => dir.trim() !== "" && existsSync(path.join(dir, "package.json"))
      );

    for (const dir of subdirs) {
      if (!isGitRepo(dir)) continue;
      const name = path.relative(projectsDir, dir);
      const gitUrl = getGitUrl(dir);
      const changes = getGitChanges(dir);
      apps.push({ Target: name, Repository: gitUrl, Changes: changes });
    }
  }

  return apps;
}

function main() {
  console.log("Monorepo:");
  console.table(reportMonorepo());

  console.log("Packages:");
  console.table(reportPackages());

  console.log("Apps:");
  console.table(reportApps());

  section("Monorepo Root");
  const rootChanges = getChangedFiles(".");
  if (rootChanges.length) {
    console.log(`📝 Last commit: ${getLastCommit(".")}`);
    console.log(`✏️  Changed files:`);
    rootChanges.forEach((f) => console.log(`   - ${f}`));
  } else {
    console.log(`✅ No changes in root.`);
  }

  section("Packages");
  listChanges("packages", "packages");

  section("Apps");
  listChanges("apps", "apps");
}

main();
