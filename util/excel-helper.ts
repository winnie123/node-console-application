
"use strict";
import {Row, Workbook, Worksheet} from "exceljs";
import {CarModel} from "../model/carmodel";
import resolve = Promise.resolve;
import reject = Promise.reject;

const fs = require('fs');

const Excel = require('exceljs');

export default class ExcelHelper {

    /**
     * @member 读取excel
     * @param {string} filePath 文件夹路径
     * @param {string} fileName 文件名
     * @returns {Promise<Workbook>}
     */
    static readExcel<Workbook>(filePath: string, fileName: string): Promise<Workbook> {
        let path: string = filePath + fileName;
        if(!fs.existsSync(path)){
            return Promise.reject('文件不存在');
        }
        let workbook = new Excel.Workbook();
        return new Promise<Workbook>((reslove, resject) => {
            workbook.xlsx.readFile(path).then((workbook: Workbook) => {
                reslove(workbook);
            }).catch(resject);
        });
    }

    /**
     * @member 写入excel
     * @param {string} data 数据字符串
     * @param {string} filePath 文件夹路径
     * @param {string} fileName 文件名
     * @returns {Promise<void>}
     */
    static saveExcel<T>(data: string, filePath: string, fileName: string): Promise<void> {
        let result: boolean = true;
        let path: string = filePath + fileName;
        return new Promise((resolve, reject) => {
            // 写入内容
            fs.open(path, 'w+', (err, fd) => {
                if (err) {
                    reject(err);
                }
                resolve(fd);
            });
        }).then((fd) => {
            fs.writeFile(fd, data, (err) => {
                Promise.reject(err);
            });
        }).catch(reject);

    }
}