# Rince Hub

A static Irish dancing information hub with the existing Training Matrix built in. GitHub Pages serves the repository root without a build step.

- `index.html` and `hub.css`: problem-led homepage, starter guides, official organisation links and a small championship snapshot.
- `training.html` and `training-theme.css`: existing planner with shared navigation and Bordeaux, pink and white styling.
- `images/`: small character illustrations.
- `sw.js`, `register-sw.js`, `manifest.json`: offline page caching and planner install support.

The homepage is the front door. The planner now lives at `training.html`. Existing planner localStorage keys are preserved on the same origin, so browser-saved weeks and reflections remain available. No account or server storage is used. The old external AI chat and Google Fonts requests have been removed. External resources and Feis Day Spells open on their own sites.

The service worker caches each page separately and only removes old caches belonging to this site. Increase its cache version after asset changes. Championship dates are a dated snapshot: keep these few entries current or remove expired entries, and refer visitors to official organisers for full calendars.

Validation: JavaScript syntax checks; desktop and 390px homepage review; navigation to the planner, goal tab switching, and weekly choice persistence after reload. Existing exercise content is retained, not independently medically validated.

Next content work: expand the first-feis and first-class guides, then teacher support and organisation-specific explanations. Keep frequently changing listings and results with their official maintainers.
