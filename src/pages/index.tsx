import type { ReactNode } from 'react';
import Layout from '@theme/Layout';

import Landing from '@site/src/pages/Landing';

export default function Home(): ReactNode {
  return (
    <Layout
      title="Hullbay"
      description="Hullbay landing page"
    >
      <Landing />
    </Layout>
  );
}
