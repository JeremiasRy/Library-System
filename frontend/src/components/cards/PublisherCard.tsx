import { useNavigate } from "react-router-dom";
import { Publisher } from "../../types/publisher";

export default function PublisherCard(props:{publisher:Publisher}) {
    const navigate = useNavigate();
    return (
        <div className="publisher-card" onClick={() => navigate(`/publishers/${props.publisher.id}`)}>
            <h4>{props.publisher.publisherName}</h4>
        </div>
    )
}