import { NavProps } from "../types/nav";
import { useNavigate } from "react-router-dom";

export default function NavElement(props:NavProps) {
    const navigate = useNavigate();
    return (
        <div className="nav-element" onClick={() => navigate(props.to)}>
            <h4>{props.name}</h4>
        </div>
    )
}