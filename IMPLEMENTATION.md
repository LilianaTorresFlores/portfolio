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

## Phase 2: project details (local, pending publication)
Branch: `redesign/projects-phase-2`. No push or deployment.

### Scope and structure
The existing homepage and approved project descriptions remain intact. Project-only files are index.html (project dialog), styles.css (project card/viewer rules), projects.js (public evidence data) and project-gallery.js (interaction). Three unreleased projects retain their notices without internal media.

Desktop details use an editorial two-column layout; below 980px they become a single column. Introduction and important references precede the media. Descriptions use normal document flow, without fixed heights or clipping. The modal scrolls naturally with an accessible sticky X button. Role information is documented in the supplied PDF. A separate contribution is shown only where it adds information beyond the approved description.

### Targeted refinements, rather than another redesign
- Reused the existing two-column composition, responsive behavior, transparent media surface and native dialog.
- X only, with aria-label Close project details. Removed the redundant card CTA text.
- Previous/next buttons sit in reserved side gutters, centered vertically, with 44px touch targets and an 8px gap from the image. The gutters are present only for multi-image projects. Single-image projects hide them. No visible counters, captions or navigation toolbar. A visually hidden status announces slide changes. Arrow keys work with media focus; clicking an image opens its full-size presentation copy.
- Mercado Pago retains its approved complete description. Removed the historical/onboarding captions and repetitive supplementary description. Privacy masks remain unchanged.
- Anna uses the owner's existing Facebook video URL in Facebook's official plugins/video.php iframe. Both legacy images are removed from display, while original files remain stored. The responsive wrapper uses the verified 400:224 video ratio and requests the proper player width on resize. No unofficial download, rehosting, API key or new dependency. A fallback link remains near the introduction. Closing the modal disposes the iframe and stops playback.
- Belisar.io retains only messenger-01 through messenger-05 in their existing order. The original media list's images 1 and 7 were the two character assets; after the preceding reorder those files occupied positions 6 and 7. They were removed by filename (personaje.webp and personaje-investigacion.webp), not by blindly deleting current array indices. All five conversations are preserved. Press links sit directly after the summary, before role metadata and media.

### Media and privacy
13 presentation files remain in assets/projects; only 9 screenshots are displayed in the revised details. Original source files and review inventories remain in gitignored .review/project-assets. No media files were edited in this refinement: hashes confirm all existing redactions, dimensions and image bytes are unchanged. Media wrappers use the cream project surface with no white background, extra border, shadow or cropping. White pixels present in the screenshots themselves remain intact, as requested.

### Validation
At 1440x900, 1280x720, 1024x600, 768x1024, 390x844 and 320x640: full approved descriptions, proper column order, no horizontal overflow, image aspect ratios, side arrows without image overlap, touch sizes, relevant media order, references near the introduction, full-card activation, arrow keys, Escape and focus restoration pass.
The official Facebook embed returned HTTP 200 with a ready video (400x224). Actual playback inside the local project modal was verified. Responsive desktop/mobile sizing, fallback link, close button, iframe disposal and focus restoration pass.
Known provider limitation: while focus is inside Facebook's cross-origin player, Facebook can consume Escape. The visible X remains accessible; Escape closes the native viewer when focus is outside the player. No cross-origin or CSP protections are bypassed.
All 13 image hashes match the pre-refinement files. About, Experience, Skills, Education, Contact, global color tokens and typography are unchanged. JavaScript syntax and git diff whitespace checks pass. The static site has no build command.

### Local review artifacts
.review/viewer-refinement contains desktop/mobile screenshots, source snapshots, image hashes and reproducible review scripts. check_viewer.py covers the owned project UI; check_facebook.py checks real embedded playback and documents the provider's Escape behavior.


## Publications & Research (local)
- New section after Projects reuses Newsreader/Inter/IBM Plex Mono, existing tokens, project metadata and the approved project-dialog surface/header/two-column layout. Existing project viewer markup, scripts and styles are unchanged.
- Files: index.html, styles.css, publications.js (structured verified metadata), publication-viewer.js (one reusable native document dialog). The degree-completion work is explicitly a report for a licenciatura, not doctoral research.
- EUROPHRAS 2017: official proceedings title and author attribution, DOI 10.26615/978-2-9701095-2-5_026, official 8-page PDF. Source: https://acl-bg.org/proceedings/2017/EUROPHRAS%202017/index.html
- UNAM: verified 2024 TESIUNAM record https://tesiunam.dgb.unam.mx/cgi-bin/koha/opac-detail.pl?biblionumber=858002 . Its official HTML viewer explicitly loads the public PDF https://tesiunamdocumentos.dgb.unam.mx/ptd2024/abr_jun/0858002/0858002.pdf . Both document URLs return HTTP 200 with application/pdf; neither specifies X-Frame-Options. The catalog itself has SAMEORIGIN and is linked externally, not embedded.
- Direct PDF object previews and the editorial Drive iframe preserve original documents, use transparent wrappers and provide direct source links before the media plus a browser fallback. No documents were copied into public assets, rasterized into galleries or uploaded to AI services. No new dependencies or deployment changes.
- Editorial source supplied by owner: https://drive.google.com/file/d/1nvU9rcfPscBbQ3U82oEWH5ueQIhgaewz/view . Public access and download verified without authentication. The file name is Equipo 4 - 16 paginas.pdf; its actual PDF contains 14 pages, including double-page spreads and an initial blank page. All original pages remain unchanged. The owner requested removing the team label from the portfolio UI; no unverified publication year, full author list or individual contribution is invented. The editorial entry uses the existing native publication modal with a Drive /preview iframe. The diploma link now opens this same detail, without a duplicate document or viewer. Three columns on desktop, two on tablet, one on mobile.
- Responsive owned-UI checks pass at 1440x900, 1280x720, 1024x600, 768x1024, 390x844 and 320x640: single X, native Escape, focus return, metadata before preview on mobile, two columns on desktop, no horizontal overflow, original document/source links. Existing eight projects and four education entries remain. Projects side-arrow regression checks pass at 320/390/1024/1440px. Existing Experience, About, Skills and Contact remain unchanged.
- Actual PDF HTTP loading is verified, but automated Edge renders its native PDF plugin as a blank gray rectangle (headless and offscreen normal-browser sessions); native PDF painting/navigation still needs a manual review in the user browser. Preview availability depends on browser PDF support/settings; direct original links remain available. No build command exists for this static site. JavaScript syntax and whitespace checks pass. Review scripts and desktop/mobile screenshots are in .review/publications (gitignored).


### Editorial diploma integration validation
Three publications and the active diploma link verified at 1440x900, 1280x720, 1024x600, 768x1024, 390x844 and 320x640. Full-card keyboard activation, single X, Escape with focus in the portfolio UI, focus restoration, iframe disposal on close and no horizontal overflow pass. Drive renders the actual PDF without authentication; native document scrolling reaches the Sirenas spread. Drive supplies its own embedded document controls; no extra page counter, gallery, pagination toolbar or bottom CTA was added. The source has an initial blank page, retained as supplied. Cross-origin provider controls and document contents cannot be restyled from the portfolio. Existing project scripts, markup, assets and gallery layout were not changed. No push or deployment.


## Production release authorized by owner
Removed the editorial project's team label from its card and detail view; author metadata remains on the two academic records. The source PDF remains unchanged. The owner explicitly approved pushing and publishing this iteration to production. GitHub Pages configuration verified: main branch, repository root, legacy build. The existing deployment configuration is retained. Local checks cover responsive publication/project viewers, keyboard behavior and source links. Final release verification is performed against the published commit.
