import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import CategoryCard from "../components/cards/CategoryCard";
import PaginationForm from "../components/forms/PaginationForm";
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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);

    useEffect(() => {
        dispatch(getAllCategories({page: page, pageSize: pageSize}));
    }, []);

    if (!Array.isArray(categories)) {
        return <>Loading...</>
    }

    return (
        <div className="categories-page">
            <h1>Categories</h1>
            <PaginationForm elementCount={categories.length} page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} style="normal" />
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