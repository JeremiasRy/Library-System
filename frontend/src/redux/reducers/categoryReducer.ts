import { createSlice } from "@reduxjs/toolkit";
import { Category, CreateCategory, UpdateCategory } from "../../types/category";
import { create, get, getAll, remove, update } from "./baseActions";

const initialState:Category[] = [];

const categoryReducer = createSlice({
    name: "categoryReducer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCategories.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(getCategoryById.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(createCategory.fulfilled, (_, action) => {
            return action.payload;
        });
        builder.addCase(updateCategory.fulfilled, (_, action) => {
            return action.payload as Category[];
        })
    }
});

export default categoryReducer.reducer;

export const getAllCategories = getAll<Category>("Categories", "getAllCategories");
export const getCategoryById = get<Category>("Categories", "getCategoryById");
export const createCategory = create<CreateCategory, Category>("Categories", "createCategory");
export const updateCategory = update<UpdateCategory>("Categories", "updateCategory");
export const deleteCategory = remove<Category>("Categories", "deleteCategory");