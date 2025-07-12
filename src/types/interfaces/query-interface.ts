export interface IQeury{
    search?:string,
    page?:string
}

export interface IPagination{
    total_doc:number,
    total_page:number,
    current_page:number,
    doc_per_page:number,
    data:any[],
    flag?:string
}