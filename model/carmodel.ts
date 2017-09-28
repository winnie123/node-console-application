export interface CarModel{
    id: number, // 序号
    typeA: string,// 机具大类
    typeB: string,// 机具小类
    category: string,// 机具品目
    company: string,// 生产企业
    type: string,// 产品名称
    carType: string,// 机具型号
    name: string,// 拟归入分档名称
    carNo: string,// 车牌号码
    carCity: string,// 车牌城市名称
    n: number,// 经度
    l: number// 维度
}