# Estudios Estrada Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and prepare for publication a fast, elegant, service-led website for Estudios Estrada that turns visitors into qualified WhatsApp availability inquiries.

**Architecture:** Use Astro's static-first rendering with strict TypeScript, Tailwind CSS for the responsive design system, typed central content modules, small reusable Astro components, and isolated progressive-enhancement scripts for motion and the contact flow. Keep all five routes buildable without JavaScript, use no backend or database, and validate production contact/domain values before deployment.

**Tech Stack:** Astro, TypeScript, Tailwind CSS, Vitest, Playwright, ESLint, Prettier, GitHub Actions, Cloudflare Pages.

**Spec:** [2026-09-25-estudios-estrada-website-design.md](../specs/2026-09-25-estudios-estrada-website-design.md)

## Global Constraints

- Preserve the supplied logo source files; copy selected variants into the project without editing the originals.
- The navigation exposes exactly five routes: Inicio, Fotografía profesional, Eventos y video, Quiénes somos, and Contacto.
- Do not add a portfolio route, automated quotation calculator, checkout, booking calendar, CMS, database, or authentication.
- Do not invent prices, years of experience, customer counts, awards, certifications, delivery times, addresses, or testimonials.
- Treat phone, WhatsApp, email, social URLs, service area, final domain, and production media as unverified until the owner supplies them.
- One central configuration module owns business/contact data; components must not hard-code contact values.
- The production validator must fail closed when required domain/contact values remain placeholders.
- All primary information and navigation must remain usable without client-side JavaScript.
- Motion uses opacity and transforms, never hides essential content permanently, and becomes static under `prefers-reduced-motion: reduce`.
- The form never persists or sends personal data to a site-owned backend; it validates locally and opens a WhatsApp message.
- Use company-owned or explicitly licensed media only. Placeholder media must be clearly identified and removed by the production validator.
- Use semantic HTML, visible focus states, AA contrast, labeled fields, explicit error messages, and Spanish interface copy.
- Use `npm` and commit the generated lockfile. Run on Node.js 20 or newer unless Cloudflare's current supported runtime requires a newer LTS at implementation time.
- Use the official current stable integration path for Astro and Tailwind at implementation time and record the resulting package versions in `package-lock.json`.

## Review Focus

The implementation reviewer must explicitly inspect these high-risk areas:

1. Missing or malformed WhatsApp configuration must never generate a broken or misleading production CTA.
2. Names, accents, ampersands, dates, and multiline messages must survive URL construction without truncation or double encoding.
3. Reduced-motion mode must stop the continuous film rail and reveal all content immediately.
4. Optional contact channels and media must disappear cleanly without broken links, empty wrappers, layout shift, or build failure.
5. Mobile navigation and form errors must work with keyboard focus, screen readers, narrow viewports, and JavaScript disabled where applicable.

---

## Task 1: Scaffold the Astro workspace and quality gates

**Files:**

- Create: `package.json`
- Create: `package-lock.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `.prettierrc.mjs`
- Create: `.prettierignore`
- Create: `.gitignore`
- Create: `.nvmrc`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/env.d.ts`
- Create: `src/pages/index.astro`
- Create: `tests/smoke/project-config.test.ts`

**Interfaces:**

- Consumes: Node.js/npm available in the workspace.
- Produces: `npm run dev`, `npm run build`, `npm run check`, `npm run lint`, `npm run format:check`, `npm run test:unit`, and `npm run test:e2e` scripts.
- Produces: an Astro static build in `dist/`, with the Tailwind integration enabled.

- [ ] Create the minimum npm manifest and install Astro, the official sitemap integration, Tailwind through the current official Astro-compatible integration, TypeScript, Vitest, Playwright, ESLint, and Prettier. Commit `package-lock.json`.
- [ ] Write `tests/smoke/project-config.test.ts` first. Assert that `package.json` contains all required scripts, `astro.config.mjs` uses static output and sitemap support, and `tsconfig.json` extends Astro's strict configuration.
- [ ] Run `npm run test:unit -- tests/smoke/project-config.test.ts` and confirm it fails because configuration files/scripts are incomplete.
- [ ] Add the minimal configuration required by the test. Keep `src/pages/index.astro` to a semantic temporary shell only; do not design the page in this task.
- [ ] Run `npm run test:unit -- tests/smoke/project-config.test.ts` and confirm it passes.
- [ ] Run `npm run check`, `npm run lint`, `npm run format:check`, and `npm run build`; resolve configuration errors without adding product features.
- [ ] Commit with `chore: scaffold Astro website and quality gates`.

## Task 2: Define typed company content and production configuration

**Files:**

- Create: `.env.example`
- Create: `src/content/types.ts`
- Create: `src/content/site.ts`
- Create: `src/content/services.ts`
- Create: `src/content/pages.ts`
- Create: `src/lib/config.ts`
- Create: `scripts/validate-production-config.mjs`
- Create: `tests/unit/content.test.ts`
- Create: `tests/unit/production-config.test.ts`

**Interfaces:**

- Consumes: `PUBLIC_SITE_URL`, `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_PHONE`, `PUBLIC_EMAIL`, `PUBLIC_INSTAGRAM_URL`, `PUBLIC_FACEBOOK_URL`, and `PUBLIC_SERVICE_AREA`.
- Produces: `SiteConfig`, `NavigationItem`, `ContactChannel`, `ServiceSummary`, `ServiceDetail`, `PageSeo`, and `CompanyPrinciple` types.
- Produces: `siteConfig`, `navigation`, `services`, and `pageSeo` typed exports.
- Produces: `npm run validate:production`, which exits nonzero when the public URL, WhatsApp number, approved media state, or privacy confirmation is missing for production.

- [ ] Write `tests/unit/content.test.ts` first. Assert that navigation has the five approved routes in order, every internal link targets one of them or an in-page anchor, every service has nonempty benefit-led Spanish copy, and no navigation/page title includes `portafolio` or `cotizador`.
- [ ] Write `tests/unit/production-config.test.ts` first. Exercise the validator as a pure imported function with missing values, malformed URLs, malformed E.164 phone input, placeholder media, and complete valid configuration.
- [ ] Run the two tests and confirm they fail because the types, content, and validator do not exist.
- [ ] Implement the minimum typed models and centralized Spanish content. Use optional fields for unverified channels and omit them from normalized output.
- [ ] Implement the production validator with explicit actionable errors. Add `PUBLIC_MEDIA_APPROVED=false` and `PUBLIC_PRIVACY_NOTICE_APPROVED=false` to `.env.example`; production must require both to be `true`.
- [ ] Add the `validate:production` npm script without running it as part of ordinary local builds.
- [ ] Run `npm run test:unit -- tests/unit/content.test.ts tests/unit/production-config.test.ts` and confirm they pass.
- [ ] Run `npm run check` and `npm run build`.
- [ ] Commit with `feat: add typed site content and production validation`.

## Task 3: Integrate brand assets and the global visual system

**Files:**

- Copy: `C:/Users/rayor/Downloads/Imagen de ChatGPT 25 sept 2026, 10_20_32 p.m..png` to `src/assets/brand/logo-dark-amber.png`
- Copy: `C:/Users/rayor/Downloads/Imagen de ChatGPT 25 sept 2026, 10_24_59 p.m..png` to `src/assets/brand/logo-dark.png`
- Copy: `C:/Users/rayor/Downloads/Imagen de ChatGPT 25 sept 2026, 10_30_08 p.m..png` to `src/assets/brand/logo-gold.png`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/styles/motion.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/ui/BrandLogo.astro`
- Create: `src/components/ui/ButtonLink.astro`
- Create: `src/components/ui/SectionHeading.astro`
- Create: `src/components/ui/ResponsiveMedia.astro`
- Create: `tests/unit/brand-assets.test.ts`

**Interfaces:**

- `BaseLayout.astro` props: `{ title: string; description: string; canonicalPath: string; image?: ImageMetadata; bodyClass?: string }`.
- `BrandLogo.astro` props: `{ variant: 'gold' | 'dark' | 'dark-amber'; priority?: boolean; class?: string }`.
- `ButtonLink.astro` props: `{ href: string; variant?: 'primary' | 'secondary' | 'text'; external?: boolean; class?: string }` plus the default slot.
- `ResponsiveMedia.astro` props: a discriminated union for an Astro image or video poster, with required dimensions/alt semantics.

- [ ] Inspect the three source logos at original resolution before copying; record their dimensions and transparency status in the brand-assets test fixture.
- [ ] Write `tests/unit/brand-assets.test.ts` first. Assert all expected logo files exist, exceed the minimum display dimensions, and the selected gold/dark assets include transparency or are explicitly marked for background treatment.
- [ ] Run the test and confirm it fails because project assets are absent.
- [ ] Copy the assets without modifying the Downloads originals. If a provided file lacks usable transparency, preserve it and implement its background treatment in `BrandLogo.astro` instead of destructively altering it.
- [ ] Define charcoal, ivory, gold, amber, neutral, focus, spacing, radius, shadow, typography, container, and z-index tokens. Use solid accessible colors for text/controls; metallic gradients remain decorative.
- [ ] Implement semantic base styles, font fallbacks, focus-visible treatment, responsive type scaling, and reduced-motion defaults.
- [ ] Implement the four primitives and `BaseLayout.astro`; add a skip link, semantic landmarks, shared metadata slots, and global stylesheet imports.
- [ ] Run the brand test, `npm run check`, and `npm run build`.
- [ ] Commit with `feat: establish Estudios Estrada brand system`.

## Task 4: Build the shared header, footer, and availability CTA behavior

**Files:**

- Create: `src/lib/whatsapp.ts`
- Create: `src/components/layout/Header.astro`
- Create: `src/components/layout/MobileNavigation.astro`
- Create: `src/components/layout/Footer.astro`
- Create: `src/components/ui/AvailabilityLink.astro`
- Create: `src/scripts/header.ts`
- Create: `tests/unit/whatsapp.test.ts`
- Create: `tests/e2e/navigation.spec.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**

- `AvailabilityInquiry`: `{ name?: string; service?: 'fotografia' | 'evento-video' | 'otro'; eventDate?: string; message?: string }`.
- `buildAvailabilityMessage(inquiry: AvailabilityInquiry): string` returns readable Spanish lines without URL encoding.
- `buildWhatsAppUrl(phoneE164: string, inquiry: AvailabilityInquiry): string | null` returns `null` for invalid/unconfigured numbers and one encoded `https://wa.me/` URL otherwise.
- `AvailabilityLink.astro` props: `{ inquiry?: AvailabilityInquiry; placement: 'header' | 'page' | 'footer'; class?: string }`.

- [ ] Write `tests/unit/whatsapp.test.ts` first. Cover an empty introductory inquiry, all fields, accented names, ampersands, multiline text, phone punctuation, invalid/missing numbers, and exactly-once URL encoding.
- [ ] Run the test and confirm it fails because the helper does not exist.
- [ ] Implement the pure message and URL helpers. Never concatenate untrusted text after encoding and never render a `wa.me` URL when validation returns `null`.
- [ ] Implement the header, accessible mobile menu button/dialog region, active route state, footer, and availability link. When WhatsApp is unconfigured, route the CTA to `/contacto` and label it honestly instead of rendering a broken external link.
- [ ] Add progressive header behavior: sticky background transition after scroll, escape-to-close, focus return, and menu close after navigation. The base navigation remains visible/usable in a no-JavaScript fallback.
- [ ] Write `tests/e2e/navigation.spec.ts` to assert the five routes, active state, keyboard open/close/focus return, fallback contact CTA, no horizontal overflow at 320px, and sticky header class after scrolling.
- [ ] Run the unit test, `npm run check`, and `npm run build`. Defer the browser spec execution until the Playwright server fixture is active in Task 10, but ensure it type-checks.
- [ ] Commit with `feat: add responsive navigation and availability CTA`.

## Task 5: Implement the accessible motion system and home page

**Files:**

- Create: `src/components/motion/Reveal.astro`
- Create: `src/components/motion/FilmRail.astro`
- Create: `src/scripts/reveal.ts`
- Create: `src/components/sections/home/HomeHero.astro`
- Create: `src/components/sections/home/CompanyIntroduction.astro`
- Create: `src/components/sections/home/ServiceChoices.astro`
- Create: `src/components/sections/home/Reasons.astro`
- Create: `src/components/sections/home/CompanyPreview.astro`
- Create: `src/components/sections/shared/ClosingCta.astro`
- Create: `tests/unit/motion-markup.test.ts`
- Create: `tests/e2e/home.spec.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**

- `Reveal.astro` props: `{ as?: keyof HTMLElementTagNameMap; delay?: 0 | 80 | 160 | 240; distance?: 'small' | 'medium'; class?: string }`.
- `FilmRail.astro` props: `{ items: readonly MediaItem[]; label: string; speed?: 'slow' | 'medium' }`.
- `ClosingCta.astro` props: `{ title: string; body: string; inquiry?: AvailabilityInquiry; tone?: 'dark' | 'light' }`.

- [ ] Write `tests/unit/motion-markup.test.ts` first. Render representative markup and assert essential content is present before enhancement, reveal elements default to visible, duplicate film-rail items are `aria-hidden`, and no interaction depends on animation completion.
- [ ] Run the test and confirm it fails because motion components do not exist.
- [ ] Implement `Reveal.astro` and the IntersectionObserver enhancement. Add an explicit no-JavaScript path and unobserve nodes after their first reveal.
- [ ] Implement a restrained CSS-driven film rail using duplicate decorative items only for the loop. Pause it on hover/focus and fully stop it under reduced motion.
- [ ] Build the six home sections from centralized content. Position Estudios Estrada as a company; avoid portfolio/job-seeking language and unverified claims.
- [ ] Compose the final home page in `src/pages/index.astro` with one `h1`, contextual service imagery slots, CTA hierarchy, and no monolithic page-level styling.
- [ ] Write `tests/e2e/home.spec.ts` for hero meaning, service destinations, one visible primary CTA, no hidden content when scripts are blocked, reduced-motion computed animation state, and mobile/desktop section order.
- [ ] Run the unit test, `npm run check`, and `npm run build`.
- [ ] Commit with `feat: build animated service-led home page`.

## Task 6: Build the photography service page

**Files:**

- Create: `src/components/sections/services/ServiceHero.astro`
- Create: `src/components/sections/services/ServiceCategoryGrid.astro`
- Create: `src/components/sections/services/ServiceCategory.astro`
- Create: `src/components/sections/services/ServiceProcess.astro`
- Create: `src/pages/fotografia-profesional.astro`
- Create: `tests/unit/photography-content.test.ts`
- Create: `tests/e2e/photography.spec.ts`

**Interfaces:**

- `ServiceHero.astro` props: `{ eyebrow: string; title: string; introduction: string; media?: MediaItem; inquiry: AvailabilityInquiry }`.
- `ServiceCategory.astro` props: `{ category: ServiceCategoryContent; index: number }`.
- Consumes: `photographyService` from `src/content/services.ts`.

- [ ] Write `tests/unit/photography-content.test.ts` first. Assert the approved categories exist: personal/family/group portraits, professional/corporate portraits, studio/location sessions, product/brand photography, and custom sessions.
- [ ] Run the test and confirm it fails if the photography model is incomplete.
- [ ] Complete the typed photography content with outcome-led descriptions and explicit image alt text requirements. Mark missing production media as placeholders for the production gate.
- [ ] Implement reusable service components and compose the photography page. Place examples inside the service narrative; do not introduce a gallery/portfolio route.
- [ ] Add the closing availability CTA and a secondary link to Contacto.
- [ ] Write `tests/e2e/photography.spec.ts` for heading hierarchy, category presence, contextual media, CTA destination, keyboard order, and absence of a portfolio navigation item.
- [ ] Run the unit test, `npm run check`, and `npm run build`.
- [ ] Commit with `feat: add professional photography service page`.

## Task 7: Build events/video and company pages

**Files:**

- Create: `src/components/sections/services/CapabilitySplit.astro`
- Create: `src/components/sections/services/EventTypes.astro`
- Create: `src/components/sections/about/CompanyStatement.astro`
- Create: `src/components/sections/about/Principles.astro`
- Create: `src/components/sections/about/TeamCapabilities.astro`
- Create: `src/components/sections/about/WorkingProcess.astro`
- Create: `src/pages/eventos-y-video.astro`
- Create: `src/pages/quienes-somos.astro`
- Create: `tests/unit/company-content.test.ts`
- Create: `tests/e2e/services-about.spec.ts`

**Interfaces:**

- `CapabilitySplit.astro` props: `{ capabilities: readonly CapabilityContent[] }`.
- `WorkingProcess.astro` props: `{ steps: readonly ProcessStep[] }`.
- Consumes: `eventVideoService`, `companyPrinciples`, `teamCapabilities`, and `workingProcess` from typed content modules.

- [ ] Write `tests/unit/company-content.test.ts` first. Assert events and video are distinct capabilities, examples include social/corporate/institutional contexts without claiming exclusivity, and the company process is exactly planning, capture, editing, and delivery.
- [ ] Add assertions rejecting unverified numeric claims, testimonials, guarantees, and first-person freelancer/job-seeking language.
- [ ] Run the test and confirm it fails while the content model is incomplete.
- [ ] Complete the event/video and company content using factual, company-level Spanish copy.
- [ ] Implement and compose both routes from focused sections. Reuse service primitives instead of duplicating markup.
- [ ] Add availability CTA context so WhatsApp distinguishes event/video from general photography inquiries.
- [ ] Write `tests/e2e/services-about.spec.ts` for both URLs, key capability/process content, CTA context, mobile order, and page-level heading hierarchy.
- [ ] Run the unit test, `npm run check`, and `npm run build`.
- [ ] Commit with `feat: add events video and company pages`.

## Task 8: Build contact flow and inline privacy notice

**Files:**

- Create: `src/lib/contact-validation.ts`
- Create: `src/components/forms/ContactForm.astro`
- Create: `src/components/sections/contact/ContactChannels.astro`
- Create: `src/components/sections/contact/PrivacyNotice.astro`
- Create: `src/scripts/contact-form.ts`
- Create: `src/pages/contacto.astro`
- Create: `tests/unit/contact-validation.test.ts`
- Create: `tests/e2e/contact.spec.ts`

**Interfaces:**

- `ContactFormValues`: `{ name: string; service: '' | 'fotografia' | 'evento-video' | 'otro'; eventDate: string; message: string; privacyAccepted: boolean }`.
- `ContactFormErrors`: partial record keyed by `ContactFormValues` fields.
- `validateContactForm(values: ContactFormValues, today: string): ContactFormErrors`.
- `toAvailabilityInquiry(values: ContactFormValues): AvailabilityInquiry`.
- `ContactChannels.astro` consumes normalized optional channel data and emits no empty list item.

- [ ] Write `tests/unit/contact-validation.test.ts` first. Cover blank required fields, optional date, an invalid/past date policy, whitespace normalization, privacy acceptance, Unicode/accents, multiline text, and conversion to an availability inquiry.
- [ ] Run the test and confirm it fails because validation does not exist.
- [ ] Implement the pure validation and conversion functions without DOM access.
- [ ] Build the contact route with visible direct channels, the short form, required-field cues, persistent user values after errors, a summary plus field-level errors, and an inline privacy notice at `#privacidad`.
- [ ] Implement progressive enhancement: native HTML constraints remain useful without JavaScript; with JavaScript, prevent submission only to validate, focus the first error, update an `aria-live` region, build the WhatsApp URL once, and open it after success.
- [ ] If WhatsApp is not configured, disable WhatsApp submission with a clear configuration message while leaving any verified phone/email channels usable. Never silently discard the form.
- [ ] Write `tests/e2e/contact.spec.ts` for empty/error/success flows, value preservation, exact decoded WhatsApp message, keyboard/error focus, optional-channel omission, and the privacy anchor.
- [ ] Run the unit test, `npm run check`, and `npm run build`.
- [ ] Commit with `feat: add validated WhatsApp contact flow`.

## Task 9: Add metadata, structured data, robots, sitemap, and Cloudflare headers

**Files:**

- Create: `src/lib/seo.ts`
- Create: `src/components/layout/SeoHead.astro`
- Create: `src/pages/404.astro`
- Create: `public/robots.txt`
- Create: `public/_headers`
- Create: `public/favicon.svg`
- Create: `tests/unit/seo.test.ts`
- Create: `tests/e2e/seo.spec.ts`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: all five route files

**Interfaces:**

- `buildCanonicalUrl(siteUrl: string, path: string): string`.
- `buildOrganizationJsonLd(config: SiteConfig): Record<string, unknown> | null` returns no structured data until required verified identity fields exist.
- `SeoHead.astro` props: `{ title: string; description: string; canonicalPath: string; image?: ImageMetadata; noIndex?: boolean }`.

- [ ] Write `tests/unit/seo.test.ts` first. Cover trailing slash normalization, canonical path joining, unique page titles/descriptions, valid absolute social image URLs, and omission of unverified local-business fields.
- [ ] Run the test and confirm it fails because the SEO helpers do not exist.
- [ ] Implement pure SEO helpers and the head component. Emit Organization JSON-LD only with verified name, canonical URL, logo URL, and at least one legitimate contact point; do not guess a street address or coordinates.
- [ ] Apply unique metadata to all five routes and `noindex` to the custom 404 page.
- [ ] Configure sitemap generation, a production robots file referencing the sitemap, favicon treatment derived from the mark, and Cloudflare headers for baseline security and sensible static-asset caching.
- [ ] Write `tests/e2e/seo.spec.ts` for unique title/description/canonical tags, one `h1`, valid internal links, robots/sitemap reachability, and 404 behavior.
- [ ] Run the unit test, `npm run check`, and `npm run build`; inspect the generated sitemap and representative HTML files in `dist/`.
- [ ] Commit with `feat: add SEO metadata and production web controls`.

## Task 10: Complete browser verification, CI, and Cloudflare handoff

**Files:**

- Create: `.github/workflows/ci.yml`
- Create: `wrangler.jsonc`
- Create: `README.md`
- Create: `docs/content-handoff.md`
- Create: `tests/e2e/accessibility-motion.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Modify: `playwright.config.ts`
- Modify: `package.json`
- Modify: `scripts/validate-production-config.mjs`

**Interfaces:**

- CI job sequence: install locked dependencies, format check, lint, Astro check, unit tests, production build, install Chromium, browser tests.
- Cloudflare build contract: `npm ci && npm run build`, output directory `dist`, Node LTS version documented, no server runtime or secrets required.
- Handoff checklist records exact unresolved values/media and refuses a custom-domain launch until each is verified.

- [ ] Finish Playwright configuration with a production-preview web server and deterministic desktop/mobile projects.
- [ ] Write `tests/e2e/accessibility-motion.spec.ts` to check skip-link focus, landmark/heading structure, labeled form controls, visible focus, keyboard navigation, no essential color-only meaning, and zero active continuous animation under reduced motion.
- [ ] Write `tests/e2e/responsive.spec.ts` at 320px, 768px, and 1440px for every route. Assert no document-level horizontal overflow, no clipped CTA, no unreadable logo placement, explicit media dimensions/aspect ratio, and stable header/footer composition.
- [ ] Run all existing E2E specs from Tasks 4–9 and fix only verified failures using the systematic-debugging skill if any appear.
- [ ] Add CI with dependency caching and uploaded Playwright artifacts only on failure.
- [ ] Add `wrangler.jsonc` with `pages_build_output_dir: "dist"` and no account-specific identifiers or secrets.
- [ ] Write `README.md` with local commands, environment configuration, content ownership, GitHub repository creation/push steps, and Cloudflare Pages setup/custom-domain steps.
- [ ] Write `docs/content-handoff.md` listing final domain, WhatsApp, phone, email, social URLs, service area, approved privacy text, and required company-owned photos/video/posters as explicit unchecked owner inputs.
- [ ] Run `npm run format:check`, `npm run lint`, `npm run check`, `npm run test:unit`, `npm run build`, and `npm run test:e2e`. Record the exact passing outputs in the implementation summary.
- [ ] Run `npm run validate:production` with intentionally incomplete `.env` and confirm it fails with actionable messages. When the owner has provided all real values, rerun with the production environment and require a pass before deployment.
- [ ] Start a local production preview and visually inspect every route on desktop and mobile, including reduced motion and JavaScript-disabled behavior.
- [ ] Commit with `chore: add CI Cloudflare configuration and handoff`.

## Task 11: Final review and publication readiness decision

**Files:**

- Review: all changed project files
- Modify only if findings require corrections: affected source/tests/docs

**Interfaces:**

- Consumes: the complete implementation, automated verification output, owner-supplied production values, and Cloudflare preview URL.
- Produces: one review report separating code-complete status from production-ready status.

- [ ] Invoke `superpowers:requesting-code-review` and ask the reviewer to evaluate spec compliance plus every item under Review Focus.
- [ ] Classify findings by severity and fix all critical/high findings before proceeding. Add regression tests for every behavioral correction.
- [ ] Re-run the full Task 10 verification suite after review fixes.
- [ ] Invoke `superpowers:verification-before-completion` before claiming the code is complete or tests pass.
- [ ] If GitHub authentication and the repository owner/name have been confirmed, create the new repository, set the remote, and push `main`. Do not guess the GitHub account or publish under an unintended owner.
- [ ] Configure the Cloudflare Pages project from the GitHub repository only when Cloudflare access/project ownership are confirmed. Use the documented build contract and obtain a preview URL.
- [ ] Review the Cloudflare preview on desktop/mobile and verify the real WhatsApp/contact flow. Connect the custom domain only after the production validator passes and the owner confirms the exact domain.
- [ ] Commit any review fixes with focused messages, then report one of: `code complete; awaiting verified business inputs`, `preview ready for owner review`, or `production published`.

## Definition of Done

- All five approved routes exist and are reachable from a consistent responsive navigation.
- The home page clearly presents Estudios Estrada as a photography and audiovisual company.
- Photography, events/video, company, and contact content match the approved scope without invented claims.
- The availability CTA and contact form create a correct, encoded WhatsApp inquiry or provide an honest fallback when unconfigured.
- The supplied logo is used legibly on dark and light surfaces; media is contextual rather than a standalone portfolio.
- Keyboard, narrow viewport, reduced-motion, no-JavaScript, missing-optional-data, and 404 paths are verified.
- Formatting, linting, Astro type checks, unit tests, build, and browser tests pass.
- GitHub/Cloudflare instructions are complete, and production publication remains gated by verified contact/domain/media/privacy inputs.
