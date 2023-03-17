import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { getBookById } from "../../redux/reducers/bookReducer";
import { createCopy } from "../../redux/reducers/copyReducer";
import { getAllPublishers } from "../../redux/reducers/publisherReducer";
import { Book } from "../../types/book";
import Button from "../inputs/Button";
import SelectPublisher from "../inputs/SelectPublisher";

export default function AddCopyForm(props: {book:Book}) {
    const publishers = useAppSelector(state => state.publisher);
    const copies = useAppSelector(state => state.copy);
    const dispatch = useAppDispatch();
    const [publisher, setPublisher] = useState("");

    useEffect(() => {
        dispatch(getAllPublishers(null));
    }, [])

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
        <SelectPublisher options={publishers} state={publisher} setState={setPublisher} label={"Select publisher for copy"} />
        <Button onClick={submitAction} label={"Submit"} style={"standard"} />
        </>
    )
}