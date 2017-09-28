"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var excel_helper_1 = require("./util/excel-helper");
var analyze_1 = require("./biz/analyze");
var run = function () {
    excel_helper_1.default.readExcel('res/', 'data.xlsx').then(function (workbook) {
        var arr = analyze_1.default.analyzeExcel(workbook);
        excel_helper_1.default.saveExcel(arr, 'res/', 'data.json').catch(function (err) {
            console.log(err);
        });
    });
};
run();
