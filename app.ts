import ExcelHelper from './util/excel-helper';
import Analyze from './biz/analyze';
import {Workbook} from "exceljs";
import {CarModel} from "./model/carmodel";

let run = ()=>{

    ExcelHelper.readExcel('res/','data.xlsx').then((workbook : Workbook)=>{
        let arr : Array<CarModel> =  Analyze.analyzeExcel(workbook);
        ExcelHelper.saveExcel(arr,'res/','data.json').catch((err)=>{
            console.log(err);
        });
    });
};


run();

