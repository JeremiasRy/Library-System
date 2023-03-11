import { TextInput } from "../types/inputProps"

export default function InputText(props:TextInput) {
    return (
        <label>
            {props.label}
            <input type={props.type} className={`input ${props.style}`} value={props.state} onChange={(e) => props.setState(e.currentTarget.value)} />
        </label>
        
    )
}