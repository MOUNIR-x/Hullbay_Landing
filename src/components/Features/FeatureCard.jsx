import { ArrowUpRight } from "lucide-react";

export default function FeatureCard({
    icon: Icon,
    title,
    description
}) {
    return (
        <article className="feature-card">

            <div className="feature-card__icon">
                <Icon size={26}/>
            </div>

            <h3>{title}</h3>

            <p>{description}</p>

            <button className="feature-card__link">
                En savoir plus
                <ArrowUpRight size={16}/>
            </button>

        </article>
    );
}