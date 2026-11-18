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

  // GitHub Pages site served from the custom domain https://barbaramorach.me/
  // (the domain's DNS is managed in Cloudflare; static/CNAME tells GitHub Pages the domain).
  url: 'https://barbaramorach.me',
  baseUrl: '/',
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

  plugins: [
    [
      // The CV section is a second docs section, so it gets its own
      // left sidebar and Previous/Next buttons, like the Portfolio.
      '@docusaurus/plugin-content-docs',
      {
        id: 'cv',
        path: 'cv',
        routeBasePath: 'cv',
        sidebarPath: './sidebarsCV.js',
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Charcoal, slate, and acid-green theme: light mode only.
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        style: 'dark',
        title: 'Barbara',
        logo: {
          alt: 'Barbara Morach',
          src: 'img/headshot-small.jpg',
        },
        items: [
          {to: '/about', label: 'About', position: 'right'},
          {
            type: 'docSidebar',
            docsPluginId: 'cv',
            sidebarId: 'cvSidebar',
            label: 'CV',
            position: 'right',
          },
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
        style: 'dark',
        links: [
          {
            title: 'Site',
            items: [
              {label: 'About', to: '/about'},
              {label: 'CV', to: '/cv'},
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
        copyright: `© 2026 Barbara Morach. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
      },
    }),
};

export default config;
