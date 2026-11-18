# Barbara's Portfolio

My technical writing portfolio, built with [Docusaurus](https://docusaurus.io/).

## Where content goes

| Page      | URL          | Edit this                     |
| --------- | ------------ | ----------------------------- |
| Homepage  | `/`          | `src/pages/index.js`          |
| About     | `/about`     | `src/pages/about.md`          |
| CV        | `/cv`        | `cv/cv.md`                    |
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

The site opens at <http://localhost:3000> and reloads as you edit.

## Build

```bash
npm run build
```

The static site is written to `build/`.

## Quality checks

Every push to a branch runs automated checks in GitHub Actions
(`.github/workflows/ci.yml`), opens a pull request if needed, and comments
when it's ready to merge. Merging into `main` deploys the site to GitHub Pages
(`.github/workflows/deploy.yml`).

To run the Markdown and spelling checks locally:

```bash
npm run lint
```

If a real word is flagged as misspelled, add it to the `words` list in
`cspell.json`.

To run the accessibility check locally (requires Google Chrome):

```bash
npm run build
npm run test:a11y
```

It tests every page in the sitemap against WCAG 2.1 AA. Settings are in
`.pa11yci.json`.
