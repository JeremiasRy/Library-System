import { useEffect } from "react";
import BookCard from "../components/BookCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllBooks } from "../redux/reducers/bookReducer";

export default function Books() {
    const books = useAppSelector(state => state.book);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllBooks(null))
    }, [])

    if (!Array.isArray(books)) {
        return <>Loading...</>;
    }

    return (
        <div className="books-wrapper">
            {books.map(book => <BookCard key={book.id} book={book} />)}
        </div>
    )
}