import { Book } from "../../types/book";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookCard(props: {book:Book, size: "small" | "large"}) {
    const navigate = useNavigate()
    const [rotate, setRotate] = useState("");

    function rotateMouse(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const bounds = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        };
        const distance = Math.sqrt(center.x**2 + center.y**2);
        setRotate(`rotate3d(${center.y / 100}, ${-center.x / 100}, 0, ${Math.log(distance) * 2}deg)`);
    }

    return (
        <div 
        style={rotate !== "" ? {transform: `scale3d(1.1, 1.1, 1.1) ${rotate}`} : {}}
        id={props.book.id.toString()}
        className={`book-card ${props.size}`} 
        onClick={() => navigate(`/books/${props.book.id.toString()}`)}  
        onMouseLeave={() => setRotate("")}
        onMouseMove={rotateMouse}>
            <h4>{props.book.title}</h4>
            <em>Authors:</em> {props.book.authors?.map(author => <p key={author.id}>{`${author.firstname} ${author.lastname}`}</p>)}
            <p>Copies available: {props.book.copiesAvailable}</p>
        </div>
    )
}