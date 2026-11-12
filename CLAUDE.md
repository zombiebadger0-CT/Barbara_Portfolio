# CLAUDE.md

Guidance for Claude Code when working in this repository.

## About the user

- The user is a **technical writer, not a software engineer**.
- Give instructions that are **detailed and easy to follow**:
  - Number the steps and do one thing per step.
  - Show the exact command to run and say where to run it (for example, "in the VS Code terminal, from the project folder").
  - Explain briefly what each command does and what a successful result looks like.
  - Define technical terms the first time you use them (for example, "branch", "pull request", "CI").
  - Say what to do if something goes wrong.

## Purpose of this project

- This repository is a **Docusaurus portfolio website**.
- The goal is a working, publicly hosted site that the user can link to from their resume and share with recruiters during a job search.
- Everything on the site should look polished and professional, because recruiters and hiring managers will see it.

## What the portfolio should showcase

- The user wants to show that they can use **Claude Code to build docs-as-code pipelines**.
- Help build and document that pipeline, including:
  - **Code review**: setting up pull requests and review requests properly (for example, PR templates and branch protection).
  - **Testing**: automated checks such as build checks, broken-link checks, prose and style linting (for example, Vale or markdownlint), and spell checking.
  - **CI/CD**: automated workflows (for example, GitHub Actions) that run the checks and deploy the site.

## Be proactive with suggestions

- The user will not always know what to ask for, or that something is missing.
- **Suggest next steps and point out gaps** (for example, missing tests, missing deployment, accessibility issues, broken links, or portfolio content that would impress recruiters).
- When you suggest something, explain why it matters for a docs-as-code portfolio, then ask before making large changes.
