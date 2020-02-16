"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var Excel = require('exceljs');
var ExcelHelper = /** @class */ (function () {
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
    ExcelHelper.saveExcel = function (data, sheetName, columns, filePath, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var workbook, worksheet, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        workbook = new Excel.Workbook();
                        worksheet = workbook.addWorksheet(sheetName);
                        worksheet.columns = columns;
                        //  [
                        //     { header: 'Id', key: 'id', width: 10 },
                        //     { header: 'Name', key: 'name', width: 32 },
                        //     { header: 'D.O.B.', key: 'dob', width: 15, }
                        // ];
                        data.forEach(function (item) {
                            worksheet.addRow(item);
                        });
                        path = filePath + fileName;
                        // save under export.xlsx
                        return [4 /*yield*/, workbook.xlsx.writeFile(path)];
                    case 1:
                        // save under export.xlsx
                        _a.sent();
                        console.log("File is written");
                        return [2 /*return*/];
                }
            });
        });
    };
    return ExcelHelper;
}());
exports.ExcelHelper = ExcelHelper;
//# sourceMappingURL=excel-helper.js.map