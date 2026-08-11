 import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-wrapper">

        <div className="cta-card">

          <h2 className="cta-title">
            Pret a Deployer ?
          </h2>

          <p className="cta-desc">
            Visualisez, déployez et supervisez vos environnements Docker depuis Hullbay.
          </p>

          <div className="cta-btn-group">
            <a href="#deploiement" className="btn-black">
              Deployer avec Hullbay
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}