"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excel_helper_1 = require("./util/excel-helper");
var file_1 = require("./util/file");
var AnalyzeFactory = require("./analyze/factory");
var saveJsonData = function () {
    console.log('程序启动。。。');
    console.log('开始读取文件');
    var type = 'medical';
    // const filename = 'data.xlsx';
    var filename = 'medical.xlsx';
    // 读取excel
    excel_helper_1.ExcelHelper.readExcel('res/', filename).then(function (workbook) {
        console.log('开始解析文件');
        var data = '';
        try {
            // 解析excel
            var analyze = AnalyzeFactory.getInstance(type);
            var arr = analyze.analyzeExcel(workbook);
            data = JSON.stringify(arr);
            // data = result;
            console.log('文件解析成功');
            console.log('写入文件');
        }
        catch (ex) {
            console.log('系统异常：' + ex.message.toString());
            Promise.reject(ex);
        }
        // 写入excel
        file_1.saveFile(data, 'res/', 'data.json').then(function () {
            console.log('文件写入完成');
        }).catch(function (err) {
            Promise.reject(err);
        });
    }).catch(function (err) {
        console.log('系统异常：' + err.message.toString());
    });
};
var saveExcelData = function () {
    var type = 'medical';
    var analyze = AnalyzeFactory.getInstance(type);
    var columns = analyze.initColums();
    var readDirPath = 'res/';
    var readFileName = 'data.json';
    file_1.readFile(readDirPath, readFileName).then(function (data) {
        var saveDirPath = 'res/';
        var saveFileName = 'data.xlsx';
        excel_helper_1.ExcelHelper.saveExcel(data, 'js error', columns, saveDirPath, saveFileName);
    });
};
// saveJsonData();
saveExcelData();
//# sourceMappingURL=app.js.map