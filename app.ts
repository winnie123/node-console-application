
import ExcelHelper from './util/excel-helper';
import Analyze from './biz/analyze';
import {Workbook} from "exceljs";
import {CarModel} from "./model/carmodel";

let run = (): void => {

    // 读取excel
    ExcelHelper.readExcel('res/', 'data.xlsx').then((workbook: Workbook) => {

        try{
            // 解析excel
            let arr: Array<CarModel> = Analyze.analyzeExcel(workbook);

            let data = JSON.stringify(arr);

            // 写入excel
            ExcelHelper.saveExcel(data, 'res/', 'data.json').catch((err) => {
                Promise.reject(err);
            });
        }
        catch(ex){
            Promise.reject(ex);
        }


    }).catch((err)=>{
        console.log(err);
    });
};


run();

const XLSX = require('util/file');
