import { useNavigate } from "react-router-dom";
import { Author } from "../../types/author";

export default function AuthorCard(props:{author:Author, size: "small" | "large"}) {
    const navigate = useNavigate();
    return (
        <div className={`author-card-${props.size}`} onClick={() => navigate(`/authors/${props.author.id}`)}>
            {props.size === "large" && <div className="overlay"></div>}
            <div className="details">
                {props.size === "small" ?<p>{props.author.firstname} {props.author.lastname}</p> : <h4>{props.author.firstname} {props.author.lastname}</h4>}
            </div>
        </div>
    )
}