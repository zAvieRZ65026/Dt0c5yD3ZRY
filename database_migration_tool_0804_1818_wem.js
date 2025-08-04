// 代码生成时间: 2025-08-04 18:18:37
 * It includes error handling, documentation, and best practices for maintainability and scalability.
 */

// Import required dependencies
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const chalk = require('chalk');

// Define the path to the migration scripts
const migrationsPath = path.join(__dirname, 'migrations');

// Function to run a migration script
function runMigration(script) {
  return new Promise((resolve, reject) => {
    exec(`node ${script}`, (error, stdout, stderr) => {
      if (error) {
        console.error(chalk.red(`Error running migration: ${error.message}`));
        return reject(error);
      }
      console.log(chalk.green(`Migration ${script} ran successfully.`));
      resolve(stdout);
    });
  });
}

// Function to apply all migrations
async function applyMigrations() {
  try {
    // Read all migration files from the migrations directory
    const migrationFiles = fs.readdirSync(migrationsPath).filter(file => file.endsWith('.js'));

    // Sort the files to ensure migrations are applied in the correct order
    migrationFiles.sort();

    // Run each migration script
    for (const file of migrationFiles) {
      const scriptPath = path.join(migrationsPath, file);
      await runMigration(scriptPath);
    }
    console.log(chalk.green('All migrations applied successfully.'));
  } catch (error) {
    console.error(chalk.red(`Migration failed: ${error.message}`));
    process.exit(1);
  }
}

// Function to rollback the last applied migration
async function rollbackLastMigration() {
  try {
    // Read the last migration file
    const migrationFiles = fs.readdirSync(migrationsPath).filter(file => file.endsWith('.js'));
    if (migrationFiles.length === 0) {
      console.log(chalk.yellow('No migrations to rollback.'));
      return;
    }
    const lastMigration = migrationFiles[migrationFiles.length - 1];
    const scriptPath = path.join(migrationsPath, lastMigration);

    // Run the rollback script
    await runMigration(scriptPath.replace('.js', '.rollback.js'));
    console.log(chalk.green(`Rollback of ${lastMigration} successful.`));
  } catch (error) {
    console.error(chalk.red(`Rollback failed: ${error.message}`));
    process.exit(1);
  }
}

// Export the migration functions
module.exports = {
  applyMigrations,
  rollbackLastMigration
};