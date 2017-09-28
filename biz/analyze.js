"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Analyze = (function () {
    function Analyze() {
    }
    Analyze.analyzeExcel = function (workbook) {
        var self = this;
        if (!workbook || workbook.worksheets.length === 0) {
            throw Error();
        }
        var arr = [];
        // // use workbook
        var worksheet = workbook.worksheets[0];
        worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber !== 1) {
                var model_1 = {};
                row.eachCell(function (cell, colNumber) {
                    model_1[self.attributeMap[colNumber]] = cell.value;
                });
                arr.push(model_1);
            }
        });
        return arr;
    };
    Analyze.attributeMap = {
        1: 'id',
        2: 'typeA',
        3: 'typeB',
        4: 'category',
        5: 'type',
        6: 'carType',
        7: 'name',
        8: 'carNo',
        9: 'carCity',
        10: 'n',
        11: 'l'
    };
    return Analyze;
}());
exports.default = Analyze;
