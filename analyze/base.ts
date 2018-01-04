import { Workbook, Worksheet, Row, Cell } from "exceljs";

export class BaseAnalyze{
    protected attributeMap : object;
    public analyzeExcel<T>(workbook: Workbook): T[] {
        if (!workbook || workbook.worksheets.length === 0) {
            throw Error('worksheet异常');
        }
        let self = this;
        let arr: T[] = [];
        // // use workbook
        let worksheet: Worksheet = workbook.worksheets[0];
        worksheet.eachRow((row: Row, rowNumber: number) => {
            if (rowNumber !== 1) {
                let model: T = {} as T;
                row.eachCell((cell, colNumber) => {
                    model[self.attributeMap[colNumber]] = cell.value;
                });
                arr.push(model);
            }
        });
        return arr;
    }
}