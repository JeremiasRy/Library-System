import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import AuthorCard from "../components/cards/AuthorCard";
import CategoryCard from "../components/cards/CategoryCard";
import AddAuthorToBookForm from "../components/forms/AddAuthorToBookForm";
import AddCategoryToBookForm from "../components/forms/AddCategoryToBookForm";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import Button from "../components/inputs/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getBookById, removeAuthorFromBook, removeCategoryFromBook, updateBook } from "../redux/reducers/bookReducer";
import { Book } from "../types/book";

export default function BookPage() {
    const { id } = useParams();
    const user = useAppSelector(state => state.user);
    const book = useAppSelector(state => state.book) as unknown as Book;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getBookById(parseInt(id as string)));
    }, [id])

    console.log(book);

    if (Array.isArray(book)) {
        return <>Loading...</>
    }
    
    function removeCategory(category:number) {
        dispatch(removeCategoryFromBook({id:parseInt(id as string), addId: category}))
    }
    function removeAuthor(author:number) {
        dispatch(removeAuthorFromBook({id:parseInt(id as string), addId: author}))
    }

    return (
        <div className="book-page">
            <div className="book-page__headers">
                <h4>{book.title}</h4>
                <div className="book-page__headers__authors">
                    {book.authors?.map(author =>
                    <div key={author.id}>
                    <AuthorCard author={author} size="small" />
                    {user?.roles.includes("Admin") && <Button onClick={() => removeAuthor(author.id)} label="Remove" style="danger" />}
                    </div> )}
                </div>
            </div>
            <div className="book-page__description">
                <p>{book.description}</p>
            </div>
            <div className="book-page__categories">
                {book.categories?.map(category => 
                    <div key={category.id} className="book-page__categories__category">
                        <CategoryCard category={category} size="small" /> 
                        {user?.roles.includes("Admin") && <Button onClick={() => removeCategory(category.id)} label="Remove" style="danger" />}
                    </div>)}
            </div>
            {user?.roles.includes("Admin") && 
            <>
                <div className="book-page__edit-form">
                    <h5>Edit book</h5>
                    <TitleAndDescriptionForm updateObject={book} dispatchCreate={null} dispatchUpdate={updateBook as AsyncThunk<Book[] | undefined, unknown, {}> | null}/>
                </div>
                <div className="book-page__add-category-form">
                    <AddCategoryToBookForm />
                </div>
                <div className="book-page__add-author-form">
                    <AddAuthorToBookForm />
                </div>
            </>}
        </div>
        
    )
}