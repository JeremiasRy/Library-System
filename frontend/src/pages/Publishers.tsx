import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import PublisherCard from "../components/cards/PublisherCard";
import PaginationForm from "../components/forms/PaginationForm";
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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    useEffect(() => {
        dispatch(getAllPublishers({page: page, pageSize: pageSize}));
    }, [])

    if (!Array.isArray(publishers)) {
        return <>Loading...</>;
    }

    return (
        <div className="publishers-page">
            <h1>Publishers</h1>
            <PaginationForm elementCount={publishers.length} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} style="normal" />
            <div className="publisher-page__publishers">
                {publishers.map(publisher => <PublisherCard key={publisher.id} publisher={publisher} size="large"/>)}
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