import { useNavigate } from "react-router-dom";
import { Loan } from "../../types/loan";

export default function LoanCard(props: {loan:Loan, size: "small" | "large"}) {
    const navigate = useNavigate();
    return (
        <div className={`loan-card-${props.size}`} onClick={props.size === "small" ? () => navigate(`${props.loan.id}`) : () => {}}>
            <div className="overlay"></div>
            <div className="details">
                <h4>{props.loan.copy.title}</h4>
                Loaned at: <p>{new Date(props.loan.loanedAt).toDateString()}</p>
                <p>{props.loan.returned ? "Loan returned" : `Due date: ${new Date(props.loan.dueDate).toDateString()}`}</p>
            </div>
        </div>
    )
}