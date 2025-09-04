// 代码生成时间: 2025-09-04 09:25:39
const xlsx = require('node-xlsx');
const fs = require('fs');

// ExcelGenerator class to handle excel file creation
class ExcelGenerator {

  constructor() {
    this.data = [];
  }

  // Method to add row to the excel data array
  addRow(row) {
    if (!Array.isArray(row)) {
      throw new Error('Row must be an array');
    }
    this.data.push(row);
  }

  // Method to generate and save the excel file
  generateExcel(filename) {
    try {
      // Create buffer from data
      const buffer = xlsx.build([{ name: 'My Sheet', data: this.data }]);
      // Write buffer to file
      fs.writeFileSync(filename, buffer);
      console.log(`Excel file '${filename}' has been generated successfully!`);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      throw error;
    }
  }
}

// Example usage
const excelGenerator = new ExcelGenerator();

// Adding rows to the excel file
excelGenerator.addRow(['Name', 'Age', 'City']);
excelGenerator.addRow(['John Doe', 30, 'New York']);
excelGenerator.addRow(['Jane Doe', 25, 'Los Angeles']);

// Generating the excel file
excelGenerator.generateExcel('example.xlsx');