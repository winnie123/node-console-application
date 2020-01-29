"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AnalyzeDataModel = /** @class */ (function () {
    function AnalyzeDataModel() {
    }
    AnalyzeDataModel.analyzeToModel = function (workbook, sheetIndex) {
        var _this = this;
        if (workbook.worksheets.length === 0) {
            throw Error('worksheet异常');
        }
        // 循环遍历每行每个单元格
        var worksheet = workbook.worksheets[sheetIndex];
        var refs = [];
        worksheet.eachRow(function (row, rowNumber) {
            if (rowNumber !== 1) {
                row.eachCell(function (cell, colNumber) {
                    // 属性之间的父子关系
                    _this.initAttrRefs(cell, colNumber, refs);
                });
            }
        });
        var modelStr = '';
        // 递归解析属关系，生成类型
        refs.forEach(function (item) {
            modelStr += _this.initModel(item) + ",";
        });
        modelStr = "{" + modelStr + "}";
        return modelStr;
    };
    /**
     * 建立所有属性的父子关系
     * @param cell 单元格对象
     * @param colNumber 单元格所以编号
     * @param refs 关系集合
     */
    AnalyzeDataModel.initAttrRefs = function (cell, colNumber, refs) {
        if (this.colNames[colNumber] && this.colNames[colNumber].colName === 'Name' && cell.value) { // 记录属性名
            var newAttr = {
                attribute: cell.value.toString(),
                value: [],
                index: colNumber,
                type: '',
                metadata: ''
            };
            var lastRef = refs.length && refs[refs.length - 1]; // 获取上一行数据对象
            if (!refs.length) { // 直接将根节点对象，保存到集合中
                refs.push(newAttr);
            }
            else if (lastRef && this.isRowspan(lastRef, newAttr.attribute)) { // 判断是否是合并行
                return; // 如果是合并行，直接跳过
            }
            else if (colNumber === 2) {
                refs.push(newAttr);
            }
            else { // 如果不是根节点，保存到父节点中
                var current = this.cashRefs[this.cashRefs.length - 1];
                // 重新指向当前节点的父节点，通过index进行查找，只有当index小于当前节点的index时表示是其父节点
                while (current.index >= colNumber) {
                    this.cashRefs.pop();
                    current = this.cashRefs[this.cashRefs.length - 1];
                }
                // 保存到父节点
                current.value.push(newAttr);
            }
            // 记录到缓存，大部分情况下新节点和上一个节点是父子或兄弟关系，直接从上一个节点查询会减少查询次数。
            this.cashRefs.push(newAttr);
        }
        else if (this.colNames[colNumber] && this.colNames[colNumber].colName) { // 其他字段
            var current = this.cashRefs[this.cashRefs.length - 1];
            var attributeName = this.colNames[colNumber].colName.toLowerCase();
            current[attributeName] = cell.value && cell.value.toString();
        }
    };
    /**
     * 构建model类，生成字符串
     * @param ref 属性关系对象
     */
    AnalyzeDataModel.initModel = function (ref) {
        var attribute = ref.attribute;
        var categroy = this.initCategroy(ref);
        var result = attribute + " : " + categroy;
        return result;
    };
    /**
     * 设置类型
     * @param ref 属性关系对象
     */
    AnalyzeDataModel.initCategroy = function (ref) {
        var _this = this;
        var str = '';
        // 如果没有子元素，直接设置类型
        if (!ref.value.length) {
            str = this.setColAttribute(this.categoryMap[ref.metadata]);
        }
        else { // 如果有子元素，递归设置类型
            var result_1 = [];
            ref.value.forEach(function (item) {
                result_1.push("" + _this.initModel(item)); // 设置完成后进行拼接
            });
            str = result_1.join(',');
            str = "{" + str + "}";
            str += this.setColAttribute(this.categoryMap[ref.metadata]);
        }
        return str;
    };
    AnalyzeDataModel.isRowspan = function (lastRef, currentArribute) {
        var _this = this;
        var result = false;
        lastRef.value.forEach(function (item) {
            result = _this.isRowspan(item, currentArribute);
        });
        result = result || lastRef.attribute === currentArribute;
        return result;
    };
    AnalyzeDataModel.setColValue = function (modelObj, colName, colValue) {
        modelObj[colName] = colValue;
        return modelObj;
    };
    AnalyzeDataModel.setColAttribute = function (category) {
        var result = category;
        switch (category) {
            case 'Price': {
                result = this.setPriceCategory();
                break;
            }
            case 'Array<T>': {
                result = '[]';
            }
        }
        return result;
    };
    AnalyzeDataModel.setPriceCategory = function () {
        return "{value:number}";
    };
    AnalyzeDataModel.currentArribute = [];
    AnalyzeDataModel.cashRefs = [];
    AnalyzeDataModel.objectCategory = ['List', 'Price', 'NullableClass'];
    AnalyzeDataModel.categoryMap = {
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
        'Class': ''
    };
    AnalyzeDataModel.colNames = {
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
    };
    return AnalyzeDataModel;
}());
exports.AnalyzeDataModel = AnalyzeDataModel;
//# sourceMappingURL=datamodel.js.map