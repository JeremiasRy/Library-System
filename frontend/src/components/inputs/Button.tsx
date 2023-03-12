import { Clickable } from "../../types/inputProps";

export default function Button(props:Clickable) {
    return (
        <button name={props.label} className={`btn ${props.style}`} onClick={() => props.onClick()}>{props.label}</button>
    )
}