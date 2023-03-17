import { useNavigate } from "react-router-dom";
import NavElement from "./NavElement";

export default function NavBar() {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <h1 onClick={() => navigate("/")}>My library</h1>
            <div className="navbar__nav-elements">
                <NavElement name="Books" to="books"/>
                <NavElement name="Loans" to="loans" />
                <NavElement name="Profile" to ="profile" />
                <NavElement name="Categories" to="categories" />
                <NavElement name="Authors" to="authors" />
                <NavElement name="Publishers" to="publishers" />
            </div>
        </div>
    )
}