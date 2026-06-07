# Anthime Portfolio

**A responsive, animated portfolio website for Anthime Willmann.**

This is a personal portfolio website built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. It presents Anthime Willmann as a Computer Science student at CAU Kiel, with sections for profile, about/showreel, projects, design work, and contact links.

## Features

- Responsive single-page portfolio
- Hero section with portrait and intro text
- Scroll-based showreel animation
- Project card section
- Design showcase section
- Contact footer with email, LinkedIn, and GitHub links
- Reduced-motion support
- Static pre-rendering with Next.js App Router
- Strict TypeScript configuration

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 15 |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Font | Geist |
| Build | npm, Next.js Build |

## Architecture

The site is a monolithic Next.js App Router frontend with one statically pre-rendered route.

```text
app/page.tsx
   |
   +-- Hero
   +-- AboutShowreel
   +-- Projects
   +-- PinkBand
   +-- ContactFooter
```

Client components handle animation, scroll progress, viewport measurement, reduced-motion behavior, and video fallback logic. There is no backend, database, authentication, CMS, or application API.

## Project Structure

```text
app/
  layout.tsx        Root layout, metadata, font setup
  page.tsx          Page composition
  globals.css       Global styles

components/
  hero.tsx          Hero profile section
  about-showreel.tsx About text and showreel animation
  projects.tsx      Project cards
  pink-band.tsx     Design section animation
  contact-footer.tsx Contact links

public/
  anthime-portrait.png
```

## Getting Started

### Requirements

- Node.js compatible with Next.js 15
- npm

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
| `npm run lint` | Currently not fully configured |

## Current Status

Verified on June 7, 2026:

```text
npm run build: passing
npx tsc --noEmit: passing
/: statically pre-rendered
```

Known gaps:

- `public/showreel.mp4` is referenced but missing
- project cards currently use placeholder content
- design section currently uses a placeholder media area
- no tests
- no CI/CD pipeline
- no completed ESLint setup
- no license file
- no deployment configuration

## Roadmap

- Add real project case studies
- Add project images and links
- Add the missing showreel video or remove the video reference
- Replace the design placeholder with real media
- Add Open Graph metadata and social preview image
- Add favicon, sitemap, and robots.txt
- Configure ESLint and formatting
- Add CI for type-checking and build verification
- Define deployment target
- Add license file

## Contact

- Email: anthime.willmann@gmail.com
- GitHub: [anthimewillmann](https://github.com/anthimewillmann)
- LinkedIn: linked from the website footer

## License

No license file is currently present in the repository.
