
import { ExcelHelper } from './util/excel-helper';
import { AnalyzeDataModel } from './analyze/datamodel';
import { Workbook } from "exceljs";
import { CarModel } from "./model/carmodel";
import * as AnalyzeFactory from './analyze/factory';

let run = (): void => {

    console.log('程序启动。。。');
    console.log('开始读取文件');
    const index = 1;
    const type = 'asset';
    // const filename = 'data.xlsx';
    const filename = 'medical.xlsx';
    // 读取excel
    ExcelHelper.readExcel('res/', filename).then((workbook: Workbook) => {
        console.log('开始解析文件');
        let data: string = '';
        try {
            // 解析excel
            let analyze = AnalyzeFactory.getInstance(type);
            let arr: any[] = analyze.analyzeExcel(workbook);

            // let result = AnalyzeDataModel.analyzeToModel(workbook, index);

            data = JSON.stringify(arr);
            // data = result;
            console.log('文件解析成功');
            console.log('写入文件');
        }
        catch (ex) {
            console.log('系统异常：' + ex.message.toString());
            Promise.reject(ex);
        }
        // 写入excel
        ExcelHelper.saveExcel(data, 'res/', 'data.json').then(() => {
            console.log('文件写入完成');
        }).catch((err) => {
            Promise.reject(err);
        });
    }).catch((err) => {
        console.log('系统异常：' + err.message.toString());
    });
};


run();
