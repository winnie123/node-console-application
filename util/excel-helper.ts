"use strict";
import {Row, Workbook, Worksheet} from "exceljs";
import {CarModel} from "../model/carmodel";
import resolve = Promise.resolve;
const fs = require('fs');

const Excel = require('exceljs');

export default class ExcelHelper {

    static readExcel<Workbook>(filePath: string, fileName: string): Promise<Workbook> {
        let path: string = filePath + fileName;
        // if(!fs.exists(path)){
        //     Promise.reject('文件不存在');
        //     return ;
        // }
        let workbook = new Excel.Workbook();
        return new Promise<Workbook>((reslove, resject) => {
            workbook.xlsx.readFile(path).then((workbook: Workbook) => {
                reslove(workbook);
            }).catch(resject);
        });
    }

    static saveExcel<T>(data : Array<T> , filePath : string, fileName : string) : Promise<void>{
        let result : boolean = true;
        let path : string = filePath + fileName;
        try{
            // if(!fs.existsSync(filePath)){ // 没有文件
            //     // 创建文件
            //     fs.mkdirSync(filePath);
            // }

            return new Promise((resolve,reject)=>{
                // 写入内容
                fs.open(path,'w+',(err, fd)=>{
                    if(err){
                        // TODO
                        reject(err);
                        return ;
                    }
                    resolve(fd);
                });
            }).then((fd)=>{
                fs.writeFile(fd,data,(err)=>{
                    Promise.reject(err);
                });
            });

        }
        catch (ex)
        {

        }
    }

}
