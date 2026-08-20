import { useState } from "react";
import { BarsThree, ChartActivity, DocumentText, XMark } from "@medusajs/icons";
import { FaGithub } from "react-icons/fa";

export function Brand() {
  return <a className="hb-brand" href="#top"><span className="hb-brand-mark"><ChartActivity /></span>Hullbay</a>;
}

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <header className="hb-nav"><div className="hb-wrap hb-nav-inner"><Brand /><nav className={menuOpen ? "hb-links open" : "hb-links"}><a href="#features" onClick={closeMenu}>Fonctionnalités</a><a href="#how" onClick={closeMenu}>Architecture</a><a href="#install" onClick={closeMenu}>Installation</a></nav><div className="hb-actions"><a className="hb-icon-button" href="https://github.com/Fotetsa/Hullbay" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a><a className="hb-button hb-button-small hb-docs" href="#introduction/Pourquoi-hullbay"><DocumentText />Documentation</a><button className="hb-icon-button hb-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">{menuOpen ? <XMark /> : <BarsThree />}</button></div></div></header>;
}

export function LandingFooter() {
  return <footer className="hb-footer"><div className="hb-wrap"><div className="hb-footer-grid"><div><Brand /><p>Infrastructure visuelle pour Docker Swarm. Self-hosted, open source, MIT.</p></div><div><h4>Produit</h4><a href="#features">Fonctionnalités</a><a href="#how">Architecture</a><a href="#install">Installation</a></div><div><h4>Ressources</h4><a href="#introduction/Pourquoi-hullbay">Documentation</a><a href="https://github.com/Fotetsa/Hullbay">GitHub</a><a href="#install">Guide de démarrage</a></div><div><h4>Communauté</h4><a href="https://github.com/Fotetsa/Hullbay">Contribuer</a><a href="#security/security-overview">Sécurité</a></div></div><div className="hb-footer-bottom"><span>© 2026 Hullbay — Licence MIT</span><span>Fait pour tourner sur votre propre serveur</span></div></div></footer>;
}
