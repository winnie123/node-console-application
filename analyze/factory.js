"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var analyze_1 = require("./analyze");
var asset_1 = require("./asset");
var medical_1 = require("./medical");
var map = {
    'car': analyze_1.CarAnalyze,
    'asset': asset_1.AssetAnalyze,
    'medical': medical_1.MedicalAnalyze
};
function getInstance(type) {
    return new map[type]();
}
exports.getInstance = getInstance;
//# sourceMappingURL=factory.js.map