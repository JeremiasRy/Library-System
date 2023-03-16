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
    token:string,
    expiresAt:Date,
    username:string,
    firstname:string,
    lastname:string,
    email:string,
    roles:string[]
}
export interface FormType {
    type: "Login" | "SignUp"
}
export interface EditUser extends SignUp {
    id: number,
    newPassword: string | null
}