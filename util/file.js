"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(filePath, filename) {
    var path = filePath + filename;
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, buffer) {
            if (!err) {
                var json = buffer.toString('utf8');
                var arr = JSON.parse(json);
                resolve(arr);
            }
            else {
                reject(err);
            }
        });
    });
}
exports.readFile = readFile;
;
/**
     * @member 写入excel
     * @param {string} data 数据字符串
     * @param {string} filePath 文件夹路径
     * @param {string} fileName 文件名
     * @returns {Promise<void>}
     */
function saveFile(data, filePath, fileName) {
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
    }).catch(Promise.reject);
}
exports.saveFile = saveFile;
//# sourceMappingURL=file.js.map