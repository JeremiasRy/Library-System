import { HasTitle } from "../types/base";
import { SelectInput } from "../types/inputProps";

export function Select<T extends HasTitle>(props:SelectInput<T>) {

    function options() {
        return props.options.map(option => <option key={option.id}>{option.title}</option>)
    }
    
    return (
        <label>
            {props.label}
            <select onChange={(e) => props.setState(e.currentTarget.value)}>
                <option>Choose One</option>
                {options()}
            </select>
        </label>
    )
}