import { Author } from "../../types/author";

export default function SelectAuthor(props:{options:Author[], state:string, setState:React.Dispatch<React.SetStateAction<string>>, label:string}) {

    function options() {
        return props.options.map(option => <option key={option.id} value={option.id}>{option.firstname} {option.lastname}</option>)
    }
    
    return (
        <label>
            {props.label}
            <select onChange={(e) => props.setState(e.currentTarget.value)}>
                <option>----Choose one----</option>
                {options()}
            </select>
        </label>
    )
}