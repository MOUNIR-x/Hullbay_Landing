let changelogCache = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache

export const fetchRuntimeChangelog = async () => {
  const now = Date.now();
  if (changelogCache && (now - lastFetchTime < CACHE_TTL_MS)) {
    return changelogCache;
  }

  const OWNER = 'Fotetsa';
  const REPO = 'hullbay';

  const timestamp = Date.now();
  // 1. Try master branch (default), then main branch
  const rawUrls = [
    `https://raw.githubusercontent.com/${OWNER}/${REPO}/master/CHANGELOG.md?_t=${timestamp}`,
    `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/CHANGELOG.md?_t=${timestamp}`,
  ];

  for (const url of rawUrls) {
    try {
      const res = await fetch(url, { cache: 'no-store' });
      if (res.ok) {
        const text = await res.text();
        if (text && text.trim()) {
          let out = text.trim();
          if (!out.startsWith('#')) {
            out = `# Changelog\n\n${out}`;
          }
          const result = { default: out };
          changelogCache = result;
          lastFetchTime = Date.now();
          return result;
        }
      }
    } catch (err) {
      console.warn(`Fetch changelog from ${url} failed:`, err);
    }
  }

  // 2. Fallback to GitHub Releases API
  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases?per_page=15`);
    if (res.ok) {
      const releases = await res.json();
      if (Array.isArray(releases) && releases.length > 0) {
        let md = `# Changelog\n\n`;
        releases.forEach(rel => {
          if (!rel.draft) {
            md += `## ${rel.name || rel.tag_name}\n\n`;
            if (rel.published_at) {
              const date = new Date(rel.published_at).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
              md += `*Publié le ${date}*\n\n`;
            }
            md += `${rel.body || 'Aucune note de version fournie.'}\n\n---\n\n`;
          }
        });
        const result = { default: md };
        changelogCache = result;
        lastFetchTime = Date.now();
        return result;
      }
    }
  } catch (err) {
    console.warn('Fetch GitHub releases failed:', err);
  }

  // 3. Fallback to local changelog.mdx if bundled
  try {
    const local = await import('../../docs/ads/changelog.mdx?raw');
    const content = local.default || local;
    if (content && content.trim()) {
      return { default: content };
    }
  } catch (_) {}

  return {
    default: `# Changelog\n\n> Impossible de récupérer le changelog depuis GitHub pour le moment. Vous pouvez consulter les releases directement sur [GitHub](https://github.com/${OWNER}/${REPO}/releases).\n`,
  };
};

export const docFiles = {
  'introduction/Pourquoi-hullbay': () => import('../../docs/introduction/Pourquoi-hullbay.mdx?raw'),
  'introduction/architecture': () => import('../../docs/introduction/architecture.mdx?raw'),
  'introduction/comparatif': () => import('../../docs/introduction/comparatif.mdx?raw'),

  'getting-started/installation': () => import('../../docs/getting-started/installation.mdx?raw'),
  'getting-started/premier-projet': () => import('../../docs/getting-started/premier-projet.mdx?raw'),
  'getting-started/ajouter-base-de-donnees': () => import('../../docs/getting-started/ajouter-base-de-donnees.mdx?raw'),
  'getting-started/multi-noeud': () => import('../../docs/getting-started/multi-noeud.mdx?raw'),

  'concepts/double-source-de-verite': () => import('../../docs/concepts/double-source-de-verite.mdx?raw'),
  'concepts/types-de-noeuds': () => import('../../docs/concepts/types-de-noeuds.mdx?raw'),
  'concepts/reconciler': () => import('../../docs/concepts/reconciler.mdx?raw'),
  'concepts/multi-cluster': () => import('../../docs/concepts/multi-cluster.mdx?raw'),

  'guides/deploiement': () => import('../../docs/guides/deploiement.mdx?raw'),
  'guides/infrastructure': () => import('../../docs/guides/infrastructure.mdx?raw'),
  'guides/base-de-donnees': () => import('../../docs/guides/base-de-donnees.mdx?raw'),
  'guides/secrets-registry': () => import('../../docs/guides/secrets-registry.mdx?raw'),
  'guides/mise-a-jour-instance': () => import('../../docs/guides/mise-a-jour-instance.mdx?raw'),
  'guides/depannage': () => import('../../docs/guides/depannage.mdx?raw'),
  'guides/observabilite': () => import('../../docs/guides/observabilite.mdx?raw'),
  'guides/maintenance': () => import('../../docs/guides/maintenance.mdx?raw'),

  'security/security-overview': () => import('../../docs/security/security-overview.mdx?raw'),
  'security/rbac': () => import('../../docs/security/rbac.mdx?raw'),
  'security/secrets': () => import('../../docs/security/secrets.mdx?raw'),
  'security/docker-socket': () => import('../../docs/security/docker-socket.mdx?raw'),
  'security/audit-logs': () => import('../../docs/security/audit-logs.mdx?raw'),

  'reference/api-reference': () => import('../../docs/reference/api-reference.mdx?raw'),
  'reference/variables-environnement': () => import('../../docs/reference/variables-environnement.mdx?raw'),
  'reference/codes-erreur': () => import('../../docs/reference/codes-erreur.mdx?raw'),

  'contributing/setup': () => import('../../docs/contributing/setup.mdx?raw'),
  'contributing/standards': () => import('../../docs/contributing/standards.mdx?raw'),
  'contributing/architecture-conventions': () => import('../../docs/contributing/architecture-conventions.mdx?raw'),
  'contributing/releases': () => import('../../docs/contributing/releases.mdx?raw'),

  'faq/faq': () => import('../../docs/faq/faq.mdx?raw'),
  'ads/changelog': fetchRuntimeChangelog,
};

export const sidebarConfig = [
  {
    title: "INTRODUCTION",
    items: [
      { id: "introduction/Pourquoi-hullbay", label: "Qu'est-ce que Hullbay ?" },
      { id: "introduction/comparatif", label: "Comparatif" }
    ]
  },
  {
    title: "DÉMARRAGE",
    items: [
      { id: "getting-started/installation", label: "Installation & Prérequis" },
      { id: "getting-started/premier-projet", label: "Premier projet" },
      { id: "getting-started/ajouter-base-de-donnees", label: "Ajouter une base de données" },
      { id: "getting-started/multi-noeud", label: "Étendre sur plusieurs nœuds" }
    ]
  },
  {
    title: "CONCEPTS",
    items: [
      { id: "concepts/double-source-de-verite", label: "Double source de vérité" },
      { id: "concepts/types-de-noeuds", label: "Les 5 types de nœuds" },
      { id: "concepts/reconciler", label: "Cycle du réconcilier" },
      { id: "concepts/multi-cluster", label: "Multi-cluster" }
    ]
  },
  {
    title: "GUIDES",
    items: [
      { id: "guides/deploiement", label: "Déployer un projet" },
      { id: "guides/infrastructure", label: "Gérer l'infrastructure" },
      { id: "guides/base-de-donnees", label: "Configurer une base de données" },
      { id: "guides/secrets-registry", label: "Secrets et registres Docker" },
      { id: "guides/mise-a-jour-instance", label: "Mettre à jour l'instance" },
      { id: "guides/depannage", label: "Dépannage" }
    ]
  },
  {
    title: "SÉCURITÉ",
    items: [
      { id: "security/security-overview", label: "Vue d'ensemble" },
      { id: "security/rbac", label: "RBAC & permissions" },
      { id: "security/secrets", label: "Secrets et chiffrement" },
      { id: "security/docker-socket", label: "Protection du socket Docker" }
    ]
  },
  {
    title: "RÉFÉRENCE",
    items: [
      { id: "reference/api-reference", label: "Référence API" },
      { id: "reference/variables-environnement", label: "Variables d'environnement" },
      { id: "reference/codes-erreur", label: "Codes d'erreur" }
    ]
  },
  {
    title: "CONTRIBUER",
    items: [
      { id: "contributing/setup", label: "Mise en place" },
      { id: "contributing/standards", label: "Standards & tests" },
      { id: "contributing/architecture-conventions", label: "Conventions d'architecture" },
      { id: "contributing/releases", label: "Processus de release" }
    ]
  },
  {
    title: "DIVERS",
    items: [
      { id: "ads/changelog", label: "Changelog" }
    ]
  }
];

export const getBreadcrumbs = (docId) => {
  for (const category of sidebarConfig) {
    const item = category.items.find(i => i.id === docId);
    if (item) {
      return ["Docs", category.title.charAt(0) + category.title.slice(1).toLowerCase(), item.label];
    }
  }
  return ["Docs", "General", docId];
};

export const parseFrontmatter = (content) => {
  const normalized = content.replace(/\r\n/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n/);
  if (match) {
    const yaml = match[1];
    const data = {};
    yaml.split('\n').forEach(line => {
      const idx = line.indexOf(':');
      if (idx !== -1) {
        const key = line.substring(0, idx).trim();
        const value = line.substring(idx + 1).trim().replace(/^['"]|['"]$/g, '');
        data[key] = value;
      }
    });
    return { frontmatter: data, content: normalized.substring(match[0].length) };
  }
  return { frontmatter: {}, content: normalized };
};

// Simple helper to remove markdown syntax for search indexing
const stripMarkdown = (md) => {
  return md
    .replace(/^#+\s+/gm, '') // headings
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\*+/g, '') // bold/italic
    .replace(/:::[a-z]+\s*/g, '') // admonitions
    .trim();
};

export const indexDocsForSearch = async () => {
  const index = [];

  for (const category of sidebarConfig) {
    for (const item of category.items) {
      try {
        const loader = docFiles[item.id];
        if (loader) {
          const rawModule = await loader();
          const { frontmatter, content } = parseFrontmatter(rawModule.default || rawModule);

          // Index page title & description
          index.push({
            id: item.id,
            title: frontmatter.title || item.label,
            type: 'page',
            snippet: frontmatter.description || item.label,
          });

          // Index headings
          const headingRegex = /^(##|###)\s+(.+)$/gm;
          let match;
          while ((match = headingRegex.exec(content)) !== null) {
            const level = match[1];
            const text = stripMarkdown(match[2]);
            const anchor = text.toLowerCase()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-');

            index.push({
              id: `${item.id}#${anchor}`,
              title: text,
              type: level === '##' ? 'section' : 'sub-section',
              pageTitle: frontmatter.title || item.label,
              snippet: `Section in ${frontmatter.title || item.label}`
            });
          }
        }
      } catch (err) {
        console.error(`Failed to index doc ${item.id}`, err);
      }
    }
  }

  return index;
};
