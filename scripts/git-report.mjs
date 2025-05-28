import { execSync } from "child_process";
import { readFileSync, existsSync } from "fs";
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
      const changes = getGitChanges(dir);
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
}

main();
