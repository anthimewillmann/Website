# Anthime Portfolio

**A responsive, animated portfolio website for Anthime Willmann.**

This personal portfolio is built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. It presents Anthime Willmann as a Computer Science student at CAU Kiel, with an introduction, a design philosophy section, four featured projects with dedicated galleries, a design showcase, and contact links.

[Visit the portfolio](https://anthimewillmann.vercel.app)

## Features

- Responsive homepage with portrait, introduction, and an animated SVG in the About section
- Four project detail pages generated from shared project data
- Scroll-driven horizontal project galleries on larger screens and vertical galleries on mobile
- Return to the project overview with a further downward scroll gesture at the end of a gallery, with scroll-position handling
- Vertical project galleries for visitors who prefer reduced motion, plus reduced-motion handling for the About SVG
- Five design images with a click-to-enlarge overlay
- Automatic light and dark themes based on the system preference
- Contact footer with email, LinkedIn, and GitHub links
- Site and project metadata, canonical URLs, Open Graph tags, and site-level Twitter metadata
- SVG app icon, generated sitemap and robots.txt, WebSite structured data, and Google site verification
- Static pre-rendering with the Next.js App Router
- Strict TypeScript configuration

## Featured Projects

Project descriptions, external links, preview images, and gallery order are maintained in `lib/projects.ts`.

| Project | Portfolio route | Description | External destination |
|---|---|---|---|
| Culinaro | `/projects/culinaro` | AI-powered iOS recipe manager with recipe generation, OCR scanning, and guided cooking | App Store |
| Sumari | `/projects/sumari` | Safari extension for AI-powered webpage summaries and follow-up questions using Apple Foundation Models | App Store |
| Kiel Traffic Analysis | `/projects/kiel-traffic-analysis` | Data science project exploring personal traffic around Kiel over five years | Streamlit app |
| Labyrinth | `/projects/labyrinth` | Java Swing maze game with difficulty modes, keyboard controls, and Dijkstra-based pursuers | GitHub |

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 15 |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4, PostCSS |
| Animation | Framer Motion |
| Font | Geist |
| Build | npm, Next.js Build |

## Architecture

The site is a Next.js App Router frontend with a statically pre-rendered homepage and four project pages. `lib/projects.ts` supplies the homepage cards, project routes, galleries, project metadata, and sitemap entries. Unknown project slugs return a 404.

```text
app/page.tsx
   |
   +-- ScrollToHash
   +-- Hero
   +-- About
   +-- Projects
   +-- Designs
   +-- ContactFooter

app/projects/[slug]/page.tsx
   |
   +-- ProjectScene
```

Client components handle animation, gallery scrolling, viewport measurement, reduced-motion behavior, image-error fallbacks, design previews, and navigation back to the project overview. There is no application backend, database, authentication, CMS, or application API.

## Project Structure

```text
app/
  layout.tsx                  Root layout, site metadata, structured data, font
  page.tsx                    Homepage composition
  globals.css                 Global styles and light/dark theme variables
  icon.svg                    App icon
  robots.ts                   Generated robots.txt
  sitemap.ts                  Generated sitemap.xml
  projects/[slug]/
    page.tsx                  Static project routes and project metadata
    not-found.tsx             Project not-found view

components/
  hero.tsx                    Portrait and introduction
  about.tsx                   Design philosophy and scroll-drawn SVG
  projects.tsx                Project overview cards
  project-scene.tsx           Responsive project galleries and navigation
  designs.tsx                 Design collage and enlarged-image overlay
  scroll-to-hash.tsx          Homepage anchor and return-scroll handling
  contact-footer.tsx          Contact links

lib/
  projects.ts                 Shared project data and lookup helper

public/
  anthime-portrait.png         Portrait
  1.jpg ... 5.jpg              Design showcase images
  ...                         Project previews and gallery screenshots
```

## Getting Started

### Requirements

- Node.js compatible with Next.js 15 (verified locally with Node.js 24.18.1)
- npm

No environment variables or external services are required to run the portfolio locally.

### Install

```bash
git clone https://github.com/anthimewillmann/Website.git
cd Website
npm ci
```

### Development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## Available Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build production app |
| `npm run start` | Start production server |
| `npm run lint` | Invokes `next lint`; ESLint is not configured yet |
| `npx tsc --noEmit` | Check TypeScript types without emitting JavaScript |

Run `npm run build` before `npm run start`. TypeScript also includes generated route types from `.next/types`, which the build creates.

## Updating Content

- **Projects:** Edit `lib/projects.ts`. Each entry defines a unique slug, name, description, external URL and link label, preview image, and ordered gallery. Optional `portrait` and `overviewImageWidth` fields control image presentation. New entries automatically receive a detail route and sitemap entry on the next build.
- **Images:** Add files to `public/` and reference them with root-relative paths such as `/culinaro-recipes.png`. Paths and filename capitalization must match exactly.
- **Designs:** Update the `designFiles` array in `components/designs.tsx` and its image placement classes.
- **Profile and contact:** Edit `components/hero.tsx`, `components/about.tsx`, and `components/contact-footer.tsx`.
- **Theme:** Update the CSS variables in `app/globals.css`.

## Deployment

The configured public URL is `https://anthimewillmann.vercel.app`. The project uses the standard Next.js build and can be deployed to Vercel or served with `npm run build` followed by `npm run start` on a Node.js host. It is not configured as a static export.

When changing the public domain, update the metadata base URL and structured-data URL in `app/layout.tsx`, plus the `siteUrl` constants in `app/sitemap.ts` and `app/robots.ts`. Review the Google site-verification value in `app/layout.tsx` when deploying under a different owner or domain.

## Current Status

Verified locally on October 17, 2026:

```text
npm run build: passing
npx tsc --noEmit: passing
/: statically pre-rendered
/projects/culinaro: statically generated
/projects/sumari: statically generated
/projects/kiel-traffic-analysis: statically generated
/projects/labyrinth: statically generated
/robots.txt and /sitemap.xml: generated
```

Remaining gaps:

- `npm run lint` opens the ESLint setup prompt instead of running a configured lint check; the installed Next.js version also marks `next lint` as deprecated.
- No automated test suite or CI workflow is checked into the repository.
- No dedicated homepage social-preview image is configured; project Open Graph metadata uses each project's preview image.
- No license file is present.

## Contact

- Email: anthime.willmann@gmail.com
- GitHub: [anthimewillmann](https://github.com/anthimewillmann)
- LinkedIn: [Anthime Willmann](https://www.linkedin.com/in/anthime-willmann-5901992b9)

## License

No license file is currently present in the repository.
