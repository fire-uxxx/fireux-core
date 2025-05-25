import { promises as fs } from "fs";
import path from "path";

export default defineEventHandler(async () => {
  const imgDir = path.resolve("public/img"); // Path to the images directory
  let images = [];

  try {
    images = await fs.readdir(imgDir); // Read all file names in /public/img
  } catch (error) {
    console.error("Error reading images directory:", error);
  }

  return images.map((file) => `/img/${file}`); // Return full path for frontend
});