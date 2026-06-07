# Emergency Preparedness Neighborhood Guide PWA

A static, mobile-first, white-label progressive web app converted from the Emergency Preparedness Neighborhood Guide PDF.

This project is intentionally simple:

```txt
Static HTML/CSS/JS only.
No npm.
No build step.
No framework.
No package manager.
```

Edit JSON, CSS, and assets. Serve the folder with any static server. Zip and deploy the static folder.

## Run locally

From the project root, run:

```bash
python -m http.server 8000
```

Then open:

```txt
http://localhost:8000
```

## Static production flow

```txt
1. Open the app with a local static server.
2. Test it in Chrome mobile view.
3. Test offline mode after the first load.
4. Run Lighthouse manually in Chrome DevTools.
5. Zip and deploy the static folder.
```

## What this includes

- Task-based app screens instead of one page per PDF page.
- Household preparedness checklist.
- Household Ready Kit persistent checklist.
- Neighborhood Plan Builder saved locally in the browser.
- Plan actions: save, print, copy summary, export JSON, and clear plan.
- Emergency Mode with all seven implementation steps.
- Team role descriptions.
- Local hazards screen.
- Searchable resources with an empty state.
- Reachable Settings / More screen.
- Source and last-reviewed metadata.
- Light/dark mode.
- Text size toggle.
- English/Spanish UI toggle.
- PWA manifest and static service worker.
- Original PDF included as a supplemental download.
- No CDN dependency for icons. The included `vendor/fontawesome/css/all.min.css` is a small local fallback. For final client branding, use inline SVG icons, the existing fallback CSS, or manually add approved self-hosted icon files.

## White-label structure

Core app logic lives in `core/`. Client-specific content, theme, language, data, and assets live in `clients/emergency-preparedness-knoxville/`.

A starter folder is included at `clients/_template/`.

To create a new client:

1. Copy `clients/_template` to `clients/client-slug`.
2. Edit `config.json`.
3. Replace logo, background, icons, PDF, and data JSON.
4. Update `active-client.json` when that client should load by default.
5. Update `index.html` if the manifest path should point to the new client.
6. Update `sw.js` so the `CLIENT` constant and precache list point to the new client assets.
7. Serve locally with `python -m http.server 8000`.
8. Complete the manual QA checklist before sending or deploying.

This is not a fully automated production pipeline. It is a static production-ready PWA starter kit.

## Security and content hardening

Client IDs are validated before building client paths. Visible client-controlled JSON text is escaped before insertion into the DOM. URLs are handled separately and limited to expected protocols.

## Service worker note

`sw.js` is intentionally static. It precaches the current client folder and core app files. For each new static client deployment, manually update:

```txt
active-client.json
sw.js
index.html manifest link
```

That keeps the project no-build and compatible with any static host.

## Font/icon note

This ZIP does not use a Font Awesome CDN and does not require npm. The included Font Awesome-compatible CSS is a local fallback for the icons used by the demo. For final government/client deployment, either keep the fallback, replace icons with inline SVGs, or manually copy approved self-hosted icon CSS/webfonts into `vendor/fontawesome/`.

## Manual QA checklist

Before sending to a client or deploying, run the app in a browser and check:

```txt
Open every screen
Click every button
Switch language
Toggle dark mode
Toggle large text
Search resources
Confirm no-results search state appears
Save checklist items
Build a plan
Save plan
Copy plan summary
Print plan
Export plan JSON
Clear plan
Reset progress
Reload the page
Confirm saved state persists where expected
Turn off internet after first load
Confirm the app still opens offline
Confirm PDF download works when cached
Check mobile bottom nav
Check keyboard navigation
Check screen reader labels where possible
Run Lighthouse manually in Chrome DevTools
Confirm PWA install behavior where supported
Confirm iOS Add to Home Screen instructions are visible
Review Spanish text with a human reviewer
Confirm real client logo/background/icons are approved
Confirm source/review metadata is accurate
```
