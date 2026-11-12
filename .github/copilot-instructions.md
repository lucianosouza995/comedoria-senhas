## Purpose
This project is a small static HTML/JS/CSS "chamador de senha" (ticket/number caller) for a canteen. The repo contains a single primary page: `SENHA_COMEDORIA_1360x768.html` plus binary assets (video, audio, image). This file should orient an AI agent to make safe, targeted changes without breaking runtime behavior.

## How to run locally
- No build system — open `SENHA_COMEDORIA_1360x768.html` in a modern browser.
- For testing from a local server (recommended for media/autoplay):
```powershell
# from the directory containing the HTML and assets
python -m http.server 8000
# then open http://localhost:8000/SENHA_COMEDORIA_1360x768.html
```

## Key files
- `SENHA_COMEDORIA_1360x768.html` — single page app: HTML structure, inline CSS and JavaScript, and references to assets:
  - `cardapio.mp4` (video)
  - `notify.wav` (audio)
  - `white.png` (logo image)

## Big-picture flow / architecture
- Single-page static app. All logic lives in inline `<script>` inside the HTML.
- Primary UI areas:
  - `.senha` (left panel) — shows current called number and input field
  - `.banner` (right panel) — autoplaying background video
  - `.ultsenha` — recent numbers list
- Data flow is entirely client-side and ephemeral: numbers are stored in a JS `senhas` array. No server or persistence.

## Important JS functions & behaviors (look here first)
- `capturar()` — triggered by the input `onkeypress`; checks `event.keyCode === 13` (Enter). It:
  - reads `#valor` value, shows it in `#valorDigitado`, clears input
  - removes any duplicate from `senhas`, unshifts new value, caps length at 4, and updates `#ultimas`
- `playSound(sampleName)` — plays audio element by ID (used for notify.wav) — called on Enter and on the pad click
- `altera_tamanho()` — adds `.expanded` to `.senha` and removes after 3000ms; CSS expands the panel as an overlay.
- Key global variables: `senhas`, `stringSenhas`, `posicao`, `flag` (some exist but may be unused). Avoid removing globals unless you update all references.

## CSS / layout patterns to preserve
- The `.senha` panel has two states: default and `.expanded` (overlay). Many UI behaviors depend on that class toggle — do not rename without updating JS.
- `.banner video` uses `object-fit: cover` and expects the `.banner` to occupy ~70% width. Keep video sizing to avoid layout regressions.

## Project-specific conventions and constraints
- All code is inline in the single HTML file. Changes should either remain inline or be moved carefully (update `<script>` references).
- Text and comments are in Portuguese. Preserve user-facing copy unless asked to translate.
- The project is intended for fullscreen kiosks; autoplaying muted video and large fonts are intentional.

## Safe-edit checklist for AI edits
- Small UI tweaks OK: fonts, colors, spacing. Keep `.expanded` behavior and `.banner` size consistent.
- When modifying JS:
  - Prefer to keep function names (`capturar`, `playSound`, `altera_tamanho`) stable.
  - If changing event handling, replace inline `onkeypress` carefully and ensure Enter still triggers the same flow.
  - Replace use of the global `event` object with an explicit argument only if you update all callers.
- Do not remove or rename IDs used by code: `valor`, `valorDigitado`, `ultimas`, `senha1`, and audio id `Q`.

## Common small tasks and examples
- Add validation to input (only numeric, max 3 chars): update `capturar()` to sanitize before using.
- Make Enter handling robust: change `onkeypress` -> `addEventListener('keydown', ...)` but keep the same behavior for `Enter` and calling `playSound('Q')`.
- Extract CSS to a separate file if requested — but keep a working HTML-first copy and test in the browser.

## Debugging tips
- Open browser DevTools console to inspect runtime errors. Key places to check:
  - `capturar()` errors when `event` is undefined
  - Audio autoplay issues: browsers sometimes block audio unless muted or user-initiated
- If video/audio won't autoplay, run via local HTTP server (see "How to run locally").

## Integration points & external dependencies
- None: purely static. All assets are referenced by filename and must be present in the same directory.

## When to ask the user
- If a requested change affects persistence, introduces a server, or changes core UX (e.g., removes the overlay behavior), ask for confirmation.

## Where to look next
- Open `SENHA_COMEDORIA_1360x768.html` and search for: `capturar`, `altera_tamanho`, `.expanded`, `#ultimas`, and `notify.wav` to understand runtime-critical pieces.

---
If you want, I can suggest a small refactor: move inline JS into `scripts/main.js` and add a minimal local `index.html` wrapper — I can implement that and keep a fallback single-file version for kiosk use.

Please review and tell me any missing details or other behaviors you'd like documented.
