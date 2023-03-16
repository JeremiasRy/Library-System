import { AsyncThunk } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import AuthorCard from "../components/cards/AuthorCard";
import CategoryCard from "../components/cards/CategoryCard";
import AddAuthorToBookForm from "../components/forms/AddAuthorToBookForm";
import AddCategoryToBookForm from "../components/forms/AddCategoryToBookForm";
import AddCopyForm from "../components/forms/AddCopyForm";
import TitleAndDescriptionForm from "../components/forms/TitleAndDescriptionForm";
import Button from "../components/inputs/Button";
import SelectCopy from "../components/inputs/SelectCopy";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getBookById, removeAuthorFromBook, removeCategoryFromBook, updateBook } from "../redux/reducers/bookReducer";
import { makeLoan } from "../redux/reducers/loanReducer";
import { Book } from "../types/book";
import { Copy } from "../types/copy";

export default function BookPage() {
    const { id } = useParams();
    const user = useAppSelector(state => state.user);
    const book = useAppSelector(state => state.book) as unknown as Book;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [copy, setCopy] = useState("");


    useEffect(() => {
        dispatch(getBookById(parseInt(id as string)));
    }, [id])

    if (Array.isArray(book)) {
        dispatch(getBookById(parseInt(id as string)));
        return <>Loading...</>
    }
    
    function removeCategory(category:number) {
        dispatch(removeCategoryFromBook({id:parseInt(id as string), addId: category}))
    }
    function removeAuthor(author:number) {
        dispatch(removeAuthorFromBook({id:parseInt(id as string), addId: author}))
    }
    function loan() {
        dispatch(makeLoan({copyId: parseInt(copy), userId: user?.id as number}));
        setTimeout(() => {
            navigate("/loans")
        }, 500)
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
            <div className="book-page__make-loan">
                {book.copies?.filter(copy => copy.isAvailable).length === 0 
                ? <h5>Sorry no copies available for loan</h5>
                : <><h5>Loan this book</h5>
                <SelectCopy options={book.copies?.filter(copy => copy.isAvailable) as Copy[]} state={copy} setState={setCopy} label={"Choose a copy to loan (check id)"} />
                <Button onClick={loan} label="Loan" style="Standard" />
                </>
                }
                
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
                <div className="book-page__add-copy-form">
                    <AddCopyForm book={book} />
                </div>
            </>}
        </div>
        
    )
}