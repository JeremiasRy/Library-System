import { Author } from "./author";
import { Base, HasTitle } from "./base";
import { Category } from "./category";
import { Copy } from "./copy";
import { Publisher } from "./publisher";

export interface Book extends HasTitle {
    description: null | string,
    categories: Category[] | null,
    authors: Author[] | null,
    publishers: Publisher[] | null,
    copies: Copy[] | null,
    copiesAvailable:number | null
};
export type PostBook = Omit<Book, "id" | "categories" | "authors" | "publishers" | "copies" | "copiesAvailable">;