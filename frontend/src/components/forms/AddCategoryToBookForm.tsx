import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { addCategoryToBook, getBookById } from "../../redux/reducers/bookReducer";
import { getAllCategories } from "../../redux/reducers/categoryReducer";
import { Book } from "../../types/book";
import Button from "../inputs/Button";
import { SelectCategory } from "../inputs/SelectCategory";

export default function AddCategoryToBookForm() {
    const { id } = useParams();
    const book = useAppSelector(state => state.book) as unknown as Book;
    const categories = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();
    const [category, setCategory] = useState<string>("");

    useEffect(() => {
        dispatch(getAllCategories(null));
        dispatch(getBookById(parseInt(id as string)))
    }, [id]);

    if (!Array.isArray(categories) || Array.isArray(book)) {
        return <></>;  
    }

    function submitAction() {
        dispatch(addCategoryToBook({id: parseInt(id as string), addId: parseInt(category)}))
    }

    return (
        <>
        <h5>Add category to book</h5>
        <SelectCategory options={categories.filter(ctgry => !book.categories?.map(bookCtgry => bookCtgry.title).includes(ctgry.title))} state={category} setState={setCategory} label={"Choose category"} style={"standard"} />
        <Button onClick={submitAction} label={"Add category"} style={"standard"} />
        </>
    )

}