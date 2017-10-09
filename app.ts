
import { ExcelHelper } from './util/excel-helper';
import { Analyze } from './biz/analyze';
import { Workbook } from "exceljs";
import { CarModel } from "./model/carmodel";

let run = (): void => {

    console.log('程序启动。。。');
    console.log('开始读取文件');
    // 读取excel
    ExcelHelper.readExcel('res/', 'data.xlsx').then((workbook: Workbook) => {
        console.log('开始解析文件');
        let data : string = '';
        try {
            // 解析excel
            let arr: CarModel[] = Analyze.analyzeExcel(workbook);

            data = JSON.stringify(arr);
            console.log('文件解析成功');
            console.log('写入文件');
        }
        catch (ex) {
            console.log('系统异常：' + ex.message);
            Promise.reject(ex);
        }
        // 写入excel
        ExcelHelper.saveExcel(data, 'res/', 'data.json').then(() => {
            console.log('文件写入完成');
        }).catch((err) => {
            Promise.reject(err);
        });
    }).catch((err) => {
        console.log('系统异常：' + err.message);
    });
};


run();
