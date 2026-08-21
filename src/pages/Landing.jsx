import { useEffect } from "react";
import { LandingFooter, LandingHeader } from "../components/landing/LandingChrome";
import LandingHero from "../components/landing/LandingHero";
import { Features, FinalCta, Install, ProductOverview, Security, Workflow } from "../components/landing/LandingSections";
import "./Landing.css";

export default function Landing() {
  useEffect(() => {
    const onScroll = () => document.querySelector(".hb-nav")?.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".hb-proof-grid, .hb-section, .hb-feature, .hb-step-grid article, .hb-security-card, .hb-final > .hb-wrap > div");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    elements.forEach((element) => element.classList.add("hb-reveal"));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.14 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div className="hullbay-landing" id="top"><LandingHeader /><main><LandingHero /><ProductOverview /><Workflow /><Features /><Install /><Security /><FinalCta /></main><LandingFooter /></div>;
}
