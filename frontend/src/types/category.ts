import { Base } from "./base";
import { Book } from "./book";

export interface Category extends Base {
    title:string,
    description: null | string,
    books: null | Book[]
}
export type UpdateCategory = Omit<Category, "books">;
export type CreateCategory = Omit<UpdateCategory, "id">;