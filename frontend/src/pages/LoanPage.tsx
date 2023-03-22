import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoanCard from "../components/cards/LoanCard";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getLoanById, updateLoan } from "../redux/reducers/loanReducer";
import { addNotification } from "../redux/reducers/notificationReducer";
import { Loan } from "../types/loan";

export default function LoanPage() {
    const { id } = useParams();
    const loan = useAppSelector(state => state.loan) as unknown as Loan;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLoanById(parseInt(id as string)))
    }, [id])

    function returnLoan() {
        dispatch(updateLoan({id: loan.id, returned: true, dueDate: loan.dueDate, userId: loan.userInfo.id}))
    }
    function extendLoan() {
        let timeFromInitialLoan = new Date(loan.dueDate).valueOf() - new Date(loan.loanedAt).valueOf();
        if (timeFromInitialLoan > 5259600000) {
            dispatch(addNotification({message: "Can't extend anymore", timeInSec: 2, type: "normal"}))
            return;
        }
        let newDueDate = new Date(loan.dueDate).setMonth(new Date(loan.dueDate).getMonth() + 1).valueOf();
        dispatch(updateLoan({id: loan.id, returned: false, dueDate: new Date(newDueDate), userId: loan.userInfo.id}));
    }
    if (Array.isArray(loan)) {
        return <>Loading...</>
    }
    return (
        <div className="loan-page">
            <LoanCard loan={loan} size="large"/>
            {!loan.returned && 
            <>
            <Button onClick={returnLoan} label={"Return loan"} style={"standard"} />
            <Button onClick={extendLoan} label={"Extend loan by one month"} style={"standard"} />
            </>
            }
        </div>
    )
}