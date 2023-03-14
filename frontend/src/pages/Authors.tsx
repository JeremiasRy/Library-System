import { useEffect } from "react";
import AuthorCard from "../components/cards/AuthorCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllAuthors } from "../redux/reducers/authorReducer";

export default function Authors() {
    const authors = useAppSelector(state => state.author);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllAuthors(null))
    }, []);

    if (!Array.isArray(authors)) {
        return <>Loading...</>
    }

    return (
        <div className="author-page">
            <div className="author-page__authors">
                {authors.map(author => <AuthorCard key={author.id} author={author}/>)}
            </div>
        </div>
    )
}