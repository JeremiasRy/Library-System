import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getAllAuthors } from "../../redux/reducers/authorReducer";
import { addAuthorToBook, getBookById } from "../../redux/reducers/bookReducer";
import { Book } from "../../types/book";
import Button from "../inputs/Button";
import SelectAuthor from "../inputs/SelectAuthor";

export default function addAuthorToBookForm() {
    const { id } = useParams();
    const book = useAppSelector(state => state.book) as unknown as Book;
    const authors = useAppSelector(state => state.author);
    const dispatch = useAppDispatch();
    const [author, setAuthor] = useState("");

    useEffect(() => {
        dispatch(getAllAuthors(null));
        dispatch(getBookById(parseInt(id as string)))
    }, [id])

    function submitAction() {
        dispatch(addAuthorToBook({id:parseInt(id as string), addId: parseInt(author)}))
    }

    if (!Array.isArray(authors) || Array.isArray(book)) {
        return <>Loading....</>
    }
    return (
        <>
        <h5>Add an author to book</h5>
        <SelectAuthor options={authors.filter(author => !book.authors?.map(author => author.id).includes(author.id))} state={author} setState={setAuthor} label={"Choose author"} />
        <Button onClick={submitAction} label={"Add author"} style={"standard"} />
        </>
    )
}