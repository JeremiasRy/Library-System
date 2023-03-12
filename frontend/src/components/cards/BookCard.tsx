import { Book } from "../../types/book";
import { useNavigate } from "react-router-dom";

export default function BookCard(props: {book:Book}) {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/books/${props.book.id.toString()}`)}>
            <h4>{props.book.title}</h4>
            <em>Authors:</em> {props.book.authors?.map(author => <p key={author.id}>{`${author.firstname} ${author.lastname}`}</p>)}
            <p>Copies available: {props.book.copiesAvailable}</p>
        </div>
    )
}