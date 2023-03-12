import { HasTitleAndDescription } from "./base"

export type BaseComponent = {
    label:string,
    style:string
}

export interface StateInput extends BaseComponent {
    state:string,
    setState:React.Dispatch<React.SetStateAction<string>>,
}
export interface TextInput extends StateInput {
    type: "text" | "password" | "email"
}

export interface Clickable extends BaseComponent {
    onClick:VoidFunction
}

export interface SelectInput<T extends HasTitleAndDescription> extends StateInput {
    options:T[]
}