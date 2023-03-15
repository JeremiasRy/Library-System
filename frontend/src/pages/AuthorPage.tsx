import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthorCard from "../components/cards/AuthorCard";
import AuthorForm from "../components/forms/AuthorForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAuthorById, updateAuthor } from "../redux/reducers/authorReducer";
import { Author } from "../types/author";

export default function AuthorPage() {
    const user = useAppSelector(state => state.user);
    const { id } = useParams();
    const author = useAppSelector(state => state.author) as unknown as Author;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAuthorById(parseInt(id as string)))
    }, [id]);

    if (Array.isArray(author)) {
        return <>Loading.....</>
    }

    return (
        <div className="author-page">
            <div className="author-page__details">
                <AuthorCard author={author} size="large" />
            </div>
            {user?.roles.includes("Admin") &&
            <div className="author-page__edit-author">
                <h5>Edit author</h5>
                <AuthorForm updateObject={author} dispatchCreate={null} dispatchUpdate={updateAuthor as AsyncThunk<Author[] | undefined, unknown, {}> | null} />
            </div>
            }
        </div>
    )
}