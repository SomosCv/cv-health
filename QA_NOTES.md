# QA Notes

Implemented static production polish pass:

- Settings / More is reachable from both the hero toolbar and the bottom nav.
- Bottom nav supports seven buttons and includes Settings.
- Client ID is validated before client paths are built.
- Visible JSON-driven content is escaped with `safe()` / `safeT()` helpers.
- Resource URLs are validated separately from text escaping.
- Resource search now searches raw localized text instead of escaped HTML.
- Resource name/category/phone rendering uses the same safe rendering path as other client-controlled content.
- Install button is hidden and disabled until `beforeinstallprompt` fires.
- Settings includes iOS Add to Home Screen guidance.
- Plan Builder uses intentional field types and has Save, Print, Copy Summary, Export JSON, and Clear Plan.
- Resources screen shows a no-results empty state.
- Config includes source, owner, and last-reviewed metadata.
- CDN Font Awesome dependency was removed from `index.html`.
- Local fallback icon CSS is included under `vendor/fontawesome/`.
- `clients/_template/` is included for future white-label clients.
- `sw.js` is intentionally static and points to the active Knoxville demo client.
- npm/package-manager/build-step requirements were removed.

Known production follow-ups:

- Run manual browser QA before sending to a client.
- Run Lighthouse manually in Chrome DevTools after serving locally.
- Human-review Spanish and any future language files.
- Replace demo branding/assets with approved client branding before final deployment.
- For a new no-build client, manually update `active-client.json`, `sw.js`, and the manifest link in `index.html`.
