import  "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Logo */}
        <div className="footer-brand">
          <div className="footer-logo">
            H
          </div>

          <span>HULLBAY</span>
        </div>

        {/* Produit */}
        <div className="footer-column">
          <h3>PRODUIT</h3>

          <a href="#fonctionnalites">Fonctionnalités</a>
          <a href="#internal/architecture">Architecture</a>
          <a href="#introduction/Pourquoi-hullbay">Documentation</a>
        </div>

        {/* Ressources */}
        <div className="footer-column">
          <h3>RESSOURCES</h3>

          <a href="#introduction/Pourquoi-hullbay">DOCUMENTATION</a>
          <a href="https://github.com/Fotetsa/Hullbay" target="_blank" rel="noreferrer">GITHUB</a>
          <a href="#getting-started/installation">GUIDE DE DÉMARRAGE</a>
        </div>

        {/* Entreprise */}
        <div className="footer-column">
          <h3>ENTREPRISE</h3>

          <a href="#">À propos</a>
          <a href="#">Contact</a>
        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">

        <div className="footer-copyright">
          <span className="copyright-icon">©</span>
          <span>2026 Hullbay. Tous droits réservés.</span>
        </div>

        <div className="footer-legal">
          <a href="#introduction/Pourquoi-hullbay">Documentation</a> | <a href="https://github.com/Fotetsa/Hullbay" target="_blank" rel="noreferrer">Github</a> | Licence
        </div>

      </div>

    </footer>
  );
}