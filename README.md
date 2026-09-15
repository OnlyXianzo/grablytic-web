# Grablytic Web

Marketing + docs site for [Grablytic](https://github.com/OnlyXianzo/Grablytic) — private yt-dlp media downloader for Android, Linux & Windows. Live at <https://grablytic.vercel.app/>.

Static [Astro 5](https://astro.build) site (no SSR, pure HTML), deployed on Vercel. 7 pages: `/`, `/docs`, `/docs/install`, `/docs/faq`, `/docs/features`, `/docs/troubleshooting`, `/nightly`.

## Stack

- Astro 5 (static output) + Tailwind CSS v4 + GSAP (motion, deferred)
- `@astrojs/sitemap` (auto sitemap from `dist/`)
- Node ≥ 20. No framework JS on the client except scoped enhancement scripts.

## Develop

```bash
npm ci          # clean install (commit lockfile changes separately)
npm run dev     # local dev server
npm run build   # prebuild (GitHub snapshots) + static build to dist/
npm run preview # serve dist/ locally
```

### Prebuild snapshots (never fail the build)

`npm run prebuild` runs two fetchers that snapshot GitHub data into `src/data/`:

| Script | Source | Snapshot | On failure |
|---|---|---|---|
| `scripts/fetch-stats.mjs` | `api.github.com/repos/OnlyXianzo/Grablytic` + `/releases/latest` | `src/data/stats.json` (stars/forks/watchers/tag/binaries) | keep previous snapshot, warn |
| `scripts/fetch-nightly.mjs` | `releases?per_page=30` (nightly/rolling tag else latest prerelease) | `src/data/nightly.json` | keep previous snapshot, warn; empty-state snapshot when no nightly exists |

Rules: never commit `fetched_at`-only churn if you didn't mean to (revert `stats.json`/`nightly.json` noise); never let a fetcher `process.exit(1)` when a prior snapshot exists.

## Project layout

```
src/pages/            index.astro, nightly.astro, docs/{index,install,faq,features,troubleshooting}.astro
src/sections/         Nav, Hero, Showcase, Features, Downloads, Faq, Community, Footer (landing composer)
src/components/       ThemeToggle.astro (light/dark, localStorage + OS fallback)
src/data/             downloads.ts (v0.0.2 matrix: TAG/REL/REPO + SHA256/size per file),
                      features.ts (card copy + guideAnchor -> /docs/*),
                      faqs.ts, stats.json, nightly.json
src/lib/gsap.ts       hero/scroll/count-up/magnetic/accordion + dialog-close animation
src/styles/global.css DESIGN.md tokens (:root dark, [data-theme="light"]) + components
scripts/              fetch-stats.mjs, fetch-nightly.mjs, generate-screenshots.mjs
public/               logo.png, og-image.png (keep <300 KB), icons, manifest.webmanifest,
                      robots.txt, llms.txt, google*.html (Search Console — do not delete)
```

## Conventions (read before opening a PR)

1. **SEO per page:** every route needs unique `<title>` (50–60 chars), `description` (120–160), self `canonical`, OG/Twitter image tags, and matching JSON-LD (`SoftwareApplication` once on `/`, `FAQPage` where FAQs render, `BreadcrumbList` on docs/nightly). No `truestream` strings anywhere (`grep -ri truestream src public` must be empty).
2. **No dead-end links:** card/CTA links must land on content, never bare `#anchors` without a section. Feature `guideAnchor`s live in `src/data/features.ts`.
3. **Theme:** use CSS vars from `global.css`, never new hardcoded hexes; verify both `[data-theme]` values. Light tokens are canonical in app repo `DESIGN.md` §3.1.
4. **Nav discipline:** one line per link, no reformatting (parallel streams merge cleanly).
5. **Un-runnable commands are banned** from install copy unless labeled with live status (e.g. AUR/WinGet pending). If it can't be pasted today, it doesn't read as an instruction.
6. **Images:** screenshots as `.webp` + `width/height` + `loading="lazy"`; OG image ≤ 300 KB.
7. **Small branches, merge via `merge/web-*` batch or PR; `master` auto-deploys to Vercel.** Never commit `.vercel/`, `.env*`, or `stats.json`/`nightly.json` timestamp-only noise.

## Deployment

Vercel project linked to this repo (`master` = production). `vercel.json`: security headers, `max-age=0` HTML, immutable caching for `/_astro/*`, images, and `/shots/*`. After deploy: verify `curl -sI https://grablytic.vercel.app/og-image.png` shows `immutable`, sitemap lists all routes, Search Console sitemap pinged on new pages.

## Known gaps (see agy teardown 2026-09-15)

Hero stranger-line + `#how` section, light-mode `var()` pass for section hexes, shared FAQ source, image/size CI budgets, first nightly publisher, dialog focus management.
