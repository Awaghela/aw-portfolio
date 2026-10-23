# Aayushi Waghela — Portfolio

A creative, interactive software engineering portfolio built with **React, TypeScript, and Vite**, featuring animated transitions, colorful folder layouts, and responsive design.

## Features

- **Interactive Hero:** Animated introduction with a flippable access pass.
- **Full-Screen Navigation:** Scroll up/down or use the navbar to navigate between sections.
- **About:** Personal introduction with a notebook-inspired layout.
- **Experience:** Interactive binder featuring work experience, education, and skills.
- **Projects:** Swipeable deck of five featured projects and a GitHub exploration card.
- **Research:** Animated Research Observatory showcasing three published papers.
- **Contact:** Interactive contact section with social links.
- **Case Studies:** Detailed project pages at `/projects/:slug`.
- **Mobile Responsive:** Adapted layouts for phones, tablets, and desktops.
- **Command Palette:** `⌘K` / `Ctrl+K` for quick navigation.

## Tech Stack

React · TypeScript · Vite · CSS · React Router

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL displayed in your terminal.

```bash
npm run lint
npm run build
```

## Design

An ivory-and-plum theme with pastel folder sections:

- **About:** Lavender
- **Experience:** Sage green
- **Projects:** Powder blue
- **Research:** Soft peach
- **Contact:** Dark ink

Typography: Anton, Fraunces, IBM Plex Mono, Inter, and Caveat.

## Project Structure

- `src/data/resume.ts` — Portfolio content and project links
- `src/data/projectDetails.ts` — Detailed project case studies
- `src/sections/` — Portfolio sections
- `src/components/` — Shared UI components
- `src/portfolioFixed.css` — Fixed-screen layout and transitions
- `src/portfolioMobile.css` — Mobile and tablet styling

## Deployment

Built for Vercel with SPA route rewrites in `vercel.json`.

Add your résumé to `public/resume.pdf` before deployment.

---