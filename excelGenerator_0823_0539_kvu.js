// 代码生成时间: 2025-08-23 05:39:13
// 导入必要的库
const xlsx = require('node-xlsx');

// Excel生成器类
class ExcelGenerator {
  // 构造函数，初始化工作簿
  constructor() {
    this.wb = xlsx.createWorkbook();
  }

  // 添加表头
  addHeader(headers) {
    // 创建一个新的工作表
    const ws = xlsx.createSheet();
    // 添加表头
    ws.data[0] = headers;
    // 将工作表添加到工作簿
    this.wb.SheetNames.push(ws.name);
    this.wb.Sheets[ws.name] = ws;
  }

  // 添加数据行
  addDataRow(dataRow) {
    // 获取工作表
    const ws = this.wb.Sheets[this.wb.SheetNames[0]];
    // 添加一行数据
    ws.data.push(dataRow);
  }

  // 导出Excel文件
  exportAsExcel(fileName) {
    // 保存工作簿为Excel文件
    const buf = xlsx.build(this.wb);
    // 设置响应头
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // 发送文件流
    res.send(buf);
  }
}

// 使用示例
const excelGen = new ExcelGenerator();

// 添加表头
excelGen.addHeader(['姓名', '年龄', '城市']);

// 添加数据行
excelGen.addDataRow(['John Doe', 30, 'New York']);
excelGen.addDataRow(['Jane Doe', 25, 'Los Angeles']);

// 导出Excel文件
excelGen.exportAsExcel('example');
