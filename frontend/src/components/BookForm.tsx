import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import { createBook, updateBook } from "../redux/reducers/bookReducer";
import { Book } from "../types/book";
import Button from "./Button";
import InputText from "./InputText";

export default function BookForm(props: {updateObject:Book | null}) {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    useEffect(() => {
        if (props.updateObject !== null) {
            setTitle(props.updateObject.title);
            setDescription(props.updateObject.description as string);
        }
    }, [])

    function clearFields() {
        setTitle("");
        setDescription("");
    }

    function submitAction() {
        if (props.updateObject === null) {
            dispatch(createBook({title: title, description: description === "" ? null : description}));
        } else {
            let upBook:Book = {
                id: props.updateObject.id,
                title: title,
                description: description === "" ? null : description,
                categories: null,
                authors: null,
                publishers: null,
                copies: null,
                copiesAvailable: null
            }
            dispatch(updateBook(upBook));
        }
        setTimeout(() => {
            clearFields()
        }, 500);
    }

    return (
        <div className="title-form">
            <div className="title-form__text-fields">
                <InputText type="text" state={title} setState={setTitle} label="Enter Title" style="standard"/>
                <InputText type="text" state={description} setState={setDescription} label="Enter Description" style="standard"/>
            </div>
            <Button label="Submit" onClick={submitAction} style="standard"/>
        </div>
    )
}