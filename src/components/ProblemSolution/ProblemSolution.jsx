import { ArrowRight } from "lucide-react";
import image2 from "../../assets/images/image2.png";
import "./ProblemSolution.css";

export default function ProblemSolution() {
  return (
    <section id="fonctionnalites" className="problem-section">

      {/* Côté gauche : Textes et lien */}
      <div className="problem-text-box">

        <span className="small-title">
          PROBLEME/SOLUTION
        </span>

        <h2 className="main-title">
          Une infrastructure
          <br />
          complexe ne devrai pas etre
          <br />
          difficile a comprendre.
        </h2>

        <p className="description-text">
          Les environnements Docker deviennent rapidement difficiles à
          suivre lorsque les projets, services, réseaux et nœuds se
          multiplient.
        </p>

        <a href="#documentation" className="green-link">
          Hullbay →
          <ArrowRight size={18} />
        </a>

      </div>

      {/* Côté droit : Image de la carte interactive */}
      <div className="problem-image-box">
        <img
          src={image2}
          alt="Architecture Hullbay"
          className="schema-img"
        />
      </div>

    </section>
  );
}