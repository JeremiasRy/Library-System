import { useNavigate } from "react-router-dom";
import { Category } from "../../types/category";

export default function CategoryCard(props: {category:Category, size: "small" | "large"}) {
    const navigate = useNavigate();
    return (
        <div className={`category-card-${props.size}`} onClick={() => navigate(`/categories/${props.category.id}`)}>
            {props.size === "large" && <div className="overlay"></div>}
            <div className="details">
                {props.size === "small" ?<p>{props.category.title}</p> :<><h4>{props.category.title}</h4><p>{props.category.description}</p></>}
            </div>
        </div>
    )
}