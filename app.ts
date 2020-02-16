
import { ExcelHelper } from './util/excel-helper';
import { saveFile ,readFile} from './util/file'
// import { AnalyzeDataModel } from './analyze/datamodel';
import { Workbook } from "exceljs";
import * as AnalyzeFactory from './analyze/factory';

const saveJsonData = (): void => {

    console.log('程序启动。。。');
    console.log('开始读取文件');
    const type = 'medical';
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
        saveFile(data, 'res/', 'data.json').then(() => {
            console.log('文件写入完成');
        }).catch((err) => {
            Promise.reject(err);
        });
    }).catch((err) => {
        console.log('系统异常：' + err.message.toString());
    });

};

const saveExcelData = (): void => {
    const type = 'medical';
    const analyze = AnalyzeFactory.getInstance(type);
    const columns = analyze.initColums()
    const readDirPath = 'res/'
    const readFileName = 'data.json'
    readFile(readDirPath,readFileName).then((data)=>{
        const saveDirPath = 'res/'
        const saveFileName = 'data.xlsx'
        ExcelHelper.saveExcel(data, 'js error', columns, saveDirPath, saveFileName)
    })
}

// saveJsonData();
saveExcelData()
