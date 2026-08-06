import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    // ─── 1. DÉCOUVERTE ───────────────────────────────────────────────
    {
      type: 'doc',
      id: 'introduction/Pourquoi-hullbay',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Démarrage',
      collapsed: false,
      items: [
        { type: 'doc', id: 'getting-started/installation', label: 'Installation & Prérequis' },
        { type: 'doc', id: 'getting-started/premier-projet', label: 'Créer votre premier projet' },
      ],
    },

    // ─── 2. COMPRENDRE ───────────────────────────────────────────────
    {
      type: 'doc',
      id: 'concepts',
      label: 'Concepts Fondamentaux',
    },

    // ─── 3. AGIR (Guides pratiques) ──────────────────────────────────
    {
      type: 'category',
      label: 'Guides',
      items: [
        { type: 'doc', id: 'guides/deploiement', label: 'Déployer un projet' },
        { type: 'doc', id: 'guides/infrastructure', label: 'Infrastructure & Serveurs' },
        { type: 'doc', id: 'guides/secrets-registry', label: 'Secrets & Registry' },
        { type: 'doc', id: 'guides/depannage', label: 'Dépannage' },
      ],
    },

    // ─── 4. SÉCURITÉ ─────────────────────────────────────────────────
    {
      type: 'category',
      label: 'Sécurité',
      items: [
        { type: 'doc', id: 'security/security-overview', label: 'Vue d\'ensemble' },
        { type: 'doc', id: 'security/rbac', label: 'RBAC & Permissions' },
        { type: 'doc', id: 'security/secrets', label: 'Chiffrement & Secrets' },
        { type: 'doc', id: 'security/docker-socket', label: 'Socket Docker' },
      ],
    },

    // ─── 5. RÉFÉRENCE ────────────────────────────────────────────────
    {
      type: 'category',
      label: 'Référence',
      items: [
        { type: 'doc', id: 'api/api-reference', label: 'API complète' },
        { type: 'doc', id: 'faq/faq', label: 'FAQ' },
        { type: 'doc', id: 'ads/changelog', label: 'Changelog' }, // ou 'release-notes'
      ],
    },

  ],
};

export default sidebars;