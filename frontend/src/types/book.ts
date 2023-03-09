import { Author } from "./author";
import { Base } from "./base";
import { Category } from "./category";
import { Publisher } from "./publisher";

export interface Book extends Base {
    title:string,
    description: null | string,
    categories: Category[],
    authors: Author[],
    publishers: Publisher[]
};