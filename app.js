"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excel_helper_1 = require("./util/excel-helper");
var AnalyzeFactory = require("./analyze/factory");
var run = function () {
    console.log('程序启动。。。');
    console.log('开始读取文件');
    var index = 1;
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
            // let result = AnalyzeDataModel.analyzeToModel(workbook, index);
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
        excel_helper_1.ExcelHelper.saveExcel(data, 'res/', 'data.json').then(function () {
            console.log('文件写入完成');
        }).catch(function (err) {
            Promise.reject(err);
        });
    }).catch(function (err) {
        console.log('系统异常：' + err.message.toString());
    });
};
run();
//# sourceMappingURL=app.js.map