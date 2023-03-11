import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Main() {

    useEffect(() => {
    }, []);
    
    return (
        <div className="main">
            <NavBar />
            <Outlet />
        </div>
    );
}