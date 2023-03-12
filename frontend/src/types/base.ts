export interface Base {
    id:number
};
export interface HasTitleAndDescription extends Base {
    title:string,
    description: string | null,
}