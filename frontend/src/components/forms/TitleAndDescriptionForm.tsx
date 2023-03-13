import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHook";
import { HasTitleAndDescription } from "../../types/base";
import Button from "../inputs/Button";
import InputText from "../inputs/InputText";

export default function TitleAndDescriptionForm<T extends HasTitleAndDescription>(props: {updateObject: T | null, dispatchCreate: AsyncThunk<T[] | undefined, unknown, {}> | null, dispatchUpdate:  AsyncThunk<T[] | undefined, unknown, {}> | null}) {
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
        if (props.updateObject === null && props.dispatchCreate !== null)  {
            dispatch(props.dispatchCreate({
                title: title, 
                description: description === "" ? null : description
            }));
        } else if (props.dispatchUpdate !== null) {
            let updateItem = {
                id: props.updateObject?.id,
                title: title,
                description: description === "" ? null : description,
            }
            dispatch(props.dispatchUpdate(updateItem));
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