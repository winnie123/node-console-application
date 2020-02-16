import { BaseAnalyze } from "./base";

export class MedicalAnalyze extends BaseAnalyze {
  protected attributeMap: object = {
    1: "district",
    2: "company",
    3: "shopName",
    4: "shopAddress",
    5: "shopTel",
    6: "isMedicalInsurance"
  };
  constructor() {
    super();
  }
}
