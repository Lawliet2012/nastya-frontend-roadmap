# Frontend Developer Roadmap

Interactive roadmap for learning frontend development — from CRM developer (Aurelia/Vue) to a competitive frontend engineer. Static site, no build step, hosted on GitHub Pages.

## Pages

- **Roadmap** (`index.html`) — 11 sections of topics, from CS fundamentals to interview prep. Each topic has a tip, "Проверь себя" interview-style questions with hidden answers, and for fundamentals a short hands-on experiment ("Попробуй руками").
- **Mega Lab** (`lab.html`) — one large project (React storefront + Vue admin on the DummyJSON API) that covers the whole roadmap step by step, plus a bonus track "Под капотом" where you build your own backend with plain Node.js and SQLite.

## Features

- Progress tracking saved in `localStorage`, with export/import to a JSON file
- "Continue" card that jumps to the next unchecked item
- Search, "hide completed", expand/collapse all
- Dark and light themes, mobile layout
- "Что нового" banner describing the latest content update

## Files

| File | Purpose |
| --- | --- |
| `data.js` | Roadmap sections, topics and resources |
| `checks.js` | Self-check questions and experiments, keyed by item id |
| `lab-data.js` | Mega Lab phases, steps and tasks |
| `common.js` | Shared UI: rendering, progress, search, navigation |
| `app.js`, `lab.js` | Map each data file to the shared UI |
| `styles.css` | Shared styles for both pages |

## Editing content

Progress is stored by item id (`nastya-roadmap-progress` and `nastya-lab-progress` in `localStorage`). Never rename or reuse an existing `id` in `data.js` or `lab-data.js`, otherwise saved checkmarks are lost. Adding new items is safe; mark them with `isNew: true` to show a "новое" tag.

## Usage

Open `index.html` in a browser, or serve the folder (`python3 -m http.server`). Pushing to `main` deploys to GitHub Pages.
