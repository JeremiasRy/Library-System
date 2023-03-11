import { HasTitle } from "./base";
import { Publisher } from "./publisher";

export interface Copy extends HasTitle {
    isAvailable:boolean,
    title:string,
    publisher: Publisher,
}
export type PostCopy = {
    bookId:number,
    publisherId:number,
}