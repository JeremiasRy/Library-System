import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import PublisherCard from "../components/cards/PublisherCard";
import PublisherForm from "../components/forms/PublisherForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createPublisher, getAllPublishers } from "../redux/reducers/publisherReducer";
import { Publisher } from "../types/publisher";

export default function Publishers() {
    const user = useAppSelector(state => state.user);
    const publishers = useAppSelector(state => state.publisher);
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch(getAllPublishers(null));
    }, [])

    if (!Array.isArray(publishers)) {
        dispatch(getAllPublishers(null));
        return <>Loading...</>;
    }

    return (
        <div className="publishers-page">
            <div className="publisher-page__publishers">
                {publishers.map(publisher => <PublisherCard key={publisher.id} publisher={publisher} />)}
            </div>
            {user?.roles.includes("Admin") && 
            <div className="publisher-page__admin-actions">
                <Button onClick={() => setEdit(!edit)} label={edit ? "Hide" : "Add a publisher"} style="standard"/>
                {edit && <>
                <div className="publisher-page__add-form">
                    <h4>Add a publisher</h4>
                    <PublisherForm updateObject={null} dispatchCreate={createPublisher as AsyncThunk<Publisher[] | undefined, unknown, {}>} dispatchUpdate={null}/>
                </div>
                </>}
            </div>}
        </div>
    )
}