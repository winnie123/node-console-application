"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excel_helper_1 = require("./util/excel-helper");
var analyze_1 = require("./biz/analyze");
var run = function () {
    // 读取excel
    excel_helper_1.default.readExcel('res/', 'data.xlsx').then(function (workbook) {
        try {
            // 解析excel
            var arr = analyze_1.default.analyzeExcel(workbook);
            var data = JSON.stringify(arr);
            // 写入excel
            excel_helper_1.default.saveExcel(data, 'res/', 'data.json').catch(function (err) {
                Promise.reject(err);
            });
        }
        catch (ex) {
            Promise.reject(ex);
        }
    }).catch(function (err) {
        console.log(err);
    });
};
run();
var XLSX = require('util/file');
//# sourceMappingURL=app.js.map