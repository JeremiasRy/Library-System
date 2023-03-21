import { Publisher } from "../../types/publisher";

export default function SelectPublisher(props: {options:Publisher[], state:string, setState:React.Dispatch<React.SetStateAction<string>>, label:string}) {
    function options() {
        return props.options.map(option => <option key={option.id} value={option.id}>{option.publisherName}</option>)
    }

    return (
        <label>
            {props.label}
            <select onChange={(e) => props.setState(e.currentTarget.value)}>
                <option>---Choose one---</option>
                {options()}
            </select>
        </label>
    )
}