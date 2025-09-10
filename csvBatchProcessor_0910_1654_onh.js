// 代码生成时间: 2025-09-10 16:54:59
const fs = require('fs').promises;
const csv = require('csv-parser');
const path = require('path');
const { Transform } = require('stream');

// 定义错误处理函数
function handleError(error) {
    console.error('An error occurred:', error);
}

// 定义CSV批处理函数
async function processCSVFiles(inputDirectory, outputDirectory) {
    try {
        // 获取目录下所有CSV文件
        const files = await fs.readdir(inputDirectory, { withFileTypes: true });
        const csvFiles = files.filter(file => file.isFile() && file.name.endsWith('.csv'));

        // 处理每个CSV文件
        for (const file of csvFiles) {
            const filePath = path.join(inputDirectory, file.name);
            const outputPath = path.join(outputDirectory, file.name);

            // 创建转换流
            const transformStream = new Transform({
                transform(chunk, encoding, callback) {
                    // 这里的转换逻辑可以根据需要进行修改
                    // 例如，可以添加数据处理逻辑
                    callback(null, chunk);
                }
            });

            // 创建输出流
            const writableStream = fs.createWriteStream(outputPath);

            // 读取CSV文件
            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .pipe(transformStream)
                    .pipe(writableStream)
                    .on('finish', resolve)
                    .on('error', reject);
            });

            console.log(`Processed file: ${file.name}`);
        }
    } catch (error) {
        handleError(error);
    }
}

// 使用示例
const inputDir = './input';
const outputDir = './output';

// 调用批处理函数
processCSVFiles(inputDir, outputDir)
    .then(() => console.log('All CSV files have been processed.'))
    .catch(handleError);
