import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: [
        { type: 'doc', id: 'introduction/Pourquoi-hullbay', label: 'Pourquoi Hullbay ?' },
        { type: 'doc', id: 'introduction/comparatif', label: 'Comparatif' },
      ],
    },

    {
      type: 'category',
      label: 'Démarrage',
      collapsed: false,
      items: [
        { type: 'doc', id: 'getting-started/installation', label: 'Installation & prérequis' },
        { type: 'doc', id: 'getting-started/premier-projet', label: 'Premier projet' },
        { type: 'doc', id: 'getting-started/ajouter-base-de-donnees', label: 'Ajouter une base de données' },
        { type: 'doc', id: 'getting-started/multi-noeud', label: 'Étendre sur plusieurs nœuds' },
      ],
    },

    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      items: [
        { type: 'doc', id: 'concepts/double-source-de-verite', label: 'Double source de vérité' },
        { type: 'doc', id: 'concepts/types-de-noeuds', label: 'Les 5 types de nœuds' },
        { type: 'doc', id: 'concepts/reconciler', label: 'Cycle du réconcilier' },
        { type: 'doc', id: 'concepts/multi-cluster', label: 'Multi-cluster' },
      ],
    },

    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        { type: 'doc', id: 'guides/deploiement', label: 'Déployer un projet' },
        { type: 'doc', id: 'guides/infrastructure', label: 'Gérer l\'infrastructure' },
        { type: 'doc', id: 'guides/base-de-donnees', label: 'Configurer une base de données' },
        { type: 'doc', id: 'guides/secrets-registry', label: 'Secrets et registres Docker' },
        { type: 'doc', id: 'guides/mise-a-jour-instance', label: 'Mettre à jour l\'instance' },
        { type: 'doc', id: 'guides/depannage', label: 'Dépannage' },
      ],
    },

    {
      type: 'category',
      label: 'Sécurité',
      collapsed: false,
      items: [
        { type: 'doc', id: 'security/security-overview', label: 'Vue d\'ensemble' },
        { type: 'doc', id: 'security/rbac', label: 'RBAC & permissions' },
        { type: 'doc', id: 'security/secrets', label: 'Secrets et chiffrement' },
        { type: 'doc', id: 'security/docker-socket', label: 'Protection du socket Docker' },
      ],
    },

    {
      type: 'category',
      label: 'Référence',
      collapsed: false,
      items: [
        { type: 'doc', id: 'reference/api-reference', label: 'Référence API' },
        { type: 'doc', id: 'reference/variables-environnement', label: 'Variables d\'environnement' },
        { type: 'doc', id: 'reference/codes-erreur', label: 'Codes d\'erreur' },
      ],
    },

    {
      type: 'category',
      label: 'Contribuer',
      collapsed: false,
      items: [
        { type: 'doc', id: 'contributing/setup', label: 'Mise en place' },
        { type: 'doc', id: 'contributing/standards', label: 'Standards & tests' },
        { type: 'doc', id: 'contributing/architecture-conventions', label: 'Conventions d\'architecture' },
        { type: 'doc', id: 'contributing/releases', label: 'Processus de release' },
      ],
    },

    { type: 'doc', id: 'faq/faq', label: 'FAQ' },
    { type: 'doc', id: 'ads/changelog', label: 'Changelog' },
  ],
};

export default sidebars;