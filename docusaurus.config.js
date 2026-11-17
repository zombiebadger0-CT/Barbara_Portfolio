// @ts-check
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Barbara',
  tagline: 'Technical Writer',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
  },

  // GitHub Pages project site: https://zombiebadger0-ct.github.io/Barbara_Portfolio/
  url: 'https://zombiebadger0-ct.github.io',
  baseUrl: '/Barbara_Portfolio/',
  organizationName: 'zombiebadger0-CT',
  projectName: 'Barbara_Portfolio',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // The Portfolio section lives in /docs and is served at /portfolio.
        docs: {
          path: 'docs',
          routeBasePath: 'portfolio',
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: 'Recent posts',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Green-and-white theme: light mode only.
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Barbara',
        logo: {
          alt: 'Barbara Morach',
          src: 'img/headshot-small.jpg',
        },
        items: [
          {to: '/about', label: 'About', position: 'right'},
          {to: '/resume', label: 'Resume', position: 'right'},
          {
            type: 'docSidebar',
            sidebarId: 'portfolioSidebar',
            label: 'Portfolio',
            position: 'right',
          },
          {to: '/blog', label: 'Blog', position: 'right'},
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Site',
            items: [
              {label: 'About', to: '/about'},
              {label: 'Resume', to: '/resume'},
              {label: 'Portfolio', to: '/portfolio'},
              {label: 'Blog', to: '/blog'},
            ],
          },
          {
            title: 'Connect',
            items: [
              {label: 'LinkedIn', href: 'https://www.linkedin.com/in/barbaramorach'},
              {label: 'GitHub', href: 'https://github.com/zombiebadger0-CT/Barbara_Portfolio'},
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Barbara. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
      },
    }),
};

export default config;
