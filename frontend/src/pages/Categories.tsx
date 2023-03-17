import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import CategoryCard from "../components/cards/CategoryCard";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createCategory, getAllCategories } from "../redux/reducers/categoryReducer";
import { Category } from "../types/category";

export default function Categories() {
    const user = useAppSelector(state => state.user);
    const categories = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        dispatch(getAllCategories(null));
    }, []);

    if (!Array.isArray(categories)) {
        return <>Loading...</>
    }

    return (
        <div className="categories-page">
            <div className="categories-page__categories-wrapper">
                {categories.map(category => <CategoryCard key={category.id} category={category} size="large" />)}
            </div>
            {user?.roles.includes("Admin") && 
            <div className="categories-page__admin-actions">
            <Button onClick={() => setEdit(!edit)} label={edit ? "Hide" : "Add a category"} style="standard"/>
                {edit && <>
                    <div className="categories-page__add-category-form">
                        <h5>Add a new category</h5>
                        <TitleAndDescriptionForm updateObject={null} dispatchCreate={createCategory as AsyncThunk<Category[] | undefined, unknown, {}> | null} dispatchUpdate={null}/>
                    </div>
                </>}
            </div>}
        </div>
    )
}