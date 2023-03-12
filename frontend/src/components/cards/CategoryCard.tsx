import { useNavigate } from "react-router-dom";
import { Category } from "../../types/category";

export default function CategoryCard(props: {category:Category}) {
    const navigate = useNavigate();
    return (
        <div className="category-card" onClick={() => navigate(props.category.id.toString())}>
            <h4>{props.category.title}</h4>
        </div>
    )
}