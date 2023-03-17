import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getBookById } from "../../redux/reducers/bookReducer";
import { createCopy } from "../../redux/reducers/copyReducer";
import { getAllPublishers } from "../../redux/reducers/publisherReducer";
import { Book } from "../../types/book";
import Button from "../inputs/Button";
import SelectPublisher from "../inputs/SelectPublisher";
import PaginationForm from "./PaginationForm";

export default function AddCopyForm(props: {book:Book}) {
    const publishers = useAppSelector(state => state.publisher);
    const copies = useAppSelector(state => state.copy);
    const dispatch = useAppDispatch();
    const [publisher, setPublisher] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(getAllPublishers({page: page, pageSize: pageSize}));
    }, [page, pageSize])

    useEffect(() => {
        dispatch(getBookById(props.book.id))
    }, [copies]);


    if (!Array.isArray(publishers)) {
        return <>Loading...</>
    }

    function submitAction() {
        dispatch(createCopy({bookId: props.book.id, publisherId: parseInt(publisher)}));
    }

    return (
        <>
        <h5>Add a copy of book</h5>
        <PaginationForm elementCount={publishers.length} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize}/>
        <SelectPublisher options={publishers} state={publisher} setState={setPublisher} label={"Select publisher for copy"} />
        <Button onClick={submitAction} label={"Submit"} style={"standard"} />
        </>
    )
}