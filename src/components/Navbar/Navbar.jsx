 import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/images/logo.png"

const links = [
  {
    label: "PRODUIT",
    href: "#produit",
  },
  {
    label: "DOCUMENTATION",
    href: "#documentation",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header-bar">
      <div className="main-container">

        {/* Logo et Nom du site */}
        <a href="/" className="logo-box">
          <div className="logo-icon">
            <img src= {logo} alt="H" />
          </div>
          <span className="logo-text">HULLBAY</span>
        </a>

        {/* Liens de navigation principal (Desktop) */}
        <nav className="nav-menu">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>{/* Boutons d'action (GitHub, Contribuer et Menu Hamburger) */}
        <div className="right-buttons">
          <a
            href="https://github.com/Fotetsa/Hullbay"
            target="_blank"
            rel="noreferrer"
            className="github-btn"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a href="#contribuer" className="btn-contribuer">
            Contribuer →
          </a>

          <button
            className="menu-mobile-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu déroulant sur Téléphone */}
      {isOpen && (
        <div className="mobile-dropdown">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="mobile-link"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contribuer"
            onClick={() => setIsOpen(false)}
            className="mobile-btn-contribuer"
          >
            Contribuer →
          </a>
        </div>
      )}
    </header>
  );
}