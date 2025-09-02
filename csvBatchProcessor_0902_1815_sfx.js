// 代码生成时间: 2025-09-02 18:15:00
 * It includes error handling, comments, and follows best practices for maintainability and scalability.
 */

// Import necessary libraries and modules
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const { Transform } = require('stream')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)

// Function to read and process a single CSV file
async function processSingleCsvFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = []
    let errorOccurred = false
    const readable = fs.createReadStream(filePath)
    const writable = new Transform({
      transform(chunk, encoding, callback) {
        try {
          const data = JSON.parse(chunk.toString())
          results.push(data)
          callback()
        } catch (err) {
          callback(err)
        }
      },
      flush(callback) {
        callback()
        resolve(results)
      },
    })

    readable
      .pipe(csv())
      .on('data', (data) => {
        writable.write(JSON.stringify(data))
      })
      .on('error', (err) => {
        errorOccurred = true
        reject(err)
      })
      .on('end', () => {
        if (!errorOccurred) {
          writable.end()
        }
      })
  })
}

// Function to process all CSV files within a directory
async function processCsvFilesInDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath)
  const csvFiles = files.filter(file => path.extname(file) === '.csv')
  const results = []

  for (const file of csvFiles) {
    try {
      const filePath = path.join(directoryPath, file)
      const data = await processSingleCsvFile(filePath)
      results.push(...data)
    } catch (error) {
      console.error(`Error processing file ${file}: ${error.message}`)
    }
  }

  return results
}

// Example usage:
// processCsvFilesInDirectory('./csvFiles').then(allData => {
//   console.log('All CSV data processed:', allData)
// }).catch(error => {
//   console.error('An error occurred:', error)
// })
