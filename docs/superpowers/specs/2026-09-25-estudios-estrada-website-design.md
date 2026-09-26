# Estudios Estrada Website Design

**Date:** 2026-09-25  
**Status:** Conversational design approved; pending written-spec review  
**Product owner:** Estudios Estrada

## 1. Purpose

Build a public website for Estudios Estrada, a photography and audiovisual services company. The site must present the business as an organized provider with professional capabilities, not as an individual photographer seeking employment.

The experience will combine:

- the restrained, editorial presentation of The Portrait Station;
- the polished scroll reveals, continuous motion, and micro-interactions observed on Pixelero;
- an original Estudios Estrada identity based on the supplied film-strip monogram, charcoal black, ivory, and metallic gold.

The website's primary business outcome is to help prospective clients understand the company's services and begin a qualified conversation about availability. It is not an e-commerce store, an automated quotation engine, or a standalone portfolio.

## 2. Users and success criteria

### Primary users

- individuals and families planning social events or professional photography sessions;
- organizations requiring photography or video coverage for corporate events;
- brands requiring professional photography or audiovisual production.

### Primary user journey

1. Arrive from search, social media, a referral, or the domain.
2. Understand within the first screen that Estudios Estrada is a photography and audiovisual company.
3. Identify the relevant service category.
4. See representative work in the context of that service.
5. Open WhatsApp or the contact form to ask about availability.

### Success criteria

- The company positioning is clear without relying on the phrase "portfolio."
- Every page exposes one clear next action: consult availability.
- Visitors can reach photography, event/video, company, and contact information from the main navigation.
- The site is responsive, keyboard accessible, and usable with motion disabled.
- Images do not cause severe layout shifts and are delivered in modern optimized formats.
- A production build deploys successfully from GitHub to Cloudflare Pages.

## 3. Scope

### Included in the first release

- Five public routes.
- Responsive header, navigation, and footer.
- Photography and event/video service content.
- Contextual photography and video examples inside service pages.
- Company presentation and work process.
- WhatsApp availability CTA.
- Contact form that validates the inquiry and prepares a structured WhatsApp message.
- SEO metadata, social sharing image, sitemap, and robots configuration.
- Accessible animation system with reduced-motion support.
- GitHub source repository and Cloudflare Pages deployment configuration.

### Excluded from the first release

- Automated pricing or quotation calculator.
- Online payments, deposits, or checkout.
- Booking calendar or customer accounts.
- A separate portfolio route.
- Blog, CMS, or administrative dashboard.
- Invented claims such as years of experience, client counts, awards, or guaranteed delivery times.

These exclusions can be revisited only when the corresponding business process and verified content exist.

## 4. Information architecture

The site will contain five routes. No generic services overview or extra navigation item is required.

| Route | Navigation label | Responsibility |
| --- | --- | --- |
| `/` | Inicio | Establish company positioning and route visitors to the correct service. |
| `/fotografia-profesional` | Fotografía profesional | Explain professional photography services and show contextual examples. |
| `/eventos-y-video` | Eventos y video | Explain event coverage and audiovisual production. |
| `/quienes-somos` | Quiénes somos | Establish company credibility, philosophy, capabilities, and process. |
| `/contacto` | Contacto | Provide contact channels and collect an availability request. |

The persistent highlighted action is **Consultar disponibilidad**. It opens WhatsApp with a short prefilled message. Contact remains a separate route for users who prefer a form, email, phone, or social channel.

## 5. Page design

### 5.1 Inicio

The home page is compact and service-oriented.

1. **Hero**
   - Gold Estudios Estrada logo on a dark cinematic background.
   - Primary heading: "Fotografía y producción audiovisual para momentos que importan."
   - Supporting copy that identifies the company and its audience.
   - Primary action: Consultar disponibilidad.
   - Secondary action: Conocer servicios, scrolling to the service choices.
2. **Company introduction**
   - A short statement that Estudios Estrada provides professional photography and audiovisual coverage for people, events, businesses, and brands.
3. **Three service entries**
   - Fotografía profesional.
   - Cobertura de eventos.
   - Producción de video.
   - Each entry uses representative media, a concise benefit statement, and a "Más información" link to the appropriate service route.
4. **Reasons to choose Estudios Estrada**
   - Planning adapted to the project.
   - Professional capture and production.
   - Direct communication.
   - Careful editing and delivery.
   - Wording must remain factual and avoid unverified superlatives.
5. **Company preview**
   - A brief lead-in to Quiénes somos, focused on the team and its working method.
6. **Closing CTA**
   - Consultar disponibilidad via WhatsApp.

### 5.2 Fotografía profesional

This route groups related photography services without creating a page for every variation:

- personal, family, and group portraits;
- professional and corporate portraits;
- sessions in a studio or on location;
- product and brand photography;
- custom photography sessions.

Each category combines an outcome-focused description with representative images. The page ends with Consultar disponibilidad and a link to Contacto.

### 5.3 Eventos y video

This route presents two connected capabilities:

- photography coverage for social, corporate, and institutional events;
- professional event recording, interviews, promotional content, editing, and final video delivery.

Examples may mention weddings, XV celebrations, graduations, birthdays, conferences, and corporate events without implying the list is exhaustive. Scope, personnel, duration, location, and deliverables are confirmed in conversation rather than calculated automatically.

### 5.4 Quiénes somos

This route positions Estudios Estrada as a company. It contains:

- a concise company statement;
- philosophy and service principles;
- description of the human and technical team without unsupported claims;
- the four-step process: planning, capture, editing, and delivery;
- a final availability CTA.

If the owner later supplies verified history, names, dates, certifications, or measurable achievements, the content model will accept them without requiring a layout rewrite.

### 5.5 Contacto

The contact page provides:

- WhatsApp;
- phone;
- email;
- social media links;
- location or service area when confirmed;
- a short form containing name, event or service type, date when applicable, and message.

The form must explain required fields, preserve user input on validation errors, and show explicit validation feedback. After validation it composes a structured message and opens the verified company WhatsApp destination. No form data is persisted or transmitted to a site-owned server in the first release.

## 6. Brand and visual system

### Logo usage

- Use the supplied gold transparent mark on charcoal or dark photographic backgrounds.
- Use the supplied dark transparent mark on ivory or light backgrounds.
- Reserve the black-and-amber version for special editorial moments rather than primary navigation.
- Keep safe space around the mark and never place it where insufficient contrast makes the wordmark unreadable.

### Color direction

- Charcoal black: primary dark surface.
- Warm ivory: primary light surface.
- Metallic gold and amber: highlights, dividers, focus accents, and primary CTA treatment.
- Neutral gray: supporting text and borders.

Exact accessible color tokens will be derived from the supplied logo during implementation. Metallic gradients are decorative; all text and controls must retain accessible solid-color contrast.

### Typography

- A refined display face for selected headings.
- A highly legible sans-serif for navigation, body copy, forms, and controls.
- Typography will use self-hosted or privacy-compatible web fonts and avoid layout shifts.

### Layout

- Editorial compositions with large media, controlled whitespace, and alternating dark/light sections.
- Mobile-first responsive behavior.
- Content width and line length constrained for readability.
- Representative work appears inside the relevant service narrative, not in a separate portfolio grid.

## 7. Motion system

Motion provides polish without making the company appear theatrical or slowing access to information.

- Hero logo and copy reveal on initial load.
- Subtle scale or parallax on selected large media.
- Staggered fade-and-rise reveals for service blocks.
- A restrained continuous film-strip or media rail where it supports the brand.
- Gold hover/focus transitions on buttons and navigation.
- Sticky header with a clear background transition after scrolling.
- Video starts only after an explicit user action unless it is silent, optimized, and used as a decorative background.

All effects must:

- animate opacity and transforms where possible;
- avoid blocking interaction;
- respect `prefers-reduced-motion`;
- remain usable when JavaScript is unavailable;
- avoid cumulative layout shift.

## 8. Technical architecture

### Stack

- Astro for static-first pages and image optimization.
- TypeScript for typed content and component interfaces.
- Tailwind CSS for reusable design tokens and responsive styling.
- Small isolated client-side motion utilities only where CSS is insufficient.
- GitHub as the source repository.
- Cloudflare Pages as the deployment target.

No backend, database, authentication system, or microservice is required for the first release.

### Module boundaries

```text
src/
|-- assets/              # Optimized source media and brand assets
|-- components/
|   |-- layout/          # Header, navigation, footer
|   |-- motion/          # Reveal, parallax, and media-rail behavior
|   |-- sections/        # Page-specific content sections
|   `-- ui/              # Buttons, headings, cards, media, form controls
|-- content/             # Typed company and service content
|-- layouts/             # Shared HTML shell and metadata
|-- lib/                 # Contact links, SEO helpers, and utilities
|-- pages/               # The five public routes
`-- styles/              # Global tokens, fonts, and base rules
```

Page files compose focused sections. They do not contain the full site markup, styling, data, and animations in a single file.

### Content model

Company identity, navigation, contact links, service summaries, service details, and social links live in typed centralized content modules. Missing optional contact channels are omitted from the rendered interface. Production publication requires at least one verified direct contact channel.

Images are stored as project assets for the first release so Astro can optimize them during the build. If the media library later becomes difficult to manage, migration to Cloudflare R2 or a headless CMS will be considered when the collection exceeds roughly 100 actively maintained assets or non-technical staff need to publish changes weekly.

## 9. SEO, accessibility, privacy, and performance

### SEO

- Unique title and description per route.
- Canonical URLs based on the final domain.
- Organization and local-business structured data only with verified company details.
- Open Graph and social sharing metadata.
- Sitemap and robots configuration.
- Descriptive Spanish URLs, headings, link text, and image alternatives.

### Accessibility

- Logical heading hierarchy and landmark regions.
- Keyboard-accessible navigation, forms, and controls.
- Visible focus indicators.
- Minimum AA contrast for text and controls.
- Useful image alternatives; decorative images use empty alt text.
- Form errors associated with the corresponding fields.
- Reduced-motion mode.

### Privacy

- Collect only information needed to respond to an inquiry.
- Present an accessible privacy notice before production contact collection.
- Avoid third-party tracking by default.
- Add analytics only after the owner chooses a privacy-appropriate provider and the notice reflects it.

### Performance

- Static HTML by default.
- Responsive images with explicit dimensions.
- Lazy-load below-the-fold media.
- Poster images for video.
- Avoid autoplay audio.
- Target a Lighthouse performance score of at least 90 on representative mobile hardware, subject to final media quality and third-party integrations.

## 10. Deployment and ownership

- The project is developed locally and stored in a new GitHub repository owned or controlled by Estudios Estrada.
- Pushes to the `main` branch trigger Cloudflare Pages production builds; pull requests receive preview deployments.
- Cloudflare serves preview deployments for validation before custom-domain publication.
- The custom domain is connected only after the production preview passes responsive, contact, accessibility, and metadata checks.
- The first release does not require contact-delivery secrets because inquiries are handed to WhatsApp in the visitor's browser.

## 11. Validation and acceptance

### Automated checks

- Type checking and production build.
- Formatting and linting.
- Unit tests for content helpers and URL/message construction.
- Browser tests for navigation, WhatsApp CTA, contact validation/message construction, and reduced-motion behavior.

### Visual checks

- Desktop and mobile views for every route.
- Header, footer, buttons, forms, and service media at the agreed breakpoints.
- No horizontal overflow.
- No illegible logo variant or text over imagery.
- Motion remains restrained and does not hide content.

### Production gate

The site is considered ready for custom-domain publication only when:

- approved copy and representative company-owned media are present;
- at least one verified contact channel works;
- the privacy notice matches the active contact and analytics integrations;
- the production build passes;
- the Cloudflare preview has been reviewed on mobile and desktop;
- domain and HTTPS behavior are verified after connection.

## 12. Delivery phases

### Necessary now

1. Scaffold the modular Astro project.
2. Implement the design system and five routes.
3. Integrate supplied logo variants and representative media.
4. Add contact behavior, SEO, accessibility, and tests.
5. Create the GitHub repository and Cloudflare Pages preview.

### Necessary before production

1. Confirm final domain and contact values.
2. Approve company copy and media rights.
3. Add the privacy notice.
4. Validate contact delivery and responsive behavior.
5. Connect and verify the custom domain.

### Later, only with a measured trigger

- Add a CMS or R2 when asset volume or publishing frequency makes Git-based content impractical.
- Add structured packages or a calculator only after pricing rules are stable enough to avoid misleading quotes.
- Add scheduling only after appointment volume creates recurring manual coordination.
- Add a client area only after a defined delivery workflow requires authentication and retained customer files.
