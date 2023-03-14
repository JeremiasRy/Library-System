import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAuthorById } from "../redux/reducers/authorReducer";
import { Author } from "../types/author";

export default function AuthorPage() {
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
            {author.firstname}, {author.lastname}
        </div>
    )
}