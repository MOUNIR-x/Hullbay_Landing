import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Features from "../components/Features/Features.jsx";
import Contribution from "../components/Contribution/Contribution.jsx";
import CTA from "../components/CTA/CTA.jsx";
import Footer from "../components/Footer/Footer.jsx";

import "../css/global.css";
import ProblemSolution from "../components/ProblemSolution/ProblemSolution.jsx";

export default function Landing() {
  return (
    <main className="landing-page">
      <Navbar />

      <Hero />

      <ProblemSolution />

      <Features />

      <Contribution />

      <CTA />

      <Footer />
    </main>
  );
}