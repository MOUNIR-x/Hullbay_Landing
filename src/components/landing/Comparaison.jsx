import { CheckCircleSolid, CommandLine, ShieldCheck, SquaresPlus, Sparkles } from "@medusajs/icons";
import { Reveal } from "./Reveal";
import { BodyText, Container, DisplayHeading, Eyebrow, Section } from "./primitives";

const STEPS = [
  {
    n: "01",
    Icon: CommandLine,
    title: "Branchez vos nœuds",
    text: "Une commande installe Docker si nécessaire et prépare l'agent Hullbay. Fonctionne sur serveur vierge ou déjà en production.",
  },
  {
    n: "02",
    Icon: SquaresPlus,
    title: "Composez votre infrastructure",
    text: "Assemblez vos services, répliques HA, réseaux et passerelles sur un canvas visuel validé en temps réel.",
  },
  {
    n: "03",
    Icon: ShieldCheck,
    title: "Vérifiez, puis déployez",
    text: "Analysez le diff exact avant exécution. Hullbay orchestre les changements sans interrompre vos stacks existantes.",
  },
];

const MATRIX_DATA = [
  {
    feature: "Certificats SSL auto",
    category: "Réseau",
    hullbay: { text: "Natif (Zero Config)", status: "full" },
    coolify: { text: "Natif (Traefik/Caddy)", status: "full" },
    portainer: { text: "Manuel / Proxy", status: "partial" },
    railway: { text: "Géré (Auto-TLS)", status: "full" },
    k8s: { text: "Cert-Manager / CRD", status: "complex" },
  },
  {
    feature: "Isolation & Multi-projets",
    category: "Sécurité",
    hullbay: { text: "Réseaux Swarm & RBAC", status: "full" },
    coolify: { text: "Projets & Envs", status: "full" },
    portainer: { text: "Teams & Envs", status: "full" },
    railway: { text: "Environments Cloud", status: "full" },
    k8s: { text: "Namespaces & RBAC", status: "full" },
  },
  {
    feature: "Multi-serveurs & Clusters",
    category: "Orchestration",
    hullbay: { text: "Cluster Swarm 1-Click", status: "full" },
    coolify: { text: "Multi-serveur basique", status: "partial" },
    portainer: { text: "Multi-cluster nativement", status: "full" },
    railway: { text: "Non disponible", status: "none" },
    k8s: { text: "Multi-cluster / Nodes", status: "full" },
  },
  {
    feature: "Auto-scaling & Réplication",
    category: "Scalabilité",
    hullbay: { text: "Visual Drag & Drop HA", status: "full" },
    coolify: { text: "Single-Node focus", status: "none" },
    portainer: { text: "Swarm Replicas manuels", status: "partial" },
    railway: { text: "Auto-scale Cloud ($$$)", status: "partial" },
    k8s: { text: "HPA / VPA", status: "full" },
  },
  {
    feature: "Bases de Données HA (Failover)",
    category: "Haute Dispo",
    hullbay: { text: "Native 1-Click Replica", status: "full" },
    coolify: { text: "Single instance (SPOF)", status: "none" },
    portainer: { text: "Setup manuel lourd", status: "none" },
    railway: { text: "Services managés payants", status: "partial" },
    k8s: { text: "Operators complexes", status: "complex" },
  },
  {
    feature: "Canvas Visuel 2D",
    category: "Expérience",
    hullbay: { text: "Canvas Interactif Live", status: "full" },
    coolify: { text: "Formulaires UI", status: "none" },
    portainer: { text: "Dashboard / Stacks YAML", status: "none" },
    railway: { text: "Node Graph basique", status: "partial" },
    k8s: { text: "Fichiers YAML / CLI", status: "none" },
  },
  {
    feature: "Cohabitation Infra Existante",
    category: "Flexibilité",
    hullbay: { text: "Oui (Serveur vierge ou Prod)", status: "full" },
    coolify: { text: "Contrôle total exigé", status: "partial" },
    portainer: { text: "Excellente cohabitation", status: "full" },
    railway: { text: "Impossible (Cloud fermé)", status: "none" },
    k8s: { text: "Serveurs dédiés requis", status: "none" },
  },
  {
    feature: "Plan d'impact (Dry-run / Diff)",
    category: "Contrôle",
    hullbay: { text: "Diff exact pré-déploiement", status: "full" },
    coolify: { text: "Déploiement direct", status: "none" },
    portainer: { text: "Exécution immédiate", status: "none" },
    railway: { text: "Build direct", status: "none" },
    k8s: { text: "CLI (kubectl diff)", status: "partial" },
  },
];

function StatusBadge({ data, isHullbay = false }) {
  if (isHullbay) {
    return (
      <div className="flex items-center gap-2 font-medium text-zinc-900">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0066CC] text-white shadow-sm">
          ✓
        </span>
        <span className="text-xs sm:text-sm font-semibold text-[#0066CC]">{data.text}</span>
      </div>
    );
  }

  const renderIcon = () => {
    switch (data.status) {
      case "full":
        return (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
            ✓
          </span>
        );
      case "partial":
        return (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-bold text-xs">
            ~
          </span>
        );
      case "complex":
        return (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-xs">
            ⚙
          </span>
        );
      default:
        return (
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-400 font-bold text-xs">
            ✕
          </span>
        );
    }
  };

  return (
    <div className="flex items-center gap-2">
      {renderIcon()}
      <span className="text-xs text-zinc-600 font-normal">{data.text}</span>
    </div>
  );
}

export function Comparaison() {
  return (
    <Section className="bg-gradient-to-b from-[#fafafa] via-white to-[#f6f6f7] py-20">
      <Container>

        {/* Workflow */}
        <div className="mb-12 max-w-[600px]">
          <Eyebrow>S'ADAPTE À VOTRE EXISTANT</Eyebrow>
          <DisplayHeading className="mb-4 text-[clamp(27px,3vw,36px)] leading-snug">
            Du serveur vierge au serveur déjà en prod.
          </DisplayHeading>
          <BodyText>
            Hullbay ne vous impose pas de tout reconfigurer : il cohabite avec vos charges de travail existantes et simplifie l'accès à la haute disponibilité.
          </BodyText>
        </div>

        <div className="mb-20 grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.Icon;
            return (
              <Reveal
                as="article"
                key={step.n}
                delay={index * 80}
                className="group relative rounded-2xl border border-zinc-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <span className="absolute right-6 top-6 font-mono text-xs font-bold text-zinc-300 transition-colors group-hover:text-[#0066CC]">
                  {step.n}
                </span>
                <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#0066CC] transition-colors group-hover:bg-[#0066CC] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold tracking-tight text-zinc-900">
                  {step.title}
                </h3>
                <p className="m-0 text-sm leading-relaxed text-zinc-600">
                  {step.text}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Tableau comparatif net et lisible */}
        <Reveal className="mt-16 rounded-2xl border border-zinc-200/80 bg-white shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10 border-b border-zinc-100 bg-gradient-to-r from-zinc-50/50 via-white to-zinc-50/50">
            <div className="mx-auto max-w-[680px] text-center">
              <Eyebrow className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0066CC]">
                <Sparkles className="w-3.5 h-3.5" />
                L'INTERSECTION PARFAITE
              </Eyebrow>
              <h3 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                La simplicité du PaaS. La puissance de l'Orchestrateur.
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Hullbay réunit la convivialité de Coolify/Railway et la robustesse multi-nœuds de Portainer/K8s.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-200/80 font-mono text-[11px] uppercase tracking-wider text-zinc-400 bg-zinc-50/50">
                  <th className="px-6 py-4 font-medium min-w-[180px]">Capacités</th>
                  <th className="bg-blue-50/50 px-6 py-4 font-bold text-[#0066CC] border-x border-blue-100 min-w-[210px]">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#0066CC] animate-ping" />
                      Hullbay
                    </div>
                  </th>
                  <th className="px-5 py-4 font-medium text-zinc-600 min-w-[150px]">Coolify</th>
                  <th className="px-5 py-4 font-medium text-zinc-600 min-w-[160px]">Portainer</th>
                  <th className="px-5 py-4 font-medium text-zinc-600 min-w-[150px]">Railway</th>
                  <th className="px-5 py-4 font-medium text-zinc-600 min-w-[150px]">Kubernetes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {MATRIX_DATA.map((row, idx) => (
                  <tr key={idx} className="group transition-all duration-150 hover:bg-zinc-50/80">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-zinc-900">{row.feature}</div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{row.category}</div>
                    </td>

                    <td className="bg-blue-50/30 px-6 py-4 border-x border-blue-100/80 group-hover:bg-blue-50/60 transition-colors">
                      <StatusBadge data={row.hullbay} isHullbay />
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge data={row.coolify} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge data={row.portainer} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge data={row.railway} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge data={row.k8s} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

      </Container>
    </Section>
  );
}

export default Comparaison;