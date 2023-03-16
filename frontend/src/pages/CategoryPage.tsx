import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import BookCard from "../components/cards/BookCard";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getBooksByCategory } from "../redux/reducers/bookReducer";
import { getCategoryById, updateCategory } from "../redux/reducers/categoryReducer";
import { Category } from "../types/category";

export default function CategoryPage() {
    const { id } = useParams();
    const books = useAppSelector(state => state.book);
    const category = useAppSelector(state => state.category) as unknown as Category;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBooksByCategory(parseInt(id as string)));
        dispatch(getCategoryById(parseInt(id as string)))
    }, [id]);

    if (Array.isArray(category) || !Array.isArray(books)) {
        return <>Loading...</>
    }

    return (
        <div className="category-page">
            <div className="category-page__headers">
                <h1>{category.title}</h1>
                <h4>Books in this category: {books.length}</h4>
            </div>
            <div className="category-page__books-wrapper">
                {books.map(book => <BookCard book={book} size="small" />)}
            </div>
            <div className="category-page__edit-category-form">
                <TitleAndDescriptionForm updateObject={category} dispatchCreate={null} dispatchUpdate={updateCategory as AsyncThunk<Category[] | undefined, unknown, {}> | null}/>
            </div>
        </div>
    )
}