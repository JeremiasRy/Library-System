import { Base } from "./base";
import { Copy } from "./copy";
import { User } from "./user";

export interface Loan extends Base {
    user:User,
    copy:Copy,
    LoanedAt:Date,
    DueDate:Date,
    returned:boolean
}