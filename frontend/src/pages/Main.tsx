import { Outlet } from "react-router-dom";

export default function Main() {

    return (
        <div className="main__outlet-holder">
            <Outlet />
        </div>
    );
}