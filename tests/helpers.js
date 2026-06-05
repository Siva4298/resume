import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { JSDOM } from "jsdom";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDEX_HTML = join(__dirname, "..", "index.html");

// Read once; each loadDom() call parses a fresh, isolated document.
const html = readFileSync(INDEX_HTML, "utf8");

/**
 * Extract and parse the `const COMPETENCIES = [...]` array straight from the
 * inline script source. It is a plain top-level const (not attached to window),
 * so it can't be read off the JSDOM window — but it is valid JSON, so we parse
 * it from source. This lets tests cross-check the JS array against the rendered
 * chips and card tags.
 *
 * @returns {{ slug: string, label: string }[]}
 */
export function competenciesFromSource() {
  const match = html.match(/const COMPETENCIES\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) throw new Error("Could not locate COMPETENCIES array in index.html");
  return JSON.parse(match[1]);
}

/**
 * Build a live DOM from the real index.html and execute its inline <script>,
 * so the genuine filter functions and COMPETENCIES array are exercised — no
 * logic is reimplemented in the tests.
 *
 * @returns {{
 *   window: Window,
 *   document: Document,
 *   chips: () => HTMLElement[],
 *   cards: () => HTMLElement[],
 *   visibleCards: () => HTMLElement[],
 *   tagsOf: (el: HTMLElement) => string[],
 *   notice: () => HTMLElement,
 *   noticeText: () => HTMLElement,
 *   cleanup: () => void,
 * }}
 */
export function loadDom() {
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const { window } = dom;
  const { document } = window;

  const all = (sel) => Array.from(document.querySelectorAll(sel));

  return {
    window,
    document,
    chips: () => all(".filter-chip"),
    cards: () => all("[data-tags]"),
    visibleCards: () =>
      all("[data-tags]").filter((el) => el.style.display !== "none"),
    tagsOf: (el) => (el.getAttribute("data-tags") || "").split(",").filter(Boolean),
    notice: () => document.getElementById("filter-notice"),
    noticeText: () => document.getElementById("filter-notice-text"),
    cleanup: () => window.close(),
  };
}
