import { WindowDots } from "./primitives";

export function HeroCanvas() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-zinc-200 bg-white shadow-[0_8px_24px_-12px_rgba(24,24,27,0.13)] transition-transform duration-300 hover:scale-[1.01]">
      {/* Barre supérieure style Fenêtre */}
      <div className="flex h-[45px] items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-4">
        <WindowDots />
        <code className="ml-2 font-mono text-[11px] text-zinc-400">boutique-prod / canvas</code>
      </div>

      {/* Surface du Canvas */}
      <div className="relative h-[300px] bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:18px_18px] md:h-[340px]">
        <svg className="absolute inset-0 h-full w-full fill-none stroke-zinc-300 stroke-[1.6]" viewBox="0 0 440 300" preserveAspectRatio="none">
          <path d="M85 58 C125 58 130 58 95 168" className="stroke-[#0066CC] stroke-dasharray-2 animate-pulse" />
          <path d="M95 168 C150 168 170 168 220 168" />
          <path d="M150 58 C265 58 285 58 345 58" className="stroke-[#0066CC] stroke-dasharray-2 animate-pulse" />
        </svg>

        {/* Nœuds du Schéma */}
        <Node className="left-[26px] top-[34px]" live>
          api
        </Node>
        <small className="absolute left-[118px] top-[22px] rounded-[10px] bg-zinc-900 px-1.5 py-px font-mono text-[10px] text-white">
          ×3
        </small>
        <Node className="left-[26px] top-[150px]">network</Node>
        <Node className="left-[170px] top-[150px] md:left-[206px]">volume</Node>
        <Node className="right-[26px] top-[34px]" live>
          app.exemple.com
        </Node>

        {/* Plan de Déploiement */}
        <div className="absolute bottom-3 right-3 min-w-[145px] rounded-[10px] bg-zinc-900 p-3 text-white shadow-[0_12px_28px_-10px_rgba(0,0,0,0.5)] md:bottom-[18px] md:right-[18px] md:min-w-[170px]">
          <small className="font-mono text-[10px] uppercase tracking-[0.08em] text-zinc-400">
            Plan de déploiement
          </small>
          <PlanRow label="Créer" value="3" valueClass="text-emerald-400" />
          <PlanRow label="Mettre à jour" value="1" valueClass="text-amber-400" />
          <PlanRow label="Supprimer" value="0" />
        </div>
      </div>
    </div>
  );
}

function Node({ className, live = false, children }) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-[9px] border border-zinc-300 bg-white px-3 py-2 text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${className}`}
    >
      <b
        className={
          live
            ? "inline-block h-1.5 w-1.5 rounded-full bg-[#0066CC] shadow-[0_0_0_3px_rgba(0,102,204,0.22)]"
            : "inline-block h-1.5 w-1.5 rounded-full bg-zinc-400"
        }
      />
      {children}
    </div>
  );
}

function PlanRow({ label, value, valueClass = "" }) {
  return (
    <p className="mt-1 mb-0 flex justify-between text-xs">
      <span>{label}</span>
      <b className={valueClass}>{value}</b>
    </p>
  );
}

export default HeroCanvas;