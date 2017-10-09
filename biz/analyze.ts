import { Workbook, Worksheet, Row, Cell } from "exceljs";
import { CarModel } from "../model/carmodel";

export class Analyze {

    /**
     * @method 解析excel
     * @param {Workbook} workbook excel对象
     * @returns {Array<CarModel>} 数据集合
     */
    public static analyzeExcel(workbook: Workbook): CarModel[] {
        let self = this;
        if (!workbook || workbook.worksheets.length === 0) {
            throw Error('worksheet异常');
        }
        let arr: CarModel[] = [];
        // // use workbook
        let worksheet: Worksheet = workbook.worksheets[0];
        worksheet.eachRow((row: Row, rowNumber: number) => {
            if (rowNumber !== 1) {
                let model: CarModel = {} as CarModel;
                row.eachCell((cell, colNumber) => {
                    model[self.attributeMap[colNumber]] = cell.value;
                });
                arr.push(model);
            }
        });

        return arr;
    }

    /**
     * excel列与属性映射关系
     */
    private static attributeMap: object = {
        1: 'id',
        2: 'typeA',
        3: 'typeB',
        4: 'category',
        5: 'type',
        6: 'carType',
        7: 'name',
        8: 'carNo',
        9: 'carCity',
        10: 'n',
        11: 'l'
    };
}