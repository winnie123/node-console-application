"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reject = Promise.reject;
var fs = require('fs');
var Excel = require('exceljs');
var ExcelHelper = (function () {
    function ExcelHelper() {
    }
    /**
     * @member 读取excel
     * @param {string} filePath 文件夹路径
     * @param {string} fileName 文件名
     * @returns {Promise<Workbook>}
     */
    ExcelHelper.readExcel = function (filePath, fileName) {
        var path = filePath + fileName;
        if (!fs.existsSync(path)) {
            return Promise.reject('文件不存在');
        }
        var workbook = new Excel.Workbook();
        return new Promise(function (reslove, resject) {
            workbook.xlsx.readFile(path).then(function (workbook) {
                reslove(workbook);
            }).catch(resject);
        });
    };
    /**
     * @member 写入excel
     * @param {string} data 数据字符串
     * @param {string} filePath 文件夹路径
     * @param {string} fileName 文件名
     * @returns {Promise<void>}
     */
    ExcelHelper.saveExcel = function (data, filePath, fileName) {
        var result = true;
        var path = filePath + fileName;
        return new Promise(function (resolve, reject) {
            // 写入内容
            fs.open(path, 'w+', function (err, fd) {
                if (err) {
                    reject(err);
                }
                resolve(fd);
            });
        }).then(function (fd) {
            fs.writeFile(fd, data, function (err) {
                Promise.reject(err);
            });
        }).catch(reject);
    };
    return ExcelHelper;
}());
exports.default = ExcelHelper;
//# sourceMappingURL=excel-helper.js.map