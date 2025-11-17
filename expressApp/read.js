const fs = require("fs").promises;
const path = require("path");

async function readDataFile() {
  const filePath = path.join(__dirname, "Data.txt");
  const data = await fs.readFile(filePath, "utf8");
  return data;
}

module.exports = { readDataFile };
