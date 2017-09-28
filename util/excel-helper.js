"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var Excel = require('exceljs');
var ExcelHelper = (function () {
    function ExcelHelper() {
    }
    ExcelHelper.readExcel = function (filePath, fileName) {
        var path = filePath + fileName;
        // if(!fs.exists(path)){
        //     Promise.reject('文件不存在');
        //     return ;
        // }
        var workbook = new Excel.Workbook();
        return new Promise(function (reslove, resject) {
            workbook.xlsx.readFile(path).then(function (workbook) {
                reslove(workbook);
            }).catch(resject);
        });
    };
    ExcelHelper.saveExcel = function (data, filePath, fileName) {
        var result = true;
        var path = filePath + fileName;
        try {
            // if(!fs.existsSync(filePath)){ // 没有文件
            //     // 创建文件
            //     fs.mkdirSync(filePath);
            // }
            return new Promise(function (resolve, reject) {
                // 写入内容
                fs.open(path, 'w+', function (err, fd) {
                    if (err) {
                        // TODO
                        reject(err);
                        return;
                    }
                    resolve(fd);
                });
            }).then(function (fd) {
                fs.writeFile(fd, data, function (err) {
                    Promise.reject(err);
                });
            });
        }
        catch (ex) {
        }
    };
    return ExcelHelper;
}());
exports.default = ExcelHelper;
