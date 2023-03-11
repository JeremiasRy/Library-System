import { useEffect } from "react";
import LoanCard from "../components/LoanCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getLoansByUser } from "../redux/reducers/loanReducer";

export default function Profile() {
    const user = useAppSelector(state => state.user);
    const loans = useAppSelector(state => state.loan);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getLoansByUser(user?.id as number));
    }, [user]) 

    return (
        <div className="profile-page">
            <h2>Hello {user?.firstname} {user?.lastname}</h2>
            <h4>Your loans</h4>
            <div className="profile-page__loans-wrapper">
                {loans.length === 0 ? <p>No loans to show</p> : loans.map(loan => <LoanCard key={loan.id} loan={loan} />)}
            </div>
        </div>
    )
}