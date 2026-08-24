import { Brand } from "./Brand";
import { Container } from "./primitives";

const COLUMNS = [
  {
    title: "Produit",
    links: [
      { href: "#features", label: "Fonctionnalités" },
      { href: "#how", label: "Architecture" },
      { href: "#install", label: "Installation" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { href: "#introduction/Pourquoi-hullbay", label: "Documentation" },
      { href: "https://github.com/Fotetsa/Hullbay", label: "GitHub" },
      { href: "#install", label: "Guide de démarrage" },
    ],
  },
  {
    title: "Communauté",
    links: [
      { href: "https://github.com/Fotetsa/Hullbay", label: "Contribuer" },
      { href: "#security/security-overview", label: "Sécurité" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 pb-6 pt-12">
      <Container>
        <div className="grid grid-cols-2 gap-7 md:grid-cols-[2fr_repeat(3,1fr)] md:gap-9">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Brand />
            </div>
            <p className="m-0 max-w-[250px] text-[13px] text-zinc-600">
              Infrastructure visuelle pour Docker Swarm. Self-hosted, open source, MIT.
            </p>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h4 className="mb-3 mt-0.5 text-xs font-semibold uppercase tracking-[0.07em] text-ink">
                {column.title}
              </h4>
              {column.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="my-2 block text-[13px] text-zinc-600 no-underline hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-1.5 border-t border-zinc-200 pt-5 text-xs text-zinc-400 md:flex md:justify-between">
          <span>© 2026 Hullbay — Licence MIT</span>
          <span>Fait pour tourner sur votre propre serveur</span>
        </div>
      </Container>
    </footer>
  );
}
