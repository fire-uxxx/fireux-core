const path = require("path");
const process = require("process");
const { execSync } = require("child_process");
const fs = require("fs");

// Change to the root directory of the monorepo
process.chdir(path.resolve(__dirname, ".."));

console.log("Hello from root");

function getChangedFiles(dir) {
  try {
    const output = execSync(`git -C ${dir} status --porcelain`, {
      encoding: "utf-8",
    });
    return output.split("\n").filter(Boolean).length;
  } catch (error) {
    console.error(`Error getting changed files in ${dir}:`, error.message);
    return 0;
  }
}

function monorepoReport() {
  const monorepoUrl = getRepositoryUrl(".");
  const monorepoChanges = getChangedFiles(".");
  console.log("Monorepo Root:\n");
  console.log(`URL: ${monorepoUrl}`);
  console.log(`Changes: ${monorepoChanges}\n`);
}

function packagesReport() {
  const packagesDir = path.resolve("packages");
  const packageUrls = getRepositoryUrls(packagesDir);
  console.log("Packages:\n");
  packageUrls.forEach(({ name, url }) => {
    const changes = getChangedFiles(path.join(packagesDir, name));
    console.log(`${name}: ${url} (Changes: ${changes})`);
  });
  console.log();
}

function appReport() {
  const projectsDir = path.resolve("projects");
  if (!fs.existsSync(projectsDir)) return [];

  const apps = [];
  const projectDirs = fs.readdirSync(projectsDir).filter((dir) => {
    const fullPath = path.join(projectsDir, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  projectDirs.forEach((projectDir) => {
    const projectPath = path.join(projectsDir, projectDir);
    const appDirs = fs.readdirSync(projectPath).filter((subDir) => {
      const fullPath = path.join(projectPath, subDir);
      return (
        fs.statSync(fullPath).isDirectory() &&
        fs.existsSync(path.join(fullPath, "package.json"))
      );
    });

    appDirs.forEach((appDir) => {
      const appPath = path.join(projectPath, appDir);
      const changes = getChangedFiles(appPath);
      apps.push({
        name: `${projectDir}/${appDir}`,
        url: getRepositoryUrl(appPath),
        changes,
      });
    });
  });

  console.log("Apps:\n");
  apps.forEach(({ name, url, changes }) => {
    console.log(`${name}: ${url} (Changes: ${changes})`);
  });
  console.log();
}

function getRepositoryUrl(dir) {
  try {
    const packageJsonPath = path.resolve(dir, "package.json"); // Ensure absolute path
    const packageJson = require(packageJsonPath);
    return packageJson.repository?.url || "No repository URL found";
  } catch (error) {
    console.error("Error reading package.json at:", dir, error.message); // Error log
    return "No package.json found";
  }
}

function getRepositoryUrls(baseDir) {
  if (!fs.existsSync(baseDir)) return [];

  const subdirs = fs.readdirSync(baseDir).filter((dir) => {
    const fullPath = path.join(baseDir, dir);
    return fs.statSync(fullPath).isDirectory();
  });

  return subdirs.map((dir) => {
    const fullPath = path.join(baseDir, dir);
    return {
      name: path.basename(fullPath),
      url: getRepositoryUrl(fullPath),
    };
  });
}

// Call the functions to generate the report
monorepoReport();
packagesReport();
appReport();
