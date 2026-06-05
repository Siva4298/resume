# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a zero-dependency, single-file static resume website for Sivaprakash Murugan. The entire application — HTML structure, CSS styles, and JavaScript logic — lives in `index.html` (~956 lines). There is no build step, no package manager, and no test suite.

## Running the Project

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8080
```

No installation or compilation needed.

## Architecture

`index.html` is divided into three logical sections:

**`<head><style>`** — All CSS (~539 lines). Uses CSS custom properties for the design system:
- `--primary: #0a7c74` (teal), `--accent: #f0a500` (orange), `--dark: #0f1f2e`
- Layout utilities: `.grid-2`, `.grid-3`, `.grid-4`
- Component classes: `.card`, `.project-card`, `.timeline`, `.chip`
- Responsive breakpoint at `600px`

**`<head><script>`** — All JavaScript (~35 lines). Two functional concerns:
1. **Competency filter system**: Reads `data-competencies` attributes on `.experience-item` and `.project-card` elements, then shows/hides them when filter chips are toggled. Active filter state is tracked with the `.active` class on `.filter-chip` elements.
2. **Edit mode**: Toggles `contenteditable` on tagged elements and enables avatar image upload via `<input type="file">` + `FileReader` → base64 data URL written to `<img>` `src`.

**`<body>`** — Semantic sections with `id` anchors used by the sticky nav: `#about`, `#skills`, `#experience`, `#projects`, `#education`, `#contact`.

## Key Conventions

**Competency system**: Each competency is defined as a chip with `data-filter="<slug>"` in the `#skills` section. Experience and project entries carry `data-competencies="slug1 slug2 ..."` as a space-separated list. Adding a new competency requires updating both the filter chip list and the relevant `data-competencies` attributes.

**Edit mode toolbar**: Fixed-position `div#edit-toolbar` (bottom-right). Elements marked `class="editable"` become `contenteditable` when edit mode is active. The avatar upload targets `img#avatar`.

**No external assets**: The avatar photo is embedded as a base64 data URL inside the `<img src="...">` attribute. Keep it that way — the file must remain fully self-contained.

**Single-file constraint**: All changes stay within `index.html`. Do not introduce external CSS files, JS files, or build tooling unless explicitly asked to refactor the architecture.
