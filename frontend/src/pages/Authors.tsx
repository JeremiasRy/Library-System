import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import AuthorCard from "../components/cards/AuthorCard";
import AuthorForm from "../components/forms/AuthorForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createAuthor, getAllAuthors } from "../redux/reducers/authorReducer";
import { Author } from "../types/author";

export default function Authors() {
    const user = useAppSelector(state => state.user);
    const authors = useAppSelector(state => state.author);
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch(getAllAuthors(null))
    }, []);

    if (!Array.isArray(authors)) {
        return <>Loading...</>
    }

    return (
        <div className="author-page">
            <div className="author-page__authors">
                {authors.map(author => <AuthorCard key={author.id} author={author} size="small"/>)}
            </div>
            {user?.roles.includes("Admin") && 
            <div className="author-page__admin-actions">
            <Button onClick={() => setEdit(!edit)} label={edit ? "Hide" : "Add author"} style="standard"/>
                {edit && <>
                    <div className="author-page__add-author">
                        <AuthorForm updateObject={null} dispatchCreate={createAuthor as AsyncThunk<Author[] | undefined, unknown, {}> | null} dispatchUpdate={null} />
                    </div>
                </>}
            </div>}
        </div>
    )
}