const path = require('path');

function parseFilePath(filePath) {
  const fileName = path.basename(filePath);
  const extension = path.extname(filePath);
  const directory = path.dirname(filePath);
 
  return {
    fileName,
    extension,
    directory: directory === '.' ? '' : directory
  };
}

module.exports = { parseFilePath };
