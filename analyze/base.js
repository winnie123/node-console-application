"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAnalyze = /** @class */ (function () {
    function BaseAnalyze() {
    }
    BaseAnalyze.prototype.analyzeExcel = function (workbook) {
        if (!workbook || workbook.worksheets.length === 0) {
            throw Error('worksheet异常');
        }
        var self = this;
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
    return BaseAnalyze;
}());
exports.BaseAnalyze = BaseAnalyze;
//# sourceMappingURL=base.js.map