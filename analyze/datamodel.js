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
            modelStr += _this.initModel(item);
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
        if (this.colNames[colNumber] && this.colNames[colNumber].colName === 'Name' && cell.value) {
            var newAttr = {
                attribute: cell.value.toString(),
                value: [],
                index: colNumber,
                type: '',
                metadata: ''
            };
            if (!refs.length || colNumber === 2) {
                refs.push(newAttr);
            }
            else {
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
        else if (this.colNames[colNumber] && this.colNames[colNumber].colName) {
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
        var result = '';
        // 如果没有子元素，直接设置类型
        if (!ref.value.length) {
            result = this.setColAttribute(this.categoryMap[ref.metadata], ref.type);
        }
        else {
            ref.value.forEach(function (item) {
                result += _this.initModel(item); // 设置完成后进行拼接
                if (_this.categoryMap[ref.metadata] === 'Array<T>') {
                    result = result + "[]";
                }
            });
            result = "{" + result + "}";
        }
        return result;
    };
    AnalyzeDataModel.setColValue = function (modelObj, colName, colValue) {
        modelObj[colName] = colValue;
        return modelObj;
    };
    AnalyzeDataModel.setColAttribute = function (category, categoryType) {
        var result = category;
        switch (category) {
            case 'Price': {
                result = this.setPriceCategory();
                break;
            }
        }
        return result;
    };
    AnalyzeDataModel.setPriceCategory = function () {
        return '';
    };
    AnalyzeDataModel.currentArribute = [];
    AnalyzeDataModel.cashRefs = [];
    AnalyzeDataModel.objectCategory = ['List', 'Price', 'NullableClass'];
    AnalyzeDataModel.categoryMap = {
        // 'List': 'Array<T>',
        'Enum': 'enum',
        'int4': 'number',
        'Dynamic': 'number',
        'int20': 'number',
        'Code8': 'string',
        'Boolean': 'bool',
        'Decimal1': 'number',
        'int10': 'number',
        'Code2': 'string',
        'DateTime': 'string',
        'Price': 'Price'
        // 'NullableClass': 'NullableClass'
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
            colName: 'Name'
        },
        10: {
            colName: 'ShortName'
        },
        11: {
            colName: 'Type'
        },
        12: {
            colName: 'MetaData'
        }
    };
    return AnalyzeDataModel;
}());
exports.AnalyzeDataModel = AnalyzeDataModel;
//# sourceMappingURL=datamodel.js.map