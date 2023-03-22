import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import BookCard from "../components/cards/BookCard";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getBooksByCategory } from "../redux/reducers/bookReducer";
import { deleteCategory, getCategoryById, updateCategory } from "../redux/reducers/categoryReducer";
import { Category } from "../types/category";

export default function CategoryPage() {
    const navigate = useNavigate()
    const { id } = useParams();
    const user = useAppSelector(state => state.user);
    const books = useAppSelector(state => state.book);
    const category = useAppSelector(state => state.category) as unknown as Category;
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch(getBooksByCategory(parseInt(id as string)));
        dispatch(getCategoryById(parseInt(id as string)))
    }, [id]);

    if (Array.isArray(category) || !Array.isArray(books)) {
        return <>Loading...</>
    }

    function removeCategory() {
        dispatch(deleteCategory(category))
        setTimeout(() => {
            navigate("/categories");
        }, 500)
    }

    return (
        <div className="category-page">
            <div className="category-page__headers">
                <h1>{category.title}</h1>
                <p>{category.description}</p>
                <h4>Books in this category: {books.length}</h4>
            </div>
            <div className="category-page__books-wrapper">
                {books.map(book => <BookCard key={book.id} book={book} size="small" />)}
            </div>
            {user?.roles.includes("Admin") &&
            <div className="category-page__admin-actions">
                <Button onClick={() => setEdit(!edit)} label={edit ? "Hide" : "Show edit form"} style="standard"/>
                {edit && <>
                <div className="category-page__edit-category-form">
                    <TitleAndDescriptionForm updateObject={category} dispatchCreate={null} dispatchUpdate={updateCategory as AsyncThunk<Category[] | undefined, unknown, {}> | null}/>
                    <Button onClick={removeCategory} label="Remove" style="danger"/>
                </div>
                </>}
            </div>}
        </div>
    )
}