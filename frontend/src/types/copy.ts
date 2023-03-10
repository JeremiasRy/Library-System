import { Base } from "./base";
import { Publisher } from "./publisher";

export interface Copy extends Base {
    isAvailable:boolean,
    title:string,
    publisher: Publisher,
}
export type PostCopy = {
    bookId:number,
    publisherId:number,
}