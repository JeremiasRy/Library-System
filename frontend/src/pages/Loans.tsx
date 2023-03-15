import { useEffect, useState } from "react";
import LoanCard from "../components/cards/LoanCard";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllLoans, getLoansByUser } from "../redux/reducers/loanReducer";
import { LoanFilter } from "../types/loan";
import { Pagination } from "../types/pagination";

export default function Loans() {
    const user = useAppSelector(state => state.user);
    const loans = useAppSelector(state => state.loan);
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState<"Expired" | "OnGoing" | null>(null);
    const [adminAllUsers, setAdminAllUsers] = useState(false);
    const [pagination, setPagination] = useState<Pagination>({page: 1, pageSize: 50});
    const [showReturned, setShowReturned] = useState(false);

    useEffect(() => {
        if (!adminAllUsers) {
            let loanFilter:LoanFilter = {
                pagination: pagination,
                userId: user?.id as number,
                filter: filter,
            }
            dispatch(getLoansByUser(loanFilter))
            return;
        }
        let loanFilter:LoanFilter = {
            pagination: pagination,
            userId: null,
            filter: filter,
        }
        dispatch(getAllLoans(loanFilter));
    }, [filter, adminAllUsers, pagination]);

    function handleAdminAllUsersClick() {
        setAdminAllUsers(!adminAllUsers)
        clearFilters();
    };

    function clearFilters() {
        setFilter(null);
    }
    if (!Array.isArray(loans)) {
        return <>Loading...</>
    }

    return (
        <div className="loan-page">
            <div className="loan-page__filter-options">
                {user?.roles.includes("Admin") && <Button onClick={handleAdminAllUsersClick} label={adminAllUsers ? "Show only me" : "Show all loans on database"} style={"standard"} /> }
                <Button onClick={() => setFilter("Expired")} label={"Expired Loans"} style={"standard"} />
                <Button onClick={() => setFilter("OnGoing")} label={"On Going Loans"} style={"standard"} />
                <Button onClick={() => setFilter(null)} label={"All"} style={"standard"} />
                <Button onClick={() => setShowReturned(!showReturned)} label={showReturned ? "Show on going" : "Show returned" } style="standard" />
            </div>
            <div className="loan-page__loans-wrapper">
                {
                    showReturned 
                    ? loans.filter(loan => loan.returned).map(loan => <LoanCard key={loan.id} loan={loan} size="small" />)
                    : loans.filter(loan => !loan.returned).map(loan => <LoanCard key={loan.id} loan={loan} size="small" />)
                }
            </div>
        </div>
    )
};