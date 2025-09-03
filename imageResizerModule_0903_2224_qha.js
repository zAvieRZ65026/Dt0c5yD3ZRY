// 代码生成时间: 2025-09-03 22:24:16
const path = require('path');
const Jimp = require('jimp');

/**
 * 图片尺寸批量调整器模块
 *
 * @module imageResizer
 */

// 定义一个函数，用于调整单个图片尺寸
async function resizeImage(imagePath, outputPath, width, height) {
  try {
    // 读取图片文件
    const image = await Jimp.read(imagePath);

    // 缩放图片尺寸
    const resizedImage = image.resize(width, height);

    // 保存调整后的图片
    await resizedImage.writeAsync(outputPath);

    console.log(`Image resized and saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error resizing image: ${error.message}`);
  }
}

// 定义一个函数，用于遍历文件夹内所有图片并调整尺寸
async function resizeImagesInFolder(folderPath, outputPath, width, height) {
  const files = await Jimp.readDir(folderPath);

  for (const file of files) {
    // 检查文件是否为图片
    if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) {
      const imagePath = path.join(folderPath, file);
      const resizedImagePath = path.join(outputPath, file);

      // 调用resizeImage函数调整图片尺寸
      await resizeImage(imagePath, resizedImagePath, width, height);
    }
  }
}

// 导出模块
module.exports = {
  resizeImage,
  resizeImagesInFolder
};