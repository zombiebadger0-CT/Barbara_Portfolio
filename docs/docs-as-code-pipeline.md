---
title: Docs-as-code pipeline
description: How this site is reviewed, tested, and deployed automatically with GitHub Actions, built with Claude Code.
sidebar_position: 2
---

# Docs-as-code pipeline

This portfolio is built and published the same way engineering teams ship software. Every change goes through a pull request, runs automated quality checks, and deploys only after the checks pass. I built the pipeline with [Claude Code](https://claude.com/claude-code), an AI coding agent, working from VS Code.

All of the configuration is public in the [GitHub repository](https://github.com/zombiebadger0-CT/Barbara_Portfolio). You can see each automated run in the [Actions tab](https://github.com/zombiebadger0-CT/Barbara_Portfolio/actions) and the review history in [pull requests](https://github.com/zombiebadger0-CT/Barbara_Portfolio/pulls?q=is%3Apr).

## How a change moves through the pipeline

1. **Write on a branch.** I make changes on a separate branch, never directly on the live site's `main` branch.
2. **Push.** When I push the branch to GitHub, the [Docs checks workflow](https://github.com/zombiebadger0-CT/Barbara_Portfolio/blob/main/.github/workflows/ci.yml) starts automatically.
3. **Run checks in parallel.** Six checks run at the same time (see the next section).
4. **Open a pull request automatically.** If the branch doesn't have a pull request yet, the workflow opens one, using a [pull request template](https://github.com/zombiebadger0-CT/Barbara_Portfolio/blob/main/.github/pull_request_template.md) with a review checklist.
5. **Report status.** The workflow comments on the pull request with a table of results. It mentions me, so GitHub sends a notification that the change is ready to merge or needs fixes.
6. **Merge.** Branch protection blocks merging into `main` until every check passes.
7. **Deploy.** Merging starts the [deploy workflow](https://github.com/zombiebadger0-CT/Barbara_Portfolio/blob/main/.github/workflows/deploy.yml), which builds the site and publishes it to GitHub Pages at [barbaramorach.me](https://barbaramorach.me).

## Automated checks

| Check | Tool | What it catches |
| --- | --- | --- |
| Build and link check | [Docusaurus](https://docusaurus.io/) | Pages that fail to build, and broken internal links |
| Markdown lint | [markdownlint](https://github.com/DavidAnson/markdownlint) | Inconsistent Markdown formatting, such as heading levels and list spacing |
| Spell check | [CSpell](https://cspell.org/) | Typos, with a project dictionary for product names and proper nouns |
| Prose style | [Vale](https://vale.sh/) | Departures from the [Google developer documentation style guide](https://developers.google.com/style) |
| Old URL check | A [custom Node.js script](https://github.com/zombiebadger0-CT/Barbara_Portfolio/blob/main/scripts/check-old-urls.mjs) | Links to the site's old `github.io` address, left over from before it moved to its custom domain |
| Accessibility | [pa11y-ci](https://github.com/pa11y/pa11y-ci) with the [axe](https://github.com/dequelabs/axe-core) engine | Problems that fail [WCAG 2.1 level AA](https://www.w3.org/WAI/WCAG21/quickref/), such as low color contrast, links that look like plain text, and images without alt text. It opens every page in the site's sitemap in Chrome, so new pages are checked automatically. |

Each tool's configuration is tuned for a Docusaurus site. For example, markdownlint treats the front-matter title and the page heading as the same title, and Vale allows first-person writing ("I" and "my"), which suits a portfolio. Comments in each configuration file explain why each rule is changed.

## Why it matters

- **Quality at scale:** Automated checks catch routine errors, so human review can focus on accuracy and clarity.
- **Traceability:** Every change to the site has a pull request, a record of what was checked, and a timestamp.
- **Safe publishing:** Nothing reaches the live site until it passes the checks.
- **AI-assisted, human-reviewed:** Claude Code wrote and tuned the pipeline. I directed the work, reviewed each change, and merged it.
