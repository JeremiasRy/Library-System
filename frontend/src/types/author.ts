import { Base } from "./base";

export interface Author extends Base {
    firstname:string,
    lastname:string
};
export type CreateAuthor = Omit<Author, "id">; 