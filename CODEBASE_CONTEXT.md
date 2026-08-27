# BenTechHub Codebase Context

## Purpose

BenTechHub is a static, multi-page marketing website for a South African technology company. It communicates two connected offerings:

1. Technology infrastructure and support for homes, SMEs, and enterprises.
2. Practical technology education and an industry-ready talent network.

The site has no build system, package manager, framework, server-side application, database, or authentication layer. It is designed to run directly from a static host or a simple local web server.

## File map

| File | Responsibility |
| --- | --- |
| `index.html` | Primary redesigned landing page. Hero, solutions, Academy preview, Talent preview, CTA, footer. |
| `services.html` | Detailed service page for network infrastructure, Wi-Fi, CCTV/security, and Managed IT. |
| `managed-It.html` | Managed IT offering, support model, SLA details, and CTA. Note the capital `I` in the filename. |
| `pricing.html` | Managed IT packages, pricing cards, FAQ accordion, and CTA. |
| `about.html` | Company positioning, stats, principles, process, and CTA. |
| `contact.html` | Contact information and technology assessment form. |
| `academy.html` | Academy hero, learning pathways, prices, and WhatsApp support CTA. |
| `talent.html` | Talent-network hero, candidate directory, and recruiter CTA. |
| `styles.css` | Base layout system plus the original site styles and the primary Home-page visual refresh. |
| `enhancements.css` | Additional global polish layer imported by `styles.css`. Contains interior-page redesign, image blending, motion, responsive overrides, and visual effects. |
| `script.js` | Shared client-side behavior: header state, mobile navigation, scroll reveals, form validation/submission, FAQ accordion, footer year, and pointer hero depth. |
| `additional_info.txt` | Supplied source copy for Academy, Talent, partnerships, contact details, and social links. |
| `bentechlinks.txt` | Supplied social URLs and email addresses. |
| `images.jpeg` | Blue global/network connection image; used in the Home hero and visual backgrounds. |
| `images (1).jpeg` | Blue world map/network image; used for solution and page-hero imagery. |
| `images (2).jpeg` | Cybersecurity lock/technology image; used in solution/service compositions. |
| `images (3).jpeg` | CCTV/security camera city image; used for security imagery. |
| `IT-Networking-Fundamentals.jpg` | Networking diagram; used in Academy imagery. |
| `images.png` | Graphic globe/network mark used as the current compact brand mark. |
| `Logo-Cfwf3AIi.svg` | Large embedded SVG asset from the supplied materials. It is not currently the primary header logo. |

## Visual system

The current visual direction is high-trust technology with a cinematic, editorial feel:

- Deep navy/teal backgrounds: approximately `#082d3a`, `#103b45`, and `#061f29`.
- Lime-green accent: approximately `#c8f06b`.
- Soft pale green surfaces: approximately `#f5f6f1`, `#eef3ee`, and `#dbe6d9`.
- Headings use Manrope; labels and metadata use DM Mono.
- Rounded pill CTAs, floating navigation, thin borders, atmospheric radial gradients, image overlays, and restrained hover movement.
- Images are intentionally blended using gradients, opacity, saturation/contrast grading, `mix-blend-mode`, masks/clip paths, inset lighting, and shadows.

`styles.css` contains a large original baseline. Its later sections include a Home visual refresh and Academy/Talent layout rules. `enhancements.css` is imported at the top of `styles.css`, so every page receives it. `index.html` also links it directly; this is redundant but harmless.

## Shared JavaScript behavior

`script.js` is loaded at the bottom of every page.

### Header and navigation

- Adds the `js` class to `<html>`.
- Adds/removes `scrolled` on `#siteHeader` when the viewport is scrolled.
- On pages with `body.interior-page`, replaces the desktop and mobile navigation links with a consistent set: Home, Solutions, Academy, Talent, About, Contact.
- The burger button opens/closes `#mobilePanel`, updates ARIA state, locks body scrolling, moves focus into the panel, supports Escape, and provides a basic Tab focus trap.

The five original interior pages have `class="hub-home interior-page"`. Academy and Talent have `class="hub-home academy-page"` / `class="hub-home talent-page"` and use the same modern shell directly.

### Scroll reveal

Elements with `.reveal` are observed with `IntersectionObserver` and receive `.in` when visible. Reduced motion is handled in CSS.

### Home hero pointer depth

On fine-pointer devices, the Home/Academy/Talent hero image receives small CSS-variable rotation/translation values while the pointer moves over it. This is disabled when `prefers-reduced-motion: reduce` matches.

### Contact form

The form is `#quoteForm` on `contact.html`.

Validated fields:

- `name`: required.
- `email`: required and basic email pattern.
- `phone`: required and South African phone pattern.
- `message`: required.

`company` and `service` are optional.

There is no live backend endpoint in the repository. The submission endpoint is intentionally an empty configuration value. Valid submissions are converted into a `mailto:info@bentechhub.co.za` URL with an encoded subject/body and handed to the visitor’s email client. If a real Formspree endpoint is later supplied, the fetch branch can be enabled.

Important limitation: a mail client must be configured on the visitor’s device. This is not a server-side submission or guaranteed delivery mechanism.

### Pricing FAQ

Buttons with `.faq-q` toggle the nearest `.faq-item`’s `open` class and synchronize `aria-expanded`. The first FAQ item starts open in the markup.

### Footer year

Any element with `id="year"` is filled with the current client-side year.

## Page-level content

### Home

The redesigned Home page is the strongest visual reference. It uses:

- Dark network hero with `images.jpeg`.
- Four capability markers below the hero.
- Introductory positioning statement.
- Three image-backed solution cards.
- Academy section using `IT-Networking-Fundamentals.jpg`.
- Talent preview with stylized initials rather than portrait assets.
- Dark conversion CTA and compact footer.

### Services

Detailed service blocks use the existing `.service-block` structure. Each visual panel receives a different background image via CSS:

- Network: `images (3).jpeg`.
- Wi-Fi: `images (1).jpeg`.
- CCTV: `images (2).jpeg`.
- Managed IT: `images.jpeg`.

Anchor targets are `#network`, `#wifi`, `#cctv`, and `#managed`.

### Managed IT

Uses page hero, SLA/package content, and Managed IT CTA. The filename is case-sensitive on some hosts: preserve `managed-It.html` unless all references are deliberately changed.

### Pricing

Uses `.pricing-grid`, `.price-card`, `.featured`, and `.faq-item`. The Business package is the featured card.

### About

Contains stats, company principles, a four-step process, Level 1 B-BBEE messaging, and a CTA.

### Contact

Contains the validated assessment form and contact cards. Email destinations are `info@bentechhub.co.za` and `support@bentechhub.co.za`; phone destination is `+27 67 203 3731`.

### Academy

Course pathways currently represented:

- Networking Basics — Beginner — 8 weeks — R200.
- Cybersecurity — Beginner — 6 weeks — R200.
- Cloud & Programming — Intermediate — 8–10 weeks — R300.
- Network Security — Advanced — 12 weeks — R500.

The Academy application CTA uses email, and support uses `https://wa.me/27672033731`.

### Talent

Candidate cards are content-only directory cards with initials. Current displayed candidates include Ltebatso, Simphiwe Mbatha, Aicha Dao, Mamphela Mogashoa, Rone Wavhulahani, and Katleyn Qandela. Recruiter CTA uses email.

## Links and external destinations

Internal links use direct `.html` files and service anchors. No router is present.

External/social destinations supplied by the client:

- LinkedIn: `https://www.linkedin.com/in/benediction-matlou`
- Facebook: `https://www.facebook.com/BenTechHub`
- TikTok: `https://www.tiktok.com/@bentechhub?is_from_webapp=1&sender_device=pc`
- WhatsApp: `https://wa.me/27672033731`

Automated HEAD checks may receive `405 Method Not Allowed` from LinkedIn anti-bot handling; this does not necessarily indicate a dead page.

## Running locally

Because this is static HTML, a simple server is sufficient:

```powershell
php -S 127.0.0.1:8090 -t .
```

Then open `http://127.0.0.1:8090/index.html`.

Opening pages over HTTP is preferable to `file://` because it more closely matches deployed behavior and avoids local-file restrictions.

## QA and known limitations

- All eight HTML pages and supplied local CSS/JS/image assets have been verified to resolve successfully through a local PHP server.
- No broken internal relative links or in-page anchor targets were found during the latest static audit.
- `node --check script.js` passes.
- There is no package manifest, lint configuration, build command, automated test suite, or backend test harness.
- A real Formspree ID or backend endpoint is still needed for guaranteed server-side form submission.
- Automated LinkedIn probing can return 405 due to anti-bot behavior.
- Font loading depends on Google Fonts availability; the CSS has local generic fallbacks.
- Navigation is duplicated in source HTML and normalized at runtime on interior pages. If JavaScript is disabled, the original source navigation remains visible but differs slightly from the runtime-normalized navigation.

## Safe extension guidance

- Put global visual changes in `enhancements.css`, not scattered through each page.
- Preserve the shared IDs used by `script.js`: `siteHeader`, `burger`, `mobilePanel`, `quoteForm`, `formStatus`, and `year`.
- When adding a page, use `body class="hub-home interior-page"` and include `styles.css`; the enhancement layer will provide the shared shell.
- Keep image paths relative and preserve spaces/parentheses in existing asset filenames unless assets are renamed everywhere.
- Add meaningful `alt` text to every content image. Decorative logos/marks should use empty alt text.
- Preserve visible keyboard focus and `prefers-reduced-motion` behavior when adding interactions.
- Avoid adding dependencies unless the project is intentionally migrated from static HTML to a build system.
