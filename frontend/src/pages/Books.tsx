import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import BookCard from "../components/cards/BookCard";
import PaginationForm from "../components/forms/PaginationForm";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createBook, getAllBooks, getBooksByTitle } from "../redux/reducers/bookReducer";
import { Book } from "../types/book";
import { Pagination } from "../types/pagination";

export default function Books() {
    const user = useAppSelector(state => state.user);
    const books = useAppSelector(state => state.book);
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    useEffect(() => {
        if (title !== "") {
            const debounce = setTimeout(() => {
                dispatch(getBooksByTitle(title))
            }, 500);
            return () => clearTimeout(debounce);
        }
        dispatch(getAllBooks({page: page, pageSize: pageSize}))
    }, [page, pageSize, title])

    if (!Array.isArray(books)) {
        return <>Loading...</>;
    }

    return (
        <div className="books-page">
            <h1>Books</h1>
            <div className="books-page__inner-wrap">
                <PaginationForm elementCount={books.length} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} style="normal"/>
                <input className="book-search" placeholder="Search by title" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <div className="books-page__books-wrapper">
                    {books.map(book => <BookCard key={book.id} book={book} size="small"/>)}
                </div>
                {user?.roles.includes("Admin") &&
                <div className="books-page__admin-actions">
                <Button onClick={() => setEdit(!edit)} label={edit ? "Hide" : "Add a book"} style="standard"/>
                    {edit && <>
                        <div className="books-page__add-book">
                            <TitleAndDescriptionForm updateObject={null} dispatchCreate={createBook as AsyncThunk<Book[] | undefined, unknown, {}> | null} dispatchUpdate={null}/>
                        </div>
                    </>}
                </div>}
            </div>
        </div>
    )
}