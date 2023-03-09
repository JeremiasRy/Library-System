import { Base } from "./base";
import { Book } from "./book";

export interface Category extends Base {
    title:string,
    description: null | string,
    books: null | Book[]
}