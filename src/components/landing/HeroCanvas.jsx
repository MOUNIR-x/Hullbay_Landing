import { WindowDots } from "./primitives";
import heroVideo from "../../assets/images/img1.mp4";

export function HeroCanvas() {
  return (
    <div className="mx-auto w-full max-w-[1200px] transition-transform duration-300 hover:scale-[1.01]">
      {/* Window decoration */}
      <div className="overflow-hidden rounded-[12px] border border-zinc-200 bg-white shadow-[0_8px_24px_-12px_rgba(24,24,27,0.13)]">
        <div className="flex h-[46px] items-center gap-2 border-b border-zinc-200 bg-zinc-100 px-4">
          <WindowDots />
          <code className="ml-2 font-mono text-[11px] text-zinc-400">boutique-prod / canvas</code>
        </div>

        {/* Video area: centered, responsive, no cropping */}
        <div className="flex justify-center items-center bg-white p-4 md:p-6">
          <video
            src={heroVideo}
            loop
            muted
            autoPlay
            playsInline
            className="w-full h-auto max-h-[640px] object-contain"
            aria-label="Démonstration du canvas Hullbay"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCanvas;