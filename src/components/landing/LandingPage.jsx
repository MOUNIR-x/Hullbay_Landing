import { TooltipProvider } from "@medusajs/ui";
import { Features } from "./Features";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Install } from "./Install";
import { ProductOverview } from "./ProductOverview";
import Security from "./Security";
import { Comparaison } from "./Comparaison";

export default function LandingPage() {
  return (
    <TooltipProvider>
      <div id="top" className="overflow-hidden bg-[#fafafa] font-sans text-[15px] leading-normal text-zinc-900 antialiased">
        <Header />
        <main>
          <Hero />
          <ProductOverview />
          <Comparaison />
          <Features />
          <Install />
          <Security />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
