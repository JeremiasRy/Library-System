import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import CategoryCard from "../components/cards/CategoryCard";
import AddCategoryToBookForm from "../components/forms/AddCategoryToBookForm";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getBookById, removeCategoryFromBook, updateBook } from "../redux/reducers/bookReducer";
import { Book } from "../types/book";

export default function BookPage() {
    const { id } = useParams();
    const user = useAppSelector(state => state.user);
    const book = useAppSelector(state => state.book) as unknown as Book;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBookById(parseInt(id as string)));
    }, [id])

    if (Array.isArray(book)) {
        return <>Loading...</>
    }
    function removeCategory(category:number) {
        dispatch(removeCategoryFromBook({id:parseInt(id as string), addId: category}))
    }

    return (
        <div className="book-page">
            <div className="book-page__headers">
                <h4>{book.title}</h4>
                <p>By: {book.authors?.map(author => `${author.firstname} ${author.lastname}`)}</p>
            </div>
            <div className="book-page__categories">
                {book.categories?.map(category => 
                    <div className="book-page__categories__category">
                        <CategoryCard category={category} size="small" /> 
                        {user?.roles.includes("Admin") && <Button onClick={() => removeCategory(category.id)} label={"Remove "} style={"danger"} />}
                    </div>)}
            </div>
            {user?.roles.includes("Admin") && 
            <>
            <div className="book-page__edit-form">
                <h5>Edit book</h5>
                <TitleAndDescriptionForm updateObject={book} dispatchCreate={null} dispatchUpdate={updateBook as AsyncThunk<Book[] | undefined, unknown, {}> | null}/>
                </div>
            <div>
                <AddCategoryToBookForm />
            </div>
            </>}
        </div>
        
    )
}