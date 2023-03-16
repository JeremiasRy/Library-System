import { AsyncThunk } from "@reduxjs/toolkit";
import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHook";
import { Publisher } from "../../types/publisher";
import Button from "../inputs/Button";
import InputText from "../inputs/InputText";

export default function PublisherForm(props: {updateObject:Publisher | null, dispatchCreate: AsyncThunk<Publisher[] | undefined, unknown, {}> | null, dispatchUpdate: AsyncThunk<Publisher[] | undefined, unknown, {}> | null}) {
    const dispatch = useAppDispatch();
    const [publisherName, setPublisherName] = useState("");

    useEffect(() => {
        if (props.updateObject !== null) {
            setPublisherName(props.updateObject.publisherName);
        }
    }, [props])

    function submitAction() {
        if (props.updateObject === null && props.dispatchCreate !== null) {
            dispatch(props.dispatchCreate({publisherName: publisherName}));
        } else if (props.dispatchUpdate !== null && props.dispatchCreate === null) {
           dispatch(props.dispatchUpdate({id: props.updateObject?.id, publisherName: publisherName}));
        }
        setTimeout(() => {
            setPublisherName("");
        }, 500);
    }

    return (
        <>
        <InputText type={"text"} state={publisherName} setState={setPublisherName} label={"Publisher name"} style={"standard"} />
        <Button onClick={submitAction} label={"Submit"} style={"standard"} />
        </>
    )
}