// 代码生成时间: 2025-09-11 17:11:20
const fs = require('fs-extra');
const path = require('path');
const AdmZip = require('adm-zip'); // 使用adm-zip库来处理zip文件

/**
 * Unzip utility function
 * @param {string} zipPath - The path to the zip file
 * @param {string} outputPath - The path where to extract the zip file
 * @returns {Promise<void>} - A promise that resolves when the extraction is complete
 */
async function unzip(zipPath, outputPath) {
  try {
    // Check if the zip file exists
    if (!fs.existsSync(zipPath)) {
      throw new Error(`The zip file ${zipPath} does not exist.`);
    }

    // Create output directory if it does not exist
    if (!fs.existsSync(outputPath)) {
      await fs.ensureDir(outputPath);
    }

    // Create an instance of AdmZip and load the zip file
    const zip = new AdmZip(zipPath);

    // Extract the content of the zip file to the specified output path
    zip.extractAllTo(outputPath, /*overwrite*/true);

    console.log(`Successfully extracted ${zipPath} to ${outputPath}`);
  } catch (error) {
    // Handle any errors that occur during the extraction process
    console.error(`Error extracting ${zipPath}: ${error.message}`);
    throw error;
  }
}

module.exports = {
  unzip,
};