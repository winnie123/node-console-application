import { Workbook, Worksheet, Row, Cell } from 'exceljs';
import { CurrentModel, categroyRefsModel } from '../model/datamodel';

export class AnalyzeDataModel {

    public static analyzeToModel<T>(workbook: Workbook, sheetIndex: number): string {
        if (workbook.worksheets.length === 0) {
            throw Error('worksheet异常');
        }

        // 循环遍历每行每个单元格
        let worksheet: Worksheet = workbook.worksheets[sheetIndex];
        let refs: categroyRefsModel[] = [];
        worksheet.eachRow((row: Row, rowNumber: number): void => {
            if (rowNumber !== 1) {
                row.eachCell((cell: Cell, colNumber: number): void => {
                    // 属性之间的父子关系
                    this.initAttrRefs(cell, colNumber, refs);
                });
            }
        });

        let modelStr: string = '';
        // 递归解析属关系，生成类型
        refs.forEach((item: categroyRefsModel) => {
            modelStr += `${this.initModel(item)},`;
        });

        modelStr = `{${modelStr}}`;
        return modelStr;
    }

    private static currentArribute: CurrentModel[] = [];
    private static cashRefs: categroyRefsModel[] = [];
    private static objectCategory: string[] = ['List', 'Price', 'NullableClass'];
    private static categoryMap: object = {
        'List': 'Array<T>',
        'Enum': 'number',
        'Int4': 'number',
        'Dynamic': 'number',
        'Int20': 'number',
        'Code8': 'string',
        'Boolean': 'boolean',
        'Decimal1': 'number',
        'Int10': 'number',
        'Code2': 'string',
        'DateTime': 'string',
        'Price': 'Price',
        'NullableClass': '',
        'Class' : ''
    };


    private static colNames = {
        2: {
            colName: 'Name'
        },
        3: {
            colName: 'Name'
        },
        4: {
            colName: 'Name'
        },
        5: {
            colName: 'Name'
        },
        6: {
            colName: 'ShortName'
        },
        7: {
            colName: 'Type'
        },
        8: {
            colName: 'Metadata'
        }
    }


    /**
     * 建立所有属性的父子关系
     * @param cell 单元格对象
     * @param colNumber 单元格所以编号
     * @param refs 关系集合
     */
    private static initAttrRefs(cell: Cell, colNumber: number, refs: categroyRefsModel[]): void {
        if (this.colNames[colNumber] && this.colNames[colNumber].colName === 'Name' && cell.value) {// 记录属性名
            let newAttr: categroyRefsModel = {// 构建一个新的关系对象
                attribute: cell.value.toString(),
                value: [],
                index: colNumber,
                type: '',
                metadata: ''
            }

            let lastRef =refs.length && refs[refs.length-1];// 获取上一行数据对象
            if (!refs.length) {// 直接将根节点对象，保存到集合中
                    refs.push(newAttr);
            }
            else if(lastRef && this.isRowspan(lastRef,newAttr.attribute)){// 判断是否是合并行
                return;// 如果是合并行，直接跳过
            }
            else if(colNumber === 2){
                refs.push(newAttr);
            }
            else {// 如果不是根节点，保存到父节点中
                let current: categroyRefsModel = this.cashRefs[this.cashRefs.length - 1]
                // 重新指向当前节点的父节点，通过index进行查找，只有当index小于当前节点的index时表示是其父节点
                while (current.index >= colNumber) {
                    this.cashRefs.pop();
                    current = this.cashRefs[this.cashRefs.length - 1];
                }
                // 保存到父节点
                current.value.push(newAttr);
            }
            // 记录到缓存，大部分情况下新节点和上一个节点是父子或兄弟关系，直接从上一个节点查询会减少查询次数。
            this.cashRefs.push(newAttr)
        }
        else if (this.colNames[colNumber] && this.colNames[colNumber].colName) {// 其他字段
            let current: categroyRefsModel = this.cashRefs[this.cashRefs.length - 1];
            let attributeName = this.colNames[colNumber].colName.toLowerCase();
            current[attributeName] = cell.value && cell.value.toString();
        }
    }

    /**
     * 构建model类，生成字符串
     * @param ref 属性关系对象
     */
    private static initModel(ref: categroyRefsModel): string {
        let attribute: string = ref.attribute;
        let categroy: string = this.initCategroy(ref);
        let result = `${attribute} : ${categroy}`;
        return result;
    }

    /**
     * 设置类型
     * @param ref 属性关系对象
     */
    private static initCategroy(ref: categroyRefsModel): string {
        let str : string = '';
        // 如果没有子元素，直接设置类型
        if (!ref.value.length) {
            str = this.setColAttribute(this.categoryMap[ref.metadata]);
        }
        else {// 如果有子元素，递归设置类型
            let result : string[] = [];
            ref.value.forEach((item: categroyRefsModel) => {
                result.push(`${this.initModel(item)}`)// 设置完成后进行拼接
            });
            str = result.join(',');
            str = `{${str}}`;
            str += this.setColAttribute(this.categoryMap[ref.metadata]);
        }
        return str;
    }

    private static isRowspan(lastRef : categroyRefsModel,currentArribute : string):boolean{
        let result : boolean = false;
        lastRef.value.forEach((item:categroyRefsModel)=>{
            result = this.isRowspan(item,currentArribute);
        });
        result = result || lastRef.attribute === currentArribute;
        return result;
    }

    private static setColValue(modelObj: object, colName: string, colValue: string): object {
        modelObj[colName] = colValue;
        return modelObj;
    }

    private static setColAttribute(category: string): string {

        let result = category;
        switch (category) {
            case 'Price': {
                result = this.setPriceCategory();
                break;
            }
            case 'Array<T>' : {
                result = '[]';
            }
        }
        return result;
    }

    private static setPriceCategory(): string {
        return `{value:number}`;
    }
}