import { BaseAnalyze } from "./base";

export class AssetAnalyze extends BaseAnalyze {
  protected attributeMap: object = {
    1: "assetId",
    2: "name",
    3: "category",
    4: "usedDate",
    5: "desc"
  };
  constructor() {
    super();
  }
}
