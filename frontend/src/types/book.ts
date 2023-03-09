import { Author } from "./author";
import { Base } from "./base";
import { Category } from "./category";
import { Copy } from "./copy";
import { Publisher } from "./publisher";

export interface Book extends Base {
    title:string,
    description: null | string,
    categories: Category[],
    authors: Author[],
    publishers: Publisher[]
    copies: Copy[],
    copiesAvailable:number
};
export interface UpdateBook extends Base {
    title:string,
    description: string | null,
}
export type PostBook = Omit<UpdateBook, "id">;