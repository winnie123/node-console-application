"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readFile(filePath, filename) {
    var path = filePath + filename;
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, buffer) {
            if (!err) {
                resolve(buffer);
            }
            else {
                reject(err);
            }
        });
    });
}
;
exports.default = {
    readFile: readFile
};
