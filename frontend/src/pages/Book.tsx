import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getBookById } from "../redux/reducers/bookReducer";
import { Book } from "../types/book";

export default function BookPage() {
    const { id } = useParams();
    const book = useAppSelector(state => state.book) as unknown as Book;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBookById(parseInt(id as string)));
    }, [id])

    if (Array.isArray(book)) {
        return <>Loading...</>
    }
    return (
        <>{book.title}</>
    )
}