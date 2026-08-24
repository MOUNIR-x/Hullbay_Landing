import { useEffect, useState } from "react";
import { BarsThree, DocumentText, XMark } from "@medusajs/icons";
import { FaGithub } from "react-icons/fa";
import { Brand } from "./Brand";
import { cn } from "./cn";
import { Container, LandingButton, LandingIconButton } from "./primitives";

const NAV_LINKS = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#how", label: "Architecture" },
  { href: "#install", label: "Installation" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-zinc-200 bg-[#fafafa]/80 backdrop-blur-[14px]"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Brand />

        <nav
          className={cn(
            "items-center md:flex md:gap-8",
            menuOpen
              ? "absolute inset-x-0 top-16 grid gap-4 border-b border-zinc-200 bg-white px-5 py-4 shadow-sm md:static md:grid-cols-none md:border-0 md:bg-transparent md:p-0 md:shadow-none"
              : "hidden",
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-[13px] text-zinc-600 no-underline hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LandingIconButton href="https://github.com/Fotetsa/Hullbay" label="GitHub">
            <FaGithub size={17} />
          </LandingIconButton>
          <LandingButton
            href="#introduction/Pourquoi-hullbay"
            variant="secondary"
            size="small"
            className="hidden sm:inline-flex"
          >
            <DocumentText />
            Documentation
          </LandingButton>
          <LandingIconButton
            className="md:hidden"
            label="Ouvrir le menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <XMark /> : <BarsThree />}
          </LandingIconButton>
        </div>
      </Container>
    </header>
  );
}
