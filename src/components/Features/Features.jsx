import { Network,Rocket,Activity,ShieldCheck,} from "lucide-react";
import "./Features.css";

const features = [
  {
    title: "Visualisation",
    description:
      "Comprenez votre infrastructure grâce à une représentation claire des projets et ressources.",
    icon: Network,
  },
  {
    title: "Deploiement",
    description:
      "Déployez vos environnements et gardez le contrôle sur leur état.",
    icon: Rocket,
  },
  {
    title: "Observabilité",
    description:
      "Surveillez les nœuds, services et ressources depuis une vue centralisée.",
    icon: Activity,
  },
  {
    title: "Audit & sécurité",
    description:
      "Suivez les opérations sensibles et gardez une trace des actions effectuées.",
    icon: ShieldCheck,
  },
];

export default function Features() {
  return (
    <section id="fonctionnalites" className="features-section">
      <div className="features-container">

        {/* Titre de la section */}
        <h2 className="features-title">
          Fontionnalites
        </h2>

        {/* Grille des 4 cartes */}
        <div className="features-grid">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="feature-card">
                
                <div className="icon-box">
                  <Icon size={48} className="card-icon" />
                </div>

                <h3 className="card-title">
                  {feature.title}
                </h3>

                <p className="card-desc">
                  {feature.description}
                </p>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}