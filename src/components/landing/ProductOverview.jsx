import { CheckCircleSolid, ShieldCheck, Sparkles } from "@medusajs/icons";
import canvasPreview from "../../assets/images/image2.png";
import { BodyText, Container, DisplayHeading, Eyebrow, Section, WindowDots } from "./primitives";

export function ProductOverview() {
  return (
    <Section id="how" className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">

        {/* En-tête : Storytelling axé sur la transformation */}
        <div className="mx-auto flex max-w-[780px] flex-col items-center transition-all duration-700 ease-out">
          <Eyebrow className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200/60 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-[#0066CC] backdrop-blur-sm shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#0066CC]" />
            DU DESSIN AU DÉPLOIEMENT
          </Eyebrow>

          <DisplayHeading className="mb-5 text-[clamp(32px,4.5vw,48px)] font-bold tracking-tight text-zinc-950 leading-[1.12]">
            Dessinez vos idées. <br className="hidden sm:inline" />
            <span className="text-[#0066CC]">Hullbay gère la réalité.</span>
          </DisplayHeading>

          <BodyText className="max-w-[660px] text-base sm:text-lg leading-relaxed text-zinc-600">
            Oubliez les scripts YAML interminables et les configurations SSH complexes.
            Posez vos briques sur le canvas : Hullbay orchestre automatiquement vos conteneurs et sécurise vos réseaux en coulisses.
          </BodyText>
        </div>

        {/* Démo visuelle : Canvas avec halo lumineux */}
        <div className="group relative mt-12 w-full max-w-[980px] transition-all duration-500">
          {/* Halos de lumière sous le canvas */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-500/20 via-sky-400/20 to-blue-600/20 blur-xl opacity-70 transition-all duration-500 group-hover:opacity-100" />

          <figure className="relative m-0 w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_20px_50px_-12px_rgba(0,102,204,0.12)]">
            {/* Barre supérieure d'interface */}
            <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-100/90 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <WindowDots />
                <span className="ml-2 font-mono text-[11px] font-medium text-zinc-400 select-none">
                  app.hullbay.io/canvas
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50/80 px-3 py-0.5 text-[11px] font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Cluster Swarm : Opérationnel
              </div>
            </div>

            {/* Aperçu Canvas */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
              <img
                src={canvasPreview}
                alt="Démonstration visuelle du canvas interactif Hullbay"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.01]"
              />
            </div>

            {/* Légende basse */}
            <figcaption className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/80 px-5 py-3 text-[12px] font-medium text-zinc-500">
              <span>Synchronisation bidirectionnelle : Le schéma définit l'état réel de vos serveurs.</span>
              <span className="hidden sm:inline text-zinc-400 font-mono text-[11px]">v1.0 Ready</span>
            </figcaption>
          </figure>
        </div>

        {/* 3 Piliers avec animations hover en CSS */}
        <div className="mt-16 grid w-full max-w-[980px] gap-6 text-left sm:grid-cols-3">
          <div className="group rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5">
            <div className="mb-3.5 inline-flex rounded-xl bg-blue-50 p-2.5 text-[#0066CC] transition-colors duration-300 group-hover:bg-[#0066CC] group-hover:text-white">
              <CheckCircleSolid className="h-5 w-5" />
            </div>
            <h3 className="mb-1.5 text-base font-semibold text-zinc-900">
              Clustering en un clic
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              Reliez vos nœuds instantanément. Hullbay répartit vos conteneurs pour garantir une tolérance aux pannes sans configuration manuelle.
            </p>
          </div>

          <div className="group rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5">
            <div className="mb-3.5 inline-flex rounded-xl bg-blue-50 p-2.5 text-[#0066CC] transition-colors duration-300 group-hover:bg-[#0066CC] group-hover:text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="mb-1.5 text-base font-semibold text-zinc-900">
              Certificats SSL Automatiques
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              Génération et renouvellement Let's Encrypt automatisés. Vos domaines sont sécurisés en HTTPS dès leur raccordement sur le schéma.
            </p>
          </div>

          <div className="group rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5">
            <div className="mb-3.5 inline-flex rounded-xl bg-blue-50 p-2.5 text-[#0066CC] transition-colors duration-300 group-hover:bg-[#0066CC] group-hover:text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="mb-1.5 text-base font-semibold text-zinc-900">
              Déploiement Zero-Downtime
            </h3>
            <p className="text-xs leading-relaxed text-zinc-500">
              Mettez à jour vos applications en toute sérénité. Les basculements se font de manière progressive pour éviter toute coupure de service.
            </p>
          </div>
        </div>

      </Container>
    </Section>
  );
}