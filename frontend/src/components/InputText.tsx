import { StateInput } from "../types/inputProps"

export default function InputText(props:StateInput) {
    return (
        <label>
            {props.label}
            <input className={`input ${props.style}`} value={props.state} onChange={(e) => props.setState(e.currentTarget.value)} />
        </label>
        
    )
}