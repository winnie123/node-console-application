
"use strict";
import { Row, Workbook, Worksheet } from "exceljs";

const fs = require('fs');

const Excel = require('exceljs');

export class ExcelHelper {

    /**
     * @member 读取excel
     * @param {string} filePath 文件夹路径
     * @param {string} fileName 文件名
     * @returns {Promise<Workbook>}
     */
    public static readExcel<Workbook>(filePath: string, fileName: string): Promise<Workbook> {
        let path: string = filePath + fileName;
        if (!fs.existsSync(path)) {
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
    public static async saveExcel<T>(data: Array<T>, sheetName: string, columns: Array<T>, filePath: string, fileName: string): Promise<void> {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet(sheetName);
        worksheet.columns = columns
        //  [
        //     { header: 'Id', key: 'id', width: 10 },
        //     { header: 'Name', key: 'name', width: 32 },
        //     { header: 'D.O.B.', key: 'dob', width: 15, }
        // ];
        data.forEach((item) => {
            worksheet.addRow(item)
        })
        const path: string = filePath + fileName;
        // save under export.xlsx
        await workbook.xlsx.writeFile(path);

        console.log("File is written");

    }
}