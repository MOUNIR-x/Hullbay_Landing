import "./Footer.css";
import logo from "../../assets/images/logo.png"

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Partie supérieure : Logo et liens */}
        <div className="footer-top">

          {/* Marque / Logo */}
          <div className="footer-brand">
            <div className="logo-square">
              <img src= {logo} alt="H" className="logo-img" />
            </div>
            <span className="brand-name">HULLBAY</span>
          </div>

          {/* Colonne Produit */}
          <div className="footer-col">
            <h4 className="col-title">PRODUIT</h4>
            <ul className="col-links">
              <li><a href="#fonctionnalites">Fonctionnalités</a></li>
              <li><a href="#produit">Architecture</a></li>
              <li><a href="#documentation">Documentation</a></li>
            </ul>
          </div>

          {/* Colonne Ressources */}
          <div className="footer-col">
            <h4 className="col-title">RESSOURCES</h4>
            <ul className="col-links">
              <li><a href="#documentation">DOCUMENTATION</a></li>
              <li><a href="https://github.com/Fotetsa/Hullbay" target="_blank" rel="noreferrer">GITHUB</a></li>
              <li><a href="#demarrage">GUIDE DE DÉMARRAGE</a></li>
            </ul>
          </div>

          {/* Colonne Entreprise */}
          <div className="footer-col">
            <h4 className="col-title">ENTREPRISE</h4>
            <ul className="col-links">
              <li><a href="#about">À propos</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div></div>

        {/* Ligne de séparation */}
        <hr className="footer-divider" />

        {/* Partie inférieure : Copyright et liens légaux */}
        <div className="footer-bottom">
          <div className="copyright-box">
            <span className="copy-icon">©</span>
            <span className="copy-text">2026 Hullbay. Tous droits réservés.</span>
          </div>

          <div className="legal-links">
            <a href="#documentation">Documentation</a>
            <span className="separator">|</span>
            <a href="https://github.com/Fotetsa/Hullbay" target="_blank" rel="noreferrer">Github</a>
            <span className="separator">|</span>
            <a href="#licence">Licence</a>
          </div>
        </div>

      </div>
    </footer>
  );
}