 import "./Contribution.css";

export default function Contribution() {
  return (
    <section id="contribuer" className="section-contrib">
      <div className="contrib-container">

        {/* Partie gauche : Textes */}
        <div className="contrib-text-box">
          <span className="small-tag">
            Contribuer
          </span>

          <h2 className="main-title">
            Construisez l'outils avec nous.
          </h2>

          <p className="desc-text">
            HullBay est un projet ouvert, contribuez au code, proposez des
            ameliorations et participer a son developpement
          </p>
        </div>

        {/* Partie droite : Bouton d'action */}
        <div className="contrib-btn-box">
          <a
            href="https://github.com/Fotetsa/Hullbay"
            target="_blank"
            rel="noreferrer"
            className="btn-github-grey"
          >
            Contribuez sur github →
          </a>
        </div>

      </div>
    </section>
  );
}