# Static client template

To create a new no-build client:

1. Copy this folder to `clients/client-slug`.
2. Edit `config.json`.
3. Replace assets, manifest, theme, languages, and data JSON.
4. Update `active-client.json`.
5. Update the manifest link in `index.html` if this client is the deployment target.
6. Update `sw.js` so `CLIENT` and the precache list match this client.
7. Serve with `python -m http.server 8000` and complete manual browser QA.
