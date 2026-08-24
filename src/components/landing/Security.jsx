import { CheckCircleSolid, ShieldCheck, Sparkles } from "@medusajs/icons";
import canvasPreview from "../../assets/images/image2.png";
import { Reveal } from "./Reveal";
import { BodyText, Container, DisplayHeading, Eyebrow, Section, WindowDots } from "./primitives";

export function ProductOverview() {
  return (
    <Section id="how" className="py-20 bg-[#fafafa]">
      <Container>

        <Reveal
          as="div"
          className="relative rounded-3xl border border-zinc-800 bg-[#0B0B0C] text-white p-8 sm:p-12 shadow-2xl overflow-hidden"
        >
          {/* Halo lumineux */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#0066CC]/20 blur-[100px] rounded-full pointer-events-none" />

          {/* Titre & Accroche principale */}
          <div className="relative z-10 mb-10 max-w-[680px]">
            <Eyebrow className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3399FF]/10 text-[#3399FF] border border-blue-500/30 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              COHABITATION NATIVE & HA
            </Eyebrow>

            <DisplayHeading className="text-[clamp(26px,3.2vw,38px)] font-bold tracking-tight text-white leading-[1.2]">
              L'infrastructure Haute Disponibilité sans repartir de zéro.
            </DisplayHeading>
          </div>

          {/* Interface / Application mockup */}
          <div className="relative z-10 rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl shadow-xl overflow-hidden">

            {/* Barre supérieure */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-3">
              <div className="flex items-center gap-2">
                <WindowDots />
                <span className="ml-2 font-mono text-[11px] text-zinc-500">
                  hullbay-canvas // infrastructure-overlay
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#3399FF] bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-800/40">
                <span className="h-2 w-2 rounded-full bg-[#3399FF] animate-pulse" />
                Cluster Swarm : Actif & Cohabitant
              </div>
            </div>

            {/* Grille interne */}
            <div className="grid lg:grid-cols-12 items-stretch min-h-[420px]">

              {/* Volet Storytelling */}
              <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-950/50">
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    Aucune obligation de serveur vierge
                  </h3>
                  <BodyText className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    Ne cassez pas ce qui fonctionne. Hullbay s'installe sur vos machines existantes et cohabite avec vos conteneurs et scripts actuels tout en apportant l'orchestration graphique.
                  </BodyText>

                  <ul className="space-y-3.5 text-xs text-zinc-300 mb-6">
                    <li className="flex items-start gap-2.5">
                      <CheckCircleSolid className="w-4 h-4 text-[#3399FF] shrink-0 mt-0.5" />
                      <span><strong>Bases de données HA :</strong> Réplication et failover automatique en 1 drag & drop.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-[#3399FF] shrink-0 mt-0.5" />
                      <span><strong>Cohabitation Linux :</strong> Préserve vos services Docker déjà en cours d'exécution.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#3399FF] shrink-0 mt-0.5" />
                      <span><strong>Contrôle visuel :</strong> Reprenez la main sur vos réseaux et passerelles sans YAML.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Zone Visuelle */}
              <div className="lg:col-span-8 relative bg-zinc-950 overflow-hidden flex items-center justify-center min-h-[280px]">
                <img
                  src={canvasPreview}
                  alt="Démonstration du Canvas Hullbay"
                  className="w-full h-full object-cover object-left-top transition-transform duration-500 hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>
          </div>

        </Reveal>
      </Container>
    </Section>
  );
}

export default ProductOverview;