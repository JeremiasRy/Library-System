import { Base } from "./base";
import { Copy } from "./copy";
import { Pagination } from "./pagination";
import { User } from "./user";

export interface Loan extends Base {
    user:User,
    copy:Copy,
    LoanedAt:Date,
    DueDate:Date,
    returned:boolean
}

export type LoanFilter = {
    filter: "OnGoing" | "Expired",
    pagination: Pagination | null
}

export type MakeLoan = {
    userId: number,
    copyId: number
}

export type UpdateLoan = {
    returned: boolean | null,
    dueDate: Date | null
}