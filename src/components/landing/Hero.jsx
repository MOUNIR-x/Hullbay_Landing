import { useState, useEffect, useRef } from "react";
import { HeroCanvas } from "./HeroCanvas";
import { BodyText, Container, DisplayHeading, Eyebrow } from "./primitives";

export function Hero() {
  const [typedText, setTypedText] = useState("");
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const fullText = "Glissez. Déposez. Déployez.";

  // Déclenchement de l'animation au chargement direct ou au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Animation machine à écrire
  useEffect(() => {
    if (!hasAnimated) return;

    let timeoutId;
    if (typedText.length < fullText.length) {
      timeoutId = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
    }

    return () => clearTimeout(timeoutId);
  }, [typedText, hasAnimated]);

  // Application de la couleur bleue uniquement sur le mot "Déployez."
  const renderTypedText = () => {
    const part1 = "Glissez. Déposez. ";
    if (typedText.length <= part1.length) {
      return typedText;
    }

    const firstPart = typedText.slice(0, part1.length);
    const deployPart = typedText.slice(part1.length);

    return (
      <>
        {firstPart}
        <span className="relative inline-block text-[#0066CC] after:absolute after:bottom-[2px] after:left-[2%] after:right-[2%] after:-z-[1] after:h-[0.34em] after:animate-pulse after:rounded after:bg-[rgba(0,102,204,0.22)]">
          {deployPart}
        </span>
      </>
    );
  };

  return (
    <section ref={sectionRef} className="pt-12 text-center md:pt-20">
      <Container className="mx-auto max-w-[1040px]">
        {/* Eyebrow */}
        <Eyebrow className="flex items-center justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#0066CC] shadow-[0_0_0_3px_rgba(0,102,204,0.22)]" />
          PROPULSÉ PAR DOCKER SWARM — SELF-HOSTED, OPEN SOURCE
        </Eyebrow>

        {/* Titre animé sur une ligne */}
        <DisplayHeading
          as="h1"
          className="min-h-[1.2em] text-[clamp(26px,4.5vw,56px)] font-semibold leading-tight tracking-tight text-[#0B0B0C] whitespace-nowrap"
        >
          {renderTypedText()}
          {typedText.length < fullText.length && (
            <span className="inline-block h-[0.75em] w-[3px] ml-1 bg-[#0066CC] animate-pulse align-middle" />
          )}
        </DisplayHeading>

        {/* Accroche unique sans tracasserie */}
        <BodyText className="mx-auto mb-8 mt-6 max-w-[780px] text-[18px] md:text-[20px] font-medium leading-relaxed text-[#3F3F46]">
          Dessinez votre infrastructure sur un canvas interactif et déployez-la instantanément, sans la moindre tracasserie de terminal.
        </BodyText>

        {/* CTA : Filled + Outlined */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
          {/* Bouton Filled Bleu */}
          <a
            href="#install"
            className="inline-flex items-center justify-center rounded-lg bg-[#0066CC] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#0052A3] active:scale-[0.98]"
          >
            Installer Hullbay
          </a>

          {/* Bouton Outlined Clair */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 shadow-sm transition-all hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98]"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Contribuer sur GitHub
          </a>
        </div>
      </Container>

      {/* Canvas interactif */}
      <div className="mx-auto max-w-[1080px] px-5 pb-[90px]">
        <HeroCanvas />
      </div>
    </section>
  );
}

export default Hero;