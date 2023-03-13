import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import BookCard from "../components/cards/BookCard";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createBook, getAllBooks } from "../redux/reducers/bookReducer";
import { Book } from "../types/book";
import { Pagination } from "../types/pagination";

export default function Books() {
    const [pagination, setPagination] = useState<Pagination>({page: 1, pageSize: 50});
    const user = useAppSelector(state => state.user);
    const books = useAppSelector(state => state.book);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllBooks(pagination))
    }, [books])

    if (!Array.isArray(books)) {
        return <>Loading...</>;
    }

    return (
        <div className="books-page">
            <div className="books-page__books-wrapper">
                {books.map(book => <BookCard key={book.id} book={book} />)}
            </div>
            <div className="books-page__add-book">
                <TitleAndDescriptionForm updateObject={null} dispatchCreate={createBook as AsyncThunk<Book[] | undefined, unknown, {}> | null} dispatchUpdate={null}/>
            </div>
        </div>
    )
}