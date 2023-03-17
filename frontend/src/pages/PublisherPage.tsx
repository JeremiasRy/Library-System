import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookCard from "../components/cards/BookCard";
import PublisherForm from "../components/forms/PublisherForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { getBooksByPublisher } from "../redux/reducers/bookReducer";
import { deletePublisher, getAllPublishers, getPublisherById, updatePublisher } from "../redux/reducers/publisherReducer";
import { Publisher } from "../types/publisher";

export default function PublisherPage() {
    const { id } = useParams();
    const user = useAppSelector(state => state.user);
    const publisher = useAppSelector(state => state.publisher) as unknown as Publisher;
    const books = useAppSelector(state => state.book);
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPublisherById(parseInt(id as string)))
        dispatch(getBooksByPublisher(parseInt(id as string)))
    }, [id]);

    if (Array.isArray(publisher) || !Array.isArray(books)) {
        return <>Loading....</>
    }

    function removePublisher() {
        dispatch(deletePublisher(publisher));
        setTimeout(() => {
            navigate("/publishers");
        }, 500)
    }

    return (
        <div className="publisher-page">
            <div className="publisher-page__headers">
                <h1>{publisher.publisherName}</h1>
            </div>
            <div className="publisher-page__books">
                {books.map(book => <BookCard key={book.id} book={book} size="small"/>)}
            </div>
            {user?.roles.includes("Admin") && 
            <div className="publisher-page__admin-actions">
                <Button onClick={() => setEdit(!edit)} label={edit ? "Hide" : "Show edit form"} style="standard"/>
                {edit && <>
                <div className="edit-form">
                    <h4>Edit publisher</h4>
                    <PublisherForm updateObject={publisher} dispatchCreate={null} dispatchUpdate={updatePublisher as AsyncThunk<Publisher[] | undefined, unknown, {}>}/>
                </div>
                <div className="remove">
                    <Button onClick={removePublisher} label="Remove" style="danger" />
                </div>
                </>}
            </div>}
        </div>
    )
}