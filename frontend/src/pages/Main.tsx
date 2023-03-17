import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Main() {

    return (
        <div className="main">
            <NavBar />
            <div className="main__outlet-holder">
                <Outlet />
            </div>
        </div>
    );
}