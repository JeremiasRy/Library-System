import { Base } from "./base";

export type SignUp = {
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    password:string
};
export type SignIn = {
    email:string,
    password:string
};
export interface User extends Base {
    username:string,
    firstname:string,
    lastname:string,
    email:string,
}