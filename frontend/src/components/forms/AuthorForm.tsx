import { AsyncThunk } from "@reduxjs/toolkit";
import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHook";
import { Author, CreateAuthor } from "../../types/author";
import Button from "../inputs/Button";
import InputText from "../inputs/InputText";

export default function AuthorForm(props: {updateObject:Author | null, dispatchCreate: AsyncThunk<Author[] | undefined, CreateAuthor, {}> | null, dispatchUpdate: AsyncThunk<Author[] | undefined, unknown, {}> | null}) {
    const dispatch = useAppDispatch();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    useEffect(() => {
        if (props.updateObject !== null) {
            setFirstname(props.updateObject.firstname);
            setLastname(props.updateObject.lastname);
        }
    }, [props]);

    function clearFields() {
        setFirstname("");
        setLastname("");
    }

    function submitAction() {
        if (props.updateObject === null && props.dispatchCreate !== null) {
            let newAuthor:CreateAuthor = {
                firstname: firstname,
                lastname: lastname,
            };
            dispatch(props.dispatchCreate(newAuthor));
        } else if (props.dispatchUpdate !== null && props.dispatchCreate === null) {
            let upAuthor = {
                id: props.updateObject?.id,
                firstname: firstname,
                lastname: lastname
            };
            dispatch(props.dispatchUpdate(upAuthor));
        }
        setTimeout(() => {
            clearFields()
        }, 500);
    }
    return (
        <div className="author-form">
            <InputText type={"text"} state={firstname} setState={setFirstname} label={"Firstname"} style={"standard"} />
            <InputText type={"text"} state={lastname} setState={setLastname} label={"Lastname"} style={"standard"} />
            <Button onClick={submitAction} label={"Submit"} style={"standard"} />
        </div>
    )
}