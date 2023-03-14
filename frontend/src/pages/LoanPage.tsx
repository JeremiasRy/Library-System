import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getLoanById } from "../redux/reducers/loanReducer";
import { Loan } from "../types/loan";

export default function LoanPage() {
    const { id } = useParams();
    const loan = useAppSelector(state => state.loan) as unknown as Loan;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLoanById(parseInt(id as string)))
    }, [id])

    if (Array.isArray(loan)) {
        return <>Loading...</>
    }
    return (
        <div className="loan-page">
            {loan.copy.title}
        </div>
    )
}