import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BookCard from "../components/cards/BookCard";
import PublisherForm from "../components/forms/PublisherForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook"
import { getBooksByPublisher } from "../redux/reducers/bookReducer";
import { getAllPublishers, getPublisherById, updatePublisher } from "../redux/reducers/publisherReducer";
import { Publisher } from "../types/publisher";

export default function PublisherPage() {
    const { id } = useParams();
    const user = useAppSelector(state => state.user);
    const publisher = useAppSelector(state => state.publisher) as unknown as Publisher;
    const books = useAppSelector(state => state.book);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPublisherById(parseInt(id as string)))
        dispatch(getBooksByPublisher(parseInt(id as string)))
    }, [id]);

    if (Array.isArray(publisher) || !Array.isArray(books)) {
        dispatch(getPublisherById(parseInt(id as string)));
        dispatch(getBooksByPublisher(parseInt(id as string)));
        return <>Loading....</>
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
                <div className="publisher-page__edit-form">
                    <h4>Edit publisher</h4>
                    <PublisherForm updateObject={publisher} dispatchCreate={null} dispatchUpdate={updatePublisher as AsyncThunk<Publisher[] | undefined, unknown, {}>}/>
                </div>
            }
        </div>
    )
}