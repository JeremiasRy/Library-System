import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getAllAuthors } from "../../redux/reducers/authorReducer";
import { addAuthorToBook, getBookById } from "../../redux/reducers/bookReducer";
import { Book } from "../../types/book";
import Button from "../inputs/Button";
import SelectAuthor from "../inputs/SelectAuthor";
import PaginationForm from "./PaginationForm";

export default function addAuthorToBookForm() {
    const { id } = useParams();
    const book = useAppSelector(state => state.book) as unknown as Book;
    const authors = useAppSelector(state => state.author);
    const dispatch = useAppDispatch();
    const [author, setAuthor] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(getAllAuthors({page: page, pageSize: pageSize}));
        dispatch(getBookById(parseInt(id as string)))
    }, [id, page, pageSize])

    function submitAction() {
        dispatch(addAuthorToBook({id:parseInt(id as string), addId: parseInt(author)}))
    }

    if (!Array.isArray(authors) || Array.isArray(book)) {
        return <>Loading....</>
    }
    return (
        <>
        <h4>Add an author to book</h4>
        <PaginationForm 
        elementCount={authors.length}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        style="small"
        />
        <SelectAuthor 
        options={authors.filter(author => !book.authors?.map(author => author.id).includes(author.id))} 
        state={author} 
        setState={setAuthor} 
        label={"Choose author"} />
        <Button onClick={submitAction} label={"Add author"} style={"standard"} />
        </>
    )
}