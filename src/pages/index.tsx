import type { ReactNode } from 'react';
import Layout from '@theme/Layout';

import Navbar from '@site/src/components/Navbar/Navbar';
import Hero from '@site/src/components/Hero/Hero';
import ProblemSolution from '@site/src/components/ProblemSolution/ProblemSolution';
import Features from '@site/src/components/Features/Features';
import Contribution from '@site/src/components/Contribution';
import CTA from '@site/src/components/CTA';
import Footer from '@site/src/components/Footer/Footer';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Hullbay"
      description="Hullbay landing page"
    >
      <Navbar />

      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <Contribution />
        < CTA />
      </main>

      <Footer />
    </Layout>
  );
}