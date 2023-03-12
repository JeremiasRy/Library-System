import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllBooks } from "../redux/reducers/bookReducer";
import { Pagination } from "../types/pagination";

export default function Books() {
    const [pagination, setPagegination] = useState<Pagination>({page: 1, pageSize: 50});
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
                <BookForm updateObject={null}/>
            </div>
        </div>
    )
}