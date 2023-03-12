import { useEffect } from "react";
import LoanCard from "../components/cards/LoanCard";
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
            <div className="progile-page__header">
                <h2>Hello {user?.firstname} {user?.lastname}</h2>
            </div>
            <div className="profile-page__actions">
                <div>
                    
                </div>
            </div>
            <div className="profile-page__loans-wrapper">
                <h4>Your loans</h4>
                {loans.length === 0 ? <p>No loans to show</p> : loans.map(loan => <LoanCard key={loan.id} loan={loan} />)}
            </div>
        </div>
    )
}