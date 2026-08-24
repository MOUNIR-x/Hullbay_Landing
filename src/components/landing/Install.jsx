import { Copy } from "@medusajs/ui";
import { BodyText, Container, DisplayHeading, Eyebrow, Section } from "./primitives";

const INSTALL_COMMAND =
  "curl -fsSL https://raw.githubusercontent.com/fotetsa/hullbay/master/install.sh | sudo bash";

export function Install() {
  return (
    <Section id="install">
      <Container className="grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
        <div>
          <Eyebrow>Démarrage</Eyebrow>
          <DisplayHeading className="mb-[18px] text-[clamp(27px,3vw,36px)] leading-snug">
            Une commande. Un serveur frais. C’est prêt.
          </DisplayHeading>
          <BodyText>
            Installe Docker, initialise le Swarm, démarre la console. Idempotent — relançable sans rien casser.
          </BodyText>
        </div>
        <div className="overflow-hidden rounded-[14px] bg-ink text-zinc-200 shadow-[0_20px_44px_-18px_#0008]">
          <div className="flex items-center justify-between bg-[#1c1c1f] px-4 py-2.5">
            <span className="flex gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <i className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
              <i className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            </span>
            <Copy content={INSTALL_COMMAND} className="text-zinc-400 hover:text-white" />
          </div>
          <code className="block break-all p-5 font-mono text-[13px] leading-relaxed">
            <b className="font-semibold text-hull-green">$</b> {INSTALL_COMMAND}
          </code>
        </div>
      </Container>
    </Section>
  );
}
