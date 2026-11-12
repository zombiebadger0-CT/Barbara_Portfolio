# Barbara's Portfolio

My technical writing portfolio, built with [Docusaurus](https://docusaurus.io/).

## Where content goes

| Page      | URL          | Edit this                     |
| --------- | ------------ | ----------------------------- |
| Homepage  | `/`          | `src/pages/index.js`          |
| About     | `/about`     | `src/pages/about.md`          |
| Resume    | `/resume`    | `src/pages/resume.md`         |
| Portfolio | `/portfolio` | Markdown files in `docs/`     |
| Blog      | `/blog`      | Markdown files in `blog/`     |

Theme colors are in `src/css/custom.css`. Navigation, footer, and site
title are in `docusaurus.config.js`.

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm start
```

The site opens at http://localhost:3000 and reloads as you edit.

## Build

```bash
npm run build
```

The static site is written to `build/`.
