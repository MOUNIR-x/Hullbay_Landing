 import { ArrowRight, BookOpen } from "lucide-react";
import image1 from "../../assets/images/image1.jpeg";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">

      {/* Colonne Gauche : Texte et Boutons */}
      <div className="hero-left">

        <span className="badge-tag">
          GESTION DES INFRASTRUCTURES
        </span>

        <h1 className="hero-title">
          Infrastructure visuelle.
          <br />
          Déploiements Docker
          <br />
          simplifiés.
        </h1>

        <p className="hero-desc">
          Une interface pour concevoir, déployer et superviser vos environnements
          conteneurisés.
        </p>

        <div className="btn-group">
          <a href="#deploiement" className="btn-main">
            Commencer avec HULLBAY
            <ArrowRight size={18} />
          </a><a href="#documentation" className="btn-second">
            <BookOpen size={18} />
            Voir la documentation
          </a>
        </div>

        <div className="stats-box">
          <div className="stat-item">
            <h3>100%</h3>
            <span>Open Source</span>
          </div>

          <div className="stat-item">
            <h3>Docker</h3>
            <span>Swarm Ready</span>
          </div>

          <div className="stat-item">
            <h3>Self Hosted</h3>
            <span>Infrastructure maîtrisée</span>
          </div>
        </div>

      </div>

      {/* Colonne Droite : Preview / Image */}
      <div className="hero-right">
        <div className="image-card">
          <div className="card-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <img src={image1} alt="Aperçu Hullbay" className="dashboard-img" />
        </div>
      </div>

    </section>
  );
}