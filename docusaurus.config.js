// @ts-check
// See: https://docusaurus.io/docs/api/docusaurus-config

import {execSync} from 'node:child_process';
import {themes as prismThemes} from 'prism-react-renderer';

// Date of the latest commit on the branch being built. On main, that is the
// latest merged pull request. Used by the "still building" notice on the home page.
function lastUpdatedDate() {
  try {
    return execSync("git log -1 --format=%cd --date=format:'%B %-d, %Y'")
      .toString()
      .trim();
  } catch {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Barbara Morach Portfolio',
  tagline:
    'Senior Technical Writer | Product Enablement Content | Knowledge Base Manager',
  favicon: 'img/logo.svg',

  future: {
    v4: true,
  },

  customFields: {
    // Temporary "still building" notice on the home page.
    // To hide it, change true to false. To delete it for good, see
    // src/components/BuildNotice/index.js.
    showBuildNotice: true,
    lastUpdated: lastUpdatedDate(),
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
      // Link-preview image (social card) shown when the site is shared on
      // LinkedIn, Slack, and other apps. 1200 x 630 pixels.
      image: 'img/social-card.png',

      // Charcoal, slate, and acid-green theme: light mode only.
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        style: 'dark',
        title: 'Barbara Morach Home',
        logo: {
          alt: 'Barbara Morach monogram',
          src: 'img/logo.svg',
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
