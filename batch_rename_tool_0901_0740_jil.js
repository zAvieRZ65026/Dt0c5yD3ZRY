// 代码生成时间: 2025-09-01 07:40:32
const fs = require('fs');
const path = require('path');

/*
 * Function to rename files in a directory.
 * @param {string} directoryPath - The path to the directory containing files to rename.
 * @param {string} renamePattern - A pattern to rename files based on.
 * @param {function} renameFunction - A custom function to determine the new file name.
 * @throws Will throw an error if the directory does not exist.
 */
async function batchRenameFiles(directoryPath, renamePattern, renameFunction) {
  // Check if the directory exists.
  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Directory ${directoryPath} does not exist`);
  }

  // Read all files in the directory.
  const files = fs.readdirSync(directoryPath);

  // Iterate over each file and rename it if it matches the rename pattern.
  for (const file of files) {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    // Skip directories or other non-file entities.
    if (stats.isDirectory() || !stats.isFile()) continue;

    // Check if the file matches the rename pattern.
    if (file.match(renamePattern)) {
      try {
        const newName = renameFunction(file);
        const newFilePath = path.join(directoryPath, newName);
        fs.renameSync(filePath, newFilePath);
        console.log(`Renamed ${file} to ${newName}`);
      } catch (error) {
        console.error(`Error renaming file ${file}: ${error.message}`);
      }
    }
  }
}

/*
 * Custom rename function example.
 * This function will add a prefix to the filename.
 * @param {string} filename - The name of the file to rename.
 * @returns {string} - The new file name.
 */
function addPrefixRenameFunction(prefix) {
  return function(filename) {
    const extension = path.extname(filename);
    const nameWithoutExtension = path.basename(filename, extension);
    return `${prefix}${nameWithoutExtension}${extension}`;
  };
}

// Example usage of the batch rename tool.
// This will rename all '.txt' files in the specified directory by adding 'new-' prefix.
const directoryToRename = './files';
const pattern = /\.txt$/;
const renameWithPrefix = addPrefixRenameFunction('new-');

batchRenameFiles(directoryToRename, pattern, renameWithPrefix)
  .then(() => console.log('File renaming completed.'))
  .catch((error) => console.error(`An error occurred: ${error.message}`));
