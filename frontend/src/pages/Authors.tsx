import { AsyncThunk } from "@reduxjs/toolkit";
import { SetStateAction, useEffect, useState } from "react";
import AuthorCard from "../components/cards/AuthorCard";
import AuthorForm from "../components/forms/AuthorForm";
import PaginationForm from "../components/forms/PaginationForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createAuthor, getAllAuthors } from "../redux/reducers/authorReducer";
import { Author } from "../types/author";

export default function Authors() {
    const user = useAppSelector(state => state.user);
    const authors = useAppSelector(state => state.author);
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    useEffect(() => {
        dispatch(getAllAuthors({page: page, pageSize: pageSize}))
    }, [page, pageSize]);

    if (!Array.isArray(authors)) {
        return <>Loading...</>
    }

    return (
        <div className="author-page">
            <h1>Authors</h1>
            <PaginationForm elementCount={authors.length} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} />
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