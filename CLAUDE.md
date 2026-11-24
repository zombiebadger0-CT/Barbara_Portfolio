# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Purpose of this project

- This repository is a **Docusaurus portfolio website**.
- The goal is a working, publicly hosted site that the user can link to from their resume and share with recruiters during a job search.
- Everything on the site should look polished and professional, because recruiters and hiring managers will see it.
- **Hosting:** the site will be hosted on **GitHub Pages**. Docusaurus builds the site, and GitHub Pages publishes it online.

## What the portfolio should showcase

- The user wants to show that they can use **Claude Code to build docs-as-code pipelines**.
- Help build and document that pipeline, including:
  - **Code review**: setting up pull requests and review requests properly (for example, PR templates and branch protection).
  - **Testing**: automated checks such as build checks, broken-link checks, prose and style linting (for example, Vale or markdownlint), and spell checking.
  - **CI/CD**: automated workflows (for example, GitHub Actions) that run the checks and deploy the site.

## Writing style: sentence-case headings

- All content follows the **Google developer documentation style guide**, which Vale enforces in CI.
- **Headings and titles always use sentence case**: capitalize only the first word and proper nouns (for example, "Print documentation for clinical robotics", not "Print Documentation for Clinical Robotics").
- **Automatically correct heading case** whenever you create or edit content, even if the user writes a heading in title case or all caps. Don't ask first; fix it and mention the change.
- This applies to:
  - Markdown headings (`#`, `##`, `###`, and so on).
  - Frontmatter `title:` and `sidebar_label:` values. Vale doesn't check these, so fix them by hand.
  - Headings and card titles in React pages and components (for example, `src/pages/index.js`).
- Keep proper nouns capitalized (names, companies, products such as GitHub, Docusaurus, Pfizer). If Vale flags a proper noun, add it to `.github/styles/config/vocabularies/Portfolio/accept.txt` instead of lowercasing it.
