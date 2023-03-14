import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

export default function Profile() {
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();
    
    return (
        <div className="profile-page">
            <div className="progile-page__header">
                <h2>Hello {user?.firstname} {user?.lastname}</h2>
            </div>
            <div className="profile-page__actions">
                <div>
                    <h4 onClick={() => navigate("/loans")}>Your loans</h4>
                </div>
            </div>
        </div>
    )
}