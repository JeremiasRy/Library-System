import { HasTitle } from "./base";
import { Book } from "./book";

export interface Category extends HasTitle {
    description: null | string,
    books: null | Book[]
}
export type UpdateCategory = Omit<Category, "books">;
export type CreateCategory = Omit<UpdateCategory, "id">;