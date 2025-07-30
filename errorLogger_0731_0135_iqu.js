// 代码生成时间: 2025-07-31 01:35:55
const fs = require('fs');
const path = require('path');

// 错误日志收集器配置
const config = {
  directory: './logs',  // 日志文件存储目录
  filename: 'error.log',  // 日志文件名
  maxSize: 1024 * 1024 * 5,  // 单个日志文件最大大小（5MB）
  maxFiles: 5  // 最多保留的日志文件数量
};

// 确保日志目录存在
if (!fs.existsSync(config.directory)) {
  fs.mkdirSync(config.directory);
}

// 错误日志收集器类
class ErrorLogger {
  constructor() {
    this.logFile = path.join(config.directory, config.filename);
  }

  // 写入日志
  writeLog(message) {
    try {
      const timestamp = new Date().toISOString();
      const logMessage = `${timestamp} - ${message}
`;
      fs.appendFileSync(this.logFile, logMessage, 'utf8');
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  // 检查并清理日志文件
  checkAndClean() {
    const files = fs.readdirSync(config.directory);
    const logFiles = files.filter(f => f.includes(config.filename));
    if (logFiles.length >= config.maxFiles) {
      const filesToDelete = logFiles.sort().slice(0, logFiles.length - config.maxFiles + 1);
      filesToDelete.forEach(file => {
        fs.unlinkSync(path.join(config.directory, file));
      });
    }
  }

  // 获取日志文件大小
  getFileSize() {
    const stats = fs.statSync(this.logFile);
    return stats.size;
  }

  // 检查日志文件是否需要轮换
  checkLogRotation() {
    if (this.getFileSize() >= config.maxSize) {
      const newFilename = `${config.filename}.${Date.now()}`;
      fs.renameSync(this.logFile, path.join(config.directory, newFilename));
      this.logFile = path.join(config.directory, config.filename);
      this.checkAndClean();
    }
  }

  // 记录错误
  logError(error) {
    this.checkLogRotation();
    this.writeLog(error.stack || String(error));
  }
}

// 实例化错误日志收集器
const errorLogger = new ErrorLogger();

// 导出错误日志收集器
module.exports = errorLogger;