import { Book } from "../../types/book";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookCard(props: {book:Book, size: "small" | "large"}) {
    const navigate = useNavigate()
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [circleX, setCircleX] = useState(0);
    const [circleY, setCircleY] = useState(0);
    const [scale, setScale] = useState(false);

    function zeroRotate() {
        setRotateX(0);
        setRotateY(0);
        setCircleX(0);
        setCircleY(0);
        setScale(false);
    }

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
        setRotateX(-center.x / 10);
        setRotateY(center.y / 10);
        setCircleX(center.x * 2 + bounds.width / 2);
        setCircleY(center.y * 2 + bounds.height / 2);
        setScale(true);
    }

    return (
        <div 
        style={{transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${scale ? "scale3d(1.05, 1.05, 1.05)" : "" }`}}
        id={props.book.id.toString()}
        className={`book-card-${props.size}`} 
        onClick={() => navigate(`/books/${props.book.id.toString()}`)}  
        onMouseLeave={zeroRotate}
        onMouseMove={rotateMouse}>
            <div
            style={{backgroundImage: `radial-gradient(circle at ${circleX}px ${circleY}px, #ffffff55, #0000000f)`}} 
            className="glow">
            </div>
            <div className="overlay">
            </div>
            <div className={`book-card-${props.size}__details`}>
                <h4>{props.book.title}</h4>
                {props.book.authors?.map(author => <p key={author.id}><em>{`${author.firstname} ${author.lastname}`}</em></p>)}
                <p>Copies available: {props.book.copiesAvailable}</p>
            </div>
        </div>
    )
}