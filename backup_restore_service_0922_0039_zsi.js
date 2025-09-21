// 代码生成时间: 2025-09-22 00:39:35
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

// Service for handling backup and restore operations
class BackupRestoreService {
  // Constructor to initialize backup directory and data path
  constructor(backupDir, dataPath) {
    this.backupDir = backupDir;
    this.dataPath = dataPath;
  }

  // Function to create a backup of the data
  async createBackup() {
    try {
      // Check if data path exists
      if (!(await fs.exists(this.dataPath))) {
        throw new Error('Data path does not exist');
      }

      // Create backup directory if it does not exist
      await fs.mkdir(this.backupDir, { recursive: true });

      // Get current date and time for backup file naming
      const now = new Date();
      const backupFileName = `backup_${now.toISOString()}.zip`;
      const backupFilePath = path.join(this.backupDir, backupFileName);

      // Execute zip command to create backup
      await new Promise((resolve, reject) => {
        exec(`zip -r ${backupFilePath} ${this.dataPath}`, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      console.log(`Backup created successfully: ${backupFilePath}`);
    } catch (error) {
      console.error('Error creating backup:', error.message);
    }
  }

  // Function to restore data from the latest backup
  async restoreFromLatestBackup() {
    try {
      // Check if backup directory exists
      if (!(await fs.exists(this.backupDir))) {
        throw new Error('Backup directory does not exist');
      }

      // List all backup files in the directory
      const backupFiles = await fs.readdir(this.backupDir);
      const backups = backupFiles.filter(file => file.endsWith('.zip'))
        .map(file => path.join(this.backupDir, file));

      // Find the latest backup file
      const latestBackup = backups.length > 0 ? backups[0] : null;
      if (!latestBackup) {
        throw new Error('No backup files found');
      }

      // Extract the latest backup to the data path
      await new Promise((resolve, reject) => {
        exec(`unzip ${latestBackup} -d ${this.dataPath}`, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });

      console.log('Data restored successfully from latest backup');
    } catch (error) {
      console.error('Error restoring data:', error.message);
    }
  }
}

// Example usage
const backupService = new BackupRestoreService('./backups', './data');
backupService.createBackup(); // Create a backup
backupService.restoreFromLatestBackup(); // Restore from the latest backup