import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createBook, getBookById, updateBook } from "../redux/reducers/bookReducer";
import { Book } from "../types/book";

export default function BookPage() {
    const { id } = useParams();
    const book = useAppSelector(state => state.book) as unknown as Book;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBookById(parseInt(id as string)));
    }, [id])

    if (Array.isArray(book)) {
        return <>Loading...</>
    }

    return (
        <div className="book-page">
            <div className="book-page__headers">
                <h4>{book.title}</h4>
            </div>
            <div className="book-page__edit-form">
                <h5>Edit book</h5>
                <TitleAndDescriptionForm updateObject={book} dispatchCreate={null} dispatchUpdate={updateBook as AsyncThunk<Book[] | undefined, unknown, {}> | null}/>
            </div>
        </div>
        
    )
}