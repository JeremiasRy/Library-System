import { Base } from "./base";

export interface Publisher extends Base {
    publisherName:string
};
export type PostPublisher = Omit<Publisher, "id">;