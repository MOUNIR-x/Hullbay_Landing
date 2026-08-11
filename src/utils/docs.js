export const docFiles = {
  'introduction/Pourquoi-hullbay': () => import('../../docs/introduction/Pourquoi-hullbay.mdx?raw'),
  'getting-started/installation': () => import('../../docs/getting-started/installation.mdx?raw'),
  'getting-started/premier-projet': () => import('../../docs/getting-started/premier-projet.mdx?raw'),
  'Concepts': () => import('../../docs/Concepts.mdx?raw'),
  'guides/deploiement': () => import('../../docs/guides/deploiement.mdx?raw'),
  'guides/infrastructure': () => import('../../docs/guides/infrastructure.mdx?raw'),
  'guides/secrets-registry': () => import('../../docs/guides/secrets-registry.mdx?raw'),
  'guides/depannage': () => import('../../docs/guides/depannage.mdx?raw'),
  'security/security-overview': () => import('../../docs/security/security-overview.mdx?raw'),
  'security/rbac': () => import('../../docs/security/rbac.mdx?raw'),
  'security/secrets': () => import('../../docs/security/secrets.mdx?raw'),
  'security/docker-socket': () => import('../../docs/security/docker-socket.mdx?raw'),
  'api/api-reference': () => import('../../docs/api/api-reference.mdx?raw'),
  'faq/faq': () => import('../../docs/faq/faq.mdx?raw'),
  'ads/changelog': () => import('../../docs/ads/changelog.mdx?raw'),
  //'contributing/setup': () => import('../../docs/contributing/setup.mdx?raw'),
  //'contributing/standards': () => import('../../docs/contributing/standards.mdx?raw'),
  'internal/architecture': () => import('../../docs/internal/architecture.mdx?raw'),
};

export const sidebarConfig = [
  {
    title: "INTRODUCTION",
    items: [
      { id: "introduction/Pourquoi-hullbay", label: "Pourquoi Hullbay ?" }
    ]
  },
  {
    title: "GETTING STARTED",
    items: [
      { id: "getting-started/installation", label: "Installation & Prérequis" },
      { id: "getting-started/premier-projet", label: "Créer votre premier projet" }
    ]
  },
  {
    title: "CORE CONCEPTS",
    items: [
      { id: "Concepts", label: "Concepts Fondamentaux" }
    ]
  },
  {
    title: "GUIDES",
    items: [
      { id: "guides/deploiement", label: "Déployer un projet" },
      { id: "guides/infrastructure", label: "Infrastructure & Serveurs" },
      { id: "guides/secrets-registry", label: "Secrets & Registry" },
      { id: "guides/depannage", label: "Dépannage" }
    ]
  },
  {
    title: "SECURITY",
    items: [
      { id: "security/security-overview", label: "Vue d'ensemble" },
      { id: "security/rbac", label: "RBAC & Permissions" },
      { id: "security/secrets", label: "Chiffrement & Secrets" },
      { id: "security/docker-socket", label: "Socket Docker" }
    ]
  },
  {
    title: "API REFERENCE",
    items: [
      { id: "api/api-reference", label: "API complète" }
    ]
  },
  /*
  {
    title: "CONTRIBUTING",
    items: [
      { id: "contributing/setup", label: "Configuration & Setup" },
      { id: "contributing/standards", label: "Standards de Code" }
    ]
  },*/
  {
    title: "INTERNAL & FAQ",
    items: [
      { id: "internal/architecture", label: "Architecture Interne" },
      { id: "faq/faq", label: "FAQ" },
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
