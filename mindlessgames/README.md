# MindlessGames

A collection of silly, lightweight browser games for all ages, published via GitHub Pages.

## Structure

```
mindlessgames/
├── index.html            # Landing page — hub linking to each game (to be built next)
├── tap-twist-pull/
│   └── index.html        # Game 1 — touch/gesture reflex game
├── quiz-climb/
│   └── index.html        # Game 2 — trivia ladder game (Open Trivia DB powered)
└── shared/                # Reserved for any assets shared across games
    └── (fonts, shared CSS/JS, etc. as the collection grows)
```

## House rules (applies to every game in this collection)
- No punishing fail states
- Light touch
- Short play sessions
- Procedural audio only (Web Audio API / SpeechSynthesis) — no licensed music/voice files

## Adding a new game
1. Create a new folder at the repo root (`your-game-name/`)
2. Drop in a self-contained `index.html` (single file, no build step)
3. Enable GitHub Pages on this repo if not already on (Settings → Pages → Deploy from branch → `main` → `/root`)
4. It'll be live at `https://<username>.github.io/mindlessgames/your-game-name/`
5. Add a card for it on the root `index.html` landing page

## Deploying
Once this repo is pushed to GitHub as `mindlessgames`, enable Pages in repo settings
(Deploy from branch → `main` → `/ (root)`). The whole collection will be live at:
`https://<username>.github.io/mindlessgames/`
