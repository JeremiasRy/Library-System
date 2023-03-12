import { HasTitleAndDescription } from "./base";
import { Book } from "./book";

export interface Category extends HasTitleAndDescription {
    books: null | Book[]
}
export type UpdateCategory = Omit<Category, "books">;
export type CreateCategory = Omit<UpdateCategory, "id">;