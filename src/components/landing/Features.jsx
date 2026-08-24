import { useState, useEffect } from "react";
import {
  ChartActivity,
  DocumentText,
  Eye,
  LockClosedSolid,
  SquaresPlus,
  UserGroup,
} from "@medusajs/icons";
import { Container, DisplayHeading, Eyebrow, Section } from "./primitives";

const DURATION = 6000;

const FEATURES = [
  {
    id: "canvas",
    Icon: SquaresPlus,
    title: "Canvas visuel",
    subtitle: "Conception de cluster sans effort",
    text: "Glissez, déposez et organisez vos applications en quelques clics. Votre infrastructure Docker Swarm se dessine visuellement, sans avoir à manipuler de fichiers complexes.",
    imageSrc: "/images/features/canvas-demo.png",
    codeSnippet: `# Topologie visuelle Hullbay
services:
  application:
    repliques: 3
    redirection: automatique
    mode_haute_disponibilite: actif`,
  },
  {
    id: "plan",
    Icon: DocumentText,
    title: "Simulation préalable",
    subtitle: "Déploiements 100% sécurisés",
    text: "Visualisez exactement ce qui va changer avant chaque mise à jour. Hullbay simule l'impact sur vos serveurs Swarm pour vous garantir zéro interruption de service.",
    imageSrc: "/images/features/plan-demo.png",
    codeSnippet: `[Hullbay Engine] Analyse de la mise à jour :
  ~ Mise à niveau progressive des serveurs
  + Allocation des ressources à chaud
  
Résultat : 0 coupure pour vos utilisateurs.`,
  },
  {
    id: "roles",
    Icon: UserGroup,
    title: "Gestion des accès",
    subtitle: "Travail d'équipe maîtrisé",
    text: "Attribuez les bons droits à chaque membre de votre équipe. Protégez vos environnements critiques tout en laissant la liberté d'expérimenter en toute sécurité.",
    imageSrc: "/images/features/roles-demo.png",
    codeSnippet: `# Politiques d'accès par rôle
Administrateur -> Contrôle total des clusters
Opérateur     -> Mises à jour & Auto scaling
Observateur   -> Consultation des métriques`,
  },
  {
    id: "audit",
    Icon: Eye,
    title: "Traçabilité complète",
    subtitle: "Historique clair et lisible",
    text: "Conservez une mémoire exacte de toutes les actions effectuées sur vos clusters. Qui a déployé, quand et avec quel impact : tout est consigné sans effort.",
    imageSrc: "/images/features/audit-demo.png",
    codeSnippet: `# Journal des actions système
[Horodatage]  2026-08-20 18:00
[Utilisateur] équipe-dev
[Action]      Déploiement version 2.0
[Statut]      Succès sur le cluster Swarm`,
  },
  {
    id: "scaling",
    Icon: ChartActivity,
    title: "Auto scaling",
    subtitle: "Adaptation instantanée",
    text: "Absorbez les pics de trafic sans sourciller. Exploitez la puissance native de Docker Swarm pour dupliquer vos services à la demande en une seconde.",
    imageSrc: "/images/features/scaling-demo.png",
    codeSnippet: `# Ajustement de la charge
Charge détectée : Hausse de trafic
Action          : Passage de 2 à 8 répliques
Statut          : Répartition automatique active`,
  },
  {
    id: "secrets",
    Icon: LockClosedSolid,
    title: "Sécurité native",
    subtitle: "Protection de vos données",
    text: "Vos mots de passe et clés de chiffrement sont isolés et protégés par la sécurité native de Docker Swarm, sans aucune intervention manuelle à risque.",
    imageSrc: "/images/features/secrets-demo.png",
    codeSnippet: `# Chiffrement des secrets Swarm
[Coffre-fort] Mots de passe chiffrés
[Injection]   Transmis uniquement en mémoire vive
[Résultat]    Données de configuration 100% isolées`,
  },
];

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const intervalTime = 50;
    const step = (intervalTime / DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % FEATURES.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeIndex]);

  const activeFeature = FEATURES[activeIndex];

  return (
    <Section id="features" className="py-12 sm:py-16 overflow-hidden">
      <Container>
        {/* En-tête */}
        <div className="mb-8 sm:mb-12 max-w-[580px]">
          <Eyebrow>Fonctionnalités</Eyebrow>
          <DisplayHeading className="text-[clamp(24px,4vw,36px)] leading-snug">
            Toute la puissance de Docker Swarm, l'expérience visuelle en plus.
          </DisplayHeading>
        </div>

        {/* Navigation Onglets - Defilement fluide sur mobile */}
        <div className="relative border-b border-zinc-200">
          <div className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory lg:grid lg:grid-cols-6 pb-0.5">
            {FEATURES.map((feature, index) => {
              const isActive = activeIndex === index;
              const Icon = feature.Icon;

              return (
                <button
                  key={feature.id}
                  onClick={() => {
                    setActiveIndex(index);
                    setProgress(0);
                  }}
                  className={`group relative flex min-w-[150px] sm:min-w-[170px] lg:min-w-0 flex-col items-start p-3 sm:p-4 text-left transition-all shrink-0 snap-start ${isActive ? "bg-zinc-50/80" : "hover:bg-zinc-50/50"
                    }`}
                >
                  <span
                    className={`mb-2 sm:mb-3 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-lg border transition-colors ${isActive
                        ? "border-[#0066CC] bg-[#0066CC]/10 text-[#0066CC]"
                        : "border-zinc-200 bg-white text-zinc-500 group-hover:border-zinc-300"
                      } [&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-[18px] sm:[&>svg]:w-[18px]`}
                  >
                    <Icon />
                  </span>

                  <h3
                    className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors whitespace-nowrap lg:whitespace-normal ${isActive ? "text-[#0B0B0C]" : "text-zinc-600 group-hover:text-zinc-900"
                      }`}
                  >
                    {feature.title}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[11px] sm:text-xs text-zinc-400">
                    {feature.subtitle}
                  </p>

                  {/* Barre d'activation / progression */}
                  {isActive ? (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-zinc-200">
                      <div
                        className="h-full bg-[#0066CC] transition-all ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  ) : (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-transparent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cadre de Démonstration */}
        <div className="mt-6 sm:mt-8 rounded-2xl border border-zinc-200 bg-zinc-900/5 p-4 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 lg:items-center">

            {/* Texte & Code (Colonne gauche) */}
            <div className="flex flex-col justify-center lg:col-span-5 order-1 min-w-0">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#0066CC]">
                <span className="h-2 w-2 rounded-full bg-[#0066CC]" />
                {activeFeature.subtitle}
              </span>

              <h4 className="mt-2 text-lg sm:text-xl font-semibold text-zinc-900">
                {activeFeature.title}
              </h4>

              <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600">
                {activeFeature.text}
              </p>

              {/* Bloc de visualisation structurée (Anti-débordement) */}
              <div className="mt-4 sm:mt-6 w-full max-w-full overflow-hidden rounded-xl bg-[#0B0B0C] p-3 sm:p-4 text-[11px] sm:text-xs shadow-inner">
                <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-zinc-500 border-b border-zinc-800 pb-2">
                  <span>Moteur Docker Swarm</span>
                  <span>Hullbay</span>
                </div>
                <pre className="font-mono leading-relaxed text-blue-400 whitespace-pre-wrap break-words min-w-0 overflow-x-auto">
                  <code>{activeFeature.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Visuel principal (Colonne droite) */}
            <div className="lg:col-span-7 order-2 min-w-0">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
                <img
                  src={activeFeature.imageSrc}
                  alt={activeFeature.title}
                  className="h-full w-full object-cover object-top transition-opacity duration-300"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 p-4 text-center -z-10">
                  <div className="mb-2 sm:mb-3 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-xl bg-white border border-zinc-200 text-[#0066CC] shadow-sm">
                    <activeFeature.Icon />
                  </div>
                  <span className="font-mono text-xs font-semibold text-zinc-400 px-2">
                    Aperçu : {activeFeature.title}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </Section>
  );
}

export default Features;