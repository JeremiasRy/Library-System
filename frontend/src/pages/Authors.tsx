import { useEffect } from "react";
import AuthorCard from "../components/cards/AuthorCard";
import AuthorForm from "../components/forms/AuthorForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createAuthor, getAllAuthors } from "../redux/reducers/authorReducer";

export default function Authors() {
    const user = useAppSelector(state => state.user);
    const authors = useAppSelector(state => state.author);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllAuthors(null))
    }, []);

    if (!Array.isArray(authors)) {
        dispatch(getAllAuthors(null))
        return <>Loading...</>
    }

    return (
        <div className="author-page">
            <div className="author-page__authors">
                {authors.map(author => <AuthorCard key={author.id} author={author} size="small"/>)}
            </div>
            {user?.roles.includes("Admin") && 
            <div className="author-page__add-author">
                <AuthorForm updateObject={null} dispatchCreate={createAuthor} dispatchUpdate={null} />
            </div>
            }
        </div>
    )
}