# Warm Editorial Visual System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved warm editorial design across the existing Estudios Estrada site while preserving its modular architecture, content integrity, and behavior.

**Architecture:** Keep all page composition and content modules intact. Update shared design tokens and focused Astro components so global surfaces, home sections, and reusable calls to action share one coherent light editorial system; reserve the dark cinematic treatment for the final CTA.

**Tech Stack:** Astro 7, TypeScript, component-scoped CSS, Tailwind CSS 4, Vitest, Cloudflare Workers static assets

**Spec:** `docs/superpowers/specs/2026-09-26-warm-editorial-refresh.md`

## Global Constraints

- Use only supplied brand assets; do not invent portfolio photography.
- Keep the current five-route information architecture and typed content modules.
- Preserve accessible contrast, focus states, keyboard behavior, responsive behavior, and reduced motion.
- Keep the text-only animated film rail and the dark closing CTA.
- No new runtime dependencies.

## Review Focus

- Mobile header and menu must remain readable on light surfaces.
- Secondary buttons must retain visible borders on both light and dark surfaces.
- Decorative film perforations must not introduce horizontal overflow.
- Real logo variants must remain legible on their assigned surfaces.
- Existing service and availability links must remain unchanged and reachable.

---

### Task 1: Warm global shell

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`
- Modify: `src/components/layout/Header.astro`
- Modify: `src/components/layout/MobileNavigation.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/components/ui/ButtonLink.astro`

**Interfaces:**
- Consumes: existing CSS custom properties and `BrandLogo` variants.
- Produces: warm surface tokens and a light reusable shell used by every route.

- [ ] Establish warm paper, parchment, sepia, gold, ink, border, and shadow tokens without changing public component APIs.
- [ ] Convert header, mobile navigation, and footer to light editorial surfaces using the dark logo variant.
- [ ] Refine shared button states for reliable contrast on light and dark sections.
- [ ] Run `npm run test:unit` and confirm all existing behavior tests pass.

### Task 2: Editorial home composition

**Files:**
- Modify: `src/components/sections/home/HomeHero.astro`
- Modify: `src/components/sections/home/CompanyIntroduction.astro`
- Modify: `src/components/sections/home/ServiceChoices.astro`
- Modify: `src/components/sections/home/Reasons.astro`
- Modify: `src/components/sections/home/CompanyPreview.astro`
- Modify: `src/components/sections/shared/ClosingCta.astro`

**Interfaces:**
- Consumes: warm shell tokens from Task 1, existing content arrays, motion primitives, and real brand assets.
- Produces: a predominantly light home page with editorial film motifs and a limited dark closing section.

- [ ] Recompose the hero as a warm editorial spread with the real dark-amber logo and abstract film framing.
- [ ] Refine introduction, services, process, and company preview into distinct warm paper sections.
- [ ] Keep service links, semantic headings, reveal behavior, and the dark closing CTA intact.
- [ ] Run `npm run test:unit` and confirm all existing behavior tests pass.

### Task 3: Responsive visual verification and release checks

**Files:**
- Modify only files required to correct observed responsive or accessibility regressions.

**Interfaces:**
- Consumes: completed site from Tasks 1 and 2.
- Produces: verified desktop/mobile output and a production-ready build.

- [ ] Inspect the home and photography pages at desktop and mobile widths, including the mobile menu, service links, and closing CTA.
- [ ] Correct any overflow, contrast, or spacing regression found during visual inspection.
- [ ] Run `npm run test:unit`, `npm run check`, `npm run lint`, `npm run format:check`, `npm run build`, `npm run deploy -- --dry-run`, and `git diff --check`.
- [ ] Commit the complete refresh and push the approved branch to GitHub `main`.
