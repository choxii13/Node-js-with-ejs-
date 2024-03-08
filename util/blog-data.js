const fs = require("fs/promises");
const path = require("path");
const filePath = path.join(__dirname, "..", "data", "blogs.json");
async function getReadFile() {
  const fileData = await fs.readFile(filePath);
  const storedBlogs = JSON.parse(fileData);
  return storedBlogs;
}

async function getWriteFile(storedBlogs) {
  await fs.writeFile(filePath, JSON.stringify(storedBlogs));
  return storedBlogs;
}

module.exports = { getReadFile, getWriteFile };
