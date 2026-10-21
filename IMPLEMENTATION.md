# Portfolio redesign

Static HTML, CSS and JavaScript. No build step or new dependencies.
GitHub Pages continues to serve the root of main; no deployment settings changed.

## Local preview
Run `python -m http.server 8000` in this directory and open http://localhost:8000.

## Files
- index.html: editorial homepage, original biography, experience and projects, updated skills and education.
- styles.css: centralized tokens, responsive layouts, keyboard focus and reduced-motion support.
- script.js: responsive navigation and native dialog credential viewer.
- credentials.js: optional credential records and public certification URL.

## Credentials
The supplied W3C credential JSON and issuer-hosted certificate image were reviewed. Public display fields: Digital Product Design, Colectivo23, August 26, 2026, 66 academic hours. The certificate image confirms collaboration with IDEO. The locally stored image opens in the credential viewer, alongside an issuer verification link. The original JSON, identity hash, salt and proof are not published. Cryptographic signature validation was not performed.
Set document to a reviewed local PDF path to enable the modal preview. External verificationUrl opens directly in a new tab. A missing document does not create a broken document link. PDF preview includes an original-document link; native dialog supplies Escape and modal focus containment, and closing restores focus to the trigger.
Never publish an unreviewed professional license. Use a redacted document or official public verification URL.

## Missing assets
- Optional redacted UNAM degree or official public verification URL.
- Optional documents for the other education entries.
- Project screenshots: none supplied; existing logos remain, without fabricated imagery.

## Validation
Original About, all 8 experience entries and all 8 project texts compared to Git HEAD and preserved. Local asset paths and navigation anchors checked. Requested skill order and new tools/certification checked. JavaScript syntax and git diff whitespace checks passed. No build/test framework exists in the original repository. Full browser interaction, PDF rendering, external link availability and WCAG audit require manual verification. The supplied PNG certificate is available for image preview; no PDF was supplied. No push or deployment performed.

## Visual refinement round 2
Branch: `refine/editorial-round-2`. No push or deployment.

- Newsreader replaces Fraunces consistently. Inter and IBM Plex Mono remain. Loaded fonts and regular/italic F, J, f, j reviewed in an isolated local specimen.
- Portrait, transparent company logos, project marks and academic logo use CSS grayscale. Original assets and the full-color credential remain intact.
- Removed the rounded portrait mask, pastel section/card fills, skill counters and colored logo containers. Shared tokens control spacing, borders and 4px primary-button corners.
- Selected Work uses five shared CSS Grid subgrid tracks: visual, year, title, full description and category. Cards in each row share the longest content height, without truncation or filler text. Visual areas share a 16:9 ratio. Older browsers fall back to equal-height grid cards.
- Education uses option B: a centered grid with two equal columns and four preserved entries, shared text tracks and consistent borders/padding. Single column on mobile. The certification retains the verified August 26, 2026 date from the supplied JSON and certificate, superseding the original September placeholder.

### Logo audit
Deloitte, Artificial Nerds, Yalo, Levi's, Sodimac, Mercado Pago and UNAM reuse existing SVG assets. Espressive and Oriflame reuse PNG assets with transparent alpha channels; corner transparency checked. No CSS blending or artificial background removal.
UiX's opaque JPEG and Belisar.io's opaque PNG are retained as original assets but replaced in the homepage by plain neutral company-name placeholders. Official transparent UiX lettermark and transparent Belisar.io mark are still needed. Placeholders do not recreate official marks.

### Round 2 validation and local previews
Content comparison against the previous local iteration preserves all text in About, Experience, Projects, Skills, Education and Contact. Eight experience entries, eight projects, four skill groups, all academic entries and the 9+ reference remain. Local asset references and navigation anchors pass checks.
Edge browser checks: 320, 390, 768, 1024, 1440 and 1920px; no horizontal overflow; equal project-card heights and aligned title, description and category positions per row; actual Newsreader font loading; grayscale portrait; no skill counters; mobile menu toggle and Escape; credential image loading, modal Escape and focus restoration; reduced motion; no JavaScript runtime errors.
Screenshots and the reproducible local browser review script are in `.review/` (gitignored, not intended for publication): desktop/mobile full pages, hero, projects, education, credential view and typography specimen. Review tools are local only; no production dependencies were added. No build command exists for this static site. Automated checks do not constitute a complete WCAG or screen-reader audit.

## UiX official logo and pink accents
- Official source supplied by the owner: https://uixdesign.com/hubfs/Grupo%20UPAX/WS_Assets/00_GENERAL_Assets/logos/logo_uix.svg
- Downloaded unchanged to logos/uix.svg. All six UiX placeholders now use that transparent lettermark; CSS grayscale plus brightness renders it black without altering original SVG paths or proportions. Only Belisar.io still needs a transparent replacement.
- Introduced the shared accent-wash token (#F3E3E8). Pink now appears on the primary CTA, portrait edge, section markers, project top rules, first expertise panel, and contact CTA. Contact uses the light rose surface; footer returns to cream. Images remain monochrome.
- Contrast: dark button text on dusty pink 5.51:1; rose text on cream 5.36:1; muted text on light rose 4.94:1.
- No content edits, push or deployment. Existing branch and local preview remain in use.
