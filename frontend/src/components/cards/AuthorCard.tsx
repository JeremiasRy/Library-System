import { useNavigate } from "react-router-dom";
import { Author } from "../../types/author";

export default function AuthorCard(props:{author:Author, size: "small" | "large"}) {
    const navigate = useNavigate();
    return (
        <div className={`author-card ${props.size}`} onClick={() => navigate(`${props.author.id}`)}>
            <h4>{props.author.firstname} {props.author.lastname}</h4>
        </div>
    )
}