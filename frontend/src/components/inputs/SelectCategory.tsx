import { HasTitleAndDescription } from "../../types/base";
import { SelectInput } from "../../types/inputProps";

export function SelectCategory<T extends HasTitleAndDescription>(props:SelectInput<T>) {
    function options() {
        return props.options.map(option => <option key={option.id} value={option.id}>{option.title}</option>)
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