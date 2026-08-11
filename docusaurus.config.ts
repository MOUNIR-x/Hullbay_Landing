import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Hullbay',
  tagline: 'Plateforme PaaS visuelle auto-hébergeable pour Docker Swarm',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://hullbay.dev',
  baseUrl: '/',

  organizationName: 'Fotetsa',
  projectName: 'Hullbay_Landing',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebar.ts',
          editUrl: 'https://github.com/Fotetsa/Hullbay_Landing/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Hullbay',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/Fotetsa/hullbay',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://hullbay.dev',
          label: 'Site',
          position: 'right',
        },
      ],
    },
    
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
