import { useNavigate } from "react-router-dom";
import { Author } from "../../types/author";

export default function AuthorCard(props:{author:Author, size: "small" | "large"}) {
    const navigate = useNavigate();
    return (
        <div className={`author-card-${props.size}`} onClick={props.size === "small" ? () => navigate(`/authors/${props.author.id}`) : () => {}}>
            <p>{props.author.firstname} {props.author.lastname}</p>
        </div>
    )
}