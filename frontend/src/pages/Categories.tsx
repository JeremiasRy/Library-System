import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import CategoryCard from "../components/cards/CategoryCard";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createCategory, getAllCategories } from "../redux/reducers/categoryReducer";
import { Category } from "../types/category";

export default function Categories() {
    const categories = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllCategories(null));
    }, [categories]);

    if (!Array.isArray(categories)) {
        return <>Loading...</>
    }

    return (
        <div className="categories-page">
            <div className="categories-page__categories-wrapper">
                {categories.map(category => <CategoryCard category={category} />)}
            </div>
            <div className="categories-page__add-category-form">
                <TitleAndDescriptionForm updateObject={null} dispatchCreate={createCategory as AsyncThunk<Category[] | undefined, unknown, {}> | null} dispatchUpdate={null}/>
            </div>
        </div>
    )
}