import { useEffect } from "react";
import CategoryCard from "../components/cards/CategoryCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { getAllCategories } from "../redux/reducers/categoryReducer";

export default function Categories() {
    const categories = useAppSelector(state => state.category);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllCategories(null));
    }, []);

    if (!Array.isArray(categories)) {
        return <>Loading...</>
    }

    return (
        <div className="categories-page">
            <div className="categories-page__categories-wrapper">
                {categories.map(category => <CategoryCard category={category} />)}
            </div>
        </div>
    )
}