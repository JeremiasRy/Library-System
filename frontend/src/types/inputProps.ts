import { Base, HasTitle } from "./base"

export type BaseComponent = {
    label:string,
    style:string
}

export type HasKey = {
    key:number
}

export interface StateInput extends BaseComponent {
    state:string,
    setState:React.Dispatch<React.SetStateAction<string>>,
}

export interface Clickable extends BaseComponent {
    onClick:VoidFunction
}

export interface SelectInput<T extends HasTitle> extends StateInput {
    options:T[]
}