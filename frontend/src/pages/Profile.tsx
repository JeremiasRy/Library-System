import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditUserForm from "../components/forms/EditUserForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { logout } from "../redux/reducers/userReducer";
import { User } from "../types/user";

export default function Profile() {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    
    return (
        <div className="profile-page">
            <div className="progile-page__header">
                <h2>Hello {user?.firstname} {user?.lastname}</h2>
                <p>Your roles here are: <em>{user?.roles.map(role => `${role} `)}</em></p>
            </div>
            <div className="profile-page__actions">
                <div className="loans-link" onClick={() => navigate("/loans")}>
                    <h4>Your loans</h4>
                </div>
                <Button onClick={() => dispatch(logout())} label="Log out" style="danger"/>
                <Button onClick={() => setEdit(!edit)} label={edit ? "Hide" : "Edit information"} style={"standard"} />
            </div>
            {edit &&
            <div className="profile-page__edit-form">
                <EditUserForm user={user as User} />
            </div>
            }
        </div>
    )
}