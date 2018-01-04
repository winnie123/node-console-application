"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var AssetAnalyze = /** @class */ (function (_super) {
    __extends(AssetAnalyze, _super);
    function AssetAnalyze() {
        var _this = _super.call(this) || this;
        _this.attributeMap = {
            1: "assetId",
            2: "name",
            3: "category",
            4: "usedDate",
            5: "desc"
        };
        return _this;
    }
    return AssetAnalyze;
}(base_1.BaseAnalyze));
exports.AssetAnalyze = AssetAnalyze;
//# sourceMappingURL=asset.js.map