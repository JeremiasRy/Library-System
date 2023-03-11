import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { checkAuth } from "../redux/reducers/userReducer";
import { LoginRegister } from "./LoginRegister";
import Notification from "../components/Notification";
import Footer from "../components/Footer";

export default function Root() {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (user !== null) {
            dispatch(checkAuth());
        }
    }, []);

    return (
        <>
        <Notification />
        {user === null ? <LoginRegister /> : <Outlet />}
        <Footer/>
        </>
        
    );
}