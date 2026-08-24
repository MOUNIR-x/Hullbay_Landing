import { ArrowRight } from "@medusajs/icons";
import { FaGithub } from "react-icons/fa";
import { Reveal } from "./Reveal";
import { Container, DisplayHeading, Eyebrow, LandingButton } from "./primitives";

export function FinalCta() {
  return (
    <section className="border-t border-zinc-200 py-14 md:py-[76px]">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[14px] bg-ink px-6 py-11 text-center text-white md:px-9 md:py-[58px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-120%_35%_auto_-55%] h-[250%] animate-hb-sheen bg-[linear-gradient(110deg,transparent_43%,rgba(16,185,129,0.16)_50%,transparent_57%)] motion-reduce:hidden"
          />
          <div className="relative">
            <Eyebrow className="text-zinc-400">Open source · MIT</Eyebrow>
            <DisplayHeading className="mx-auto max-w-[700px] text-[clamp(29px,3.2vw,40px)] text-white md:text-[40px]">
              Prêt à reprendre le contrôle de
              <br />
              <br />
              <span className="text-[#0066CC]">
                votre cluster ?
              </span>
            </DisplayHeading>
            <p className="mx-auto mb-7 mt-4 max-w-[600px] text-[#c8c8cc]">
              Installez Hullbay sur votre serveur, ou aidez-nous à bâtir une meilleure manière de piloter Docker
              Swarm.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <LandingButton href="#install" variant="accent" size="large">
                Installer Hullbay <ArrowRight />
              </LandingButton>
              <LandingButton
                href="https://github.com/Fotetsa/Hullbay"
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="large"
              >
                <FaGithub />
                Contribuer sur GitHub
              </LandingButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
