import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { addCategoryToBook, getBookById } from "../../redux/reducers/bookReducer";
import { getAllCategories } from "../../redux/reducers/categoryReducer";
import { Book } from "../../types/book";
import Button from "../inputs/Button";
import { SelectCategory } from "../inputs/SelectCategory";
import PaginationForm from "./PaginationForm";

export default function AddCategoryToBookForm() {
    const { id } = useParams();
    const book = useAppSelector(state => state.book) as unknown as Book;
    const categories = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState<string>("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(getAllCategories({page: page, pageSize: pageSize}));
        dispatch(getBookById(parseInt(id as string)))
    }, [id, page, pageSize]);

    if (!Array.isArray(categories) || Array.isArray(book)) {
        return <></>;  
    }

    function submitAction() {
        dispatch(addCategoryToBook({id: parseInt(id as string), addId: parseInt(category)}))
    }

    return (
        <>
        <h5>Add category to book</h5>
        <PaginationForm 
        elementCount={categories.filter(ctgry => !book.categories?.map(bookCtgry => bookCtgry.title).includes(ctgry.title)).length} 
        page={page} 
        setPage={setPage} 
        pageSize={pageSize} 
        setPageSize={setPageSize}
        />
        <SelectCategory 
        options={categories.filter(ctgry => !book.categories?.map(bookCtgry => bookCtgry.title).includes(ctgry.title))} 
        state={category} 
        setState={setCategory} 
        label={"Choose category"} 
        style={"standard"} 
        />
        <Button onClick={submitAction} label={"Add category"} style={"standard"} />
        </>
    )

}