export type CurrentModel = {
    obj: object,
    attribute: string,
    type: string
}

export type categroyRefsModel = {
    attribute : string,
    type : string,
    metadata : string,
    value : categroyRefsModel[],
    index : number
}