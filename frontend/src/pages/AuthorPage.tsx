import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthorCard from "../components/cards/AuthorCard";
import BookCard from "../components/cards/BookCard";
import AuthorForm from "../components/forms/AuthorForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { deleteAuthor, getAuthorById, updateAuthor } from "../redux/reducers/authorReducer";
import { getBooksByAuthor } from "../redux/reducers/bookReducer";
import { Author } from "../types/author";

export default function AuthorPage() {
    const { id } = useParams();
    const user = useAppSelector(state => state.user);
    const author = useAppSelector(state => state.author) as unknown as Author;
    const books = useAppSelector(state => state.book);
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAuthorById(parseInt(id as string)))
        dispatch(getBooksByAuthor(parseInt(id as string)))
    }, [id]);

    if (Array.isArray(author) || !Array.isArray(books)) {
        return <>Loading.....</>
    }

    function removeAuthor() {
        dispatch(deleteAuthor(author));
        setTimeout(() => {
            navigate("/authors")
        }, 500);
    }

    return (
        <div className="author-page">
            <div className="category-page__headers">
                <h1>{author.firstname} {author.lastname}</h1>
            </div>
            <h4>Books by {author.firstname}</h4>
            <div className="category-page__books-wrapper">
                {books.map(book => <BookCard key={book.id} book={book} size="small" />)}
            </div>
            {user?.roles.includes("Admin") &&
            <div className="author-page__admin-actions">
                <Button onClick={() => setEdit(!edit)} label={edit ? "Hide" : "Show edit form"} style="standard"/>
                {edit && <>
                <div className="author-page__edit-author">
                    <h5>Edit author</h5>
                    <AuthorForm updateObject={author} dispatchCreate={null} dispatchUpdate={updateAuthor as AsyncThunk<Author[] | undefined, unknown, {}> | null} />
                </div>
                <div className="remove-author">
                    <Button onClick={removeAuthor} label="Remove" style="danger"/>
                </div>
                </>}
            </div>}
        </div>
    )
}