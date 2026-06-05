import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadDom, competenciesFromSource } from "./helpers.js";

describe("competency data integrity (index.html)", () => {
  let dom;

  beforeEach(() => {
    dom = loadDom();
  });

  afterEach(() => {
    dom.cleanup();
  });

  const competencySlugs = () => competenciesFromSource().map((c) => c.slug);

  const usedTags = () => {
    const set = new Set();
    for (const card of dom.cards()) {
      for (const tag of dom.tagsOf(card)) set.add(tag);
    }
    return set;
  };

  it("has 20 competencies and 20 chips that line up exactly", () => {
    const slugs = competencySlugs();
    const chipSlugs = dom.chips().map((el) => el.getAttribute("data-slug"));
    expect(slugs.length).toBe(20);
    expect(chipSlugs.length).toBe(20);
    expect([...chipSlugs].sort()).toEqual([...slugs].sort());
  });

  it("has no orphan tags: every data-tags slug exists in COMPETENCIES", () => {
    const known = new Set(competencySlugs());
    const orphans = [...usedTags()].filter((t) => !known.has(t));
    expect(orphans).toEqual([]);
  });

  it("has no dead competency: every slug appears on at least one card", () => {
    // This is the guard that catches the historical `speaking` orphan bug —
    // a chip the user can click that would hide every card.
    const used = usedTags();
    const dead = competencySlugs().filter((s) => !used.has(s));
    expect(dead).toEqual([]);
  });

  it("never blanks the page: selecting any single chip leaves >=1 card visible", () => {
    const { window, visibleCards } = dom;
    for (const slug of competencySlugs()) {
      window.clearFilters();
      window.toggleChip(slug);
      expect(
        visibleCards().length,
        `selecting "${slug}" hid every card`
      ).toBeGreaterThan(0);
    }
  });
});
