import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import CategoryCard from "../components/cards/CategoryCard";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createCategory, getAllCategories } from "../redux/reducers/categoryReducer";
import { Category } from "../types/category";

export default function Categories() {
    const user = useAppSelector(state => state.user);
    const categories = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllCategories(null));
    }, []);

    if (!Array.isArray(categories)) {
        dispatch(getAllCategories(null));
        return <>Loading...</>
    }

    return (
        <div className="categories-page">
            <div className="categories-page__categories-wrapper">
                {categories.map(category => <CategoryCard category={category} size="large" />)}
            </div>
            {user?.roles.includes("Admin") && 
            <div className="categories-page__add-category-form">
                <h5>Add a new category</h5>
                <TitleAndDescriptionForm updateObject={null} dispatchCreate={createCategory as AsyncThunk<Category[] | undefined, unknown, {}> | null} dispatchUpdate={null}/>
            </div>}  
        </div>
    )
}