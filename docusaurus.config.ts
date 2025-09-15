import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'MU20 Haacht United',
  tagline: 'U20 Meisjesvoetbalteam',
  favicon: 'img/hu.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://mu20-haacht-united.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served.
  // Voor root deployment (https://mu20-haacht-united.github.io) gebruiken we '/'
  // Let op: voor een organisatie/user site moet de repository normaal heten: <org>.github.io
  // Als deze repo NIET zo heet en je toch root wilt, kan dat alleen via aparte hosting of een redirect pagina in de org root repo.
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'MU20-Haacht-United', // Usually your GitHub org/user name.
  projectName: 'mu20-haacht-united.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/MU20-Haacht-United/MU20-Haacht-United/tree/main/',
        },
  blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    metadata: [
      {name: 'theme-color', content: '#d0181e'},
      {name: 'msapplication-TileColor', content: '#d0181e'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'MU20 Haacht United',
      logo: {
        alt: 'MU20 Logo',
        src: 'img/hu.jpg',
      },
      items: [
        {to: '/general-info', label: 'Algemene info', position: 'left'},
        {to: '/players', label: 'Speelsters', position: 'left'},
        {to: '/games', label: 'Wedstrijden & Statistieken', position: 'left'},
  {to: '/duties', label: 'Shiften & Taken', position: 'left'},
  // Blog disabled
        {
          href: 'https://github.com/MU20-Haacht-United/MU20-Haacht-United',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
      title: 'Team',
          items: [
            {
        label: 'Algemene info',
              to: '/general-info',
            },
            {
        label: 'Speelsters',
              to: '/players',
            },
            {
        label: 'Wedstrijden & Statistieken',
              to: '/games',
            },
            {
        label: 'Shiften & Taken',
              to: '/duties',
            },
          ],
        },
        {
      title: 'Contact',
          items: [
            {
              label: 'Email',
              href: 'mailto:sujith.quintelier@gmail.com',
            },
          ],
        },
        {
      title: 'Meer',
          items: [
            // Blog link removed
            {
              label: 'GitHub',
              href: 'https://github.com/MU20-Haacht-United/MU20-Haacht-United',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sujith Quintelier. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
