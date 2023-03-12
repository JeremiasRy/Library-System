import { Loan } from "../../types/loan";

export default function LoanCard(props: {loan:Loan}) {
    return (
        <div className="loan-card">
            <h4>{props.loan.copy.title}</h4>
            Loaned at: <p>{new Date(props.loan.loanedAt).toDateString()}</p>
            <p>{props.loan.returned ? "Loan returned" : `Due date: ${new Date(props.loan.dueDate).toDateString()}`}</p>
        </div>
    )
}