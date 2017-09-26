const XLSX = require('ts-xlsx');

export class ExcelHelper {
    static readExcel<T>(filePath: string, filename: string): Array<T> {
        let path = filePath + filename;
        let result = [];
        let xlsxData  = XLSX.read(path);
        return result;
    }

    static execlToJson<T>(excelContent: string): T {
        let result = <T>{};
        return result;
    }
}