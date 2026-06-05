import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadDom } from "./helpers.js";

describe("competency filter behavior (index.html)", () => {
  let dom;

  beforeEach(() => {
    dom = loadDom();
  });

  afterEach(() => {
    dom.cleanup();
  });

  it("exposes the filter API and starts with no active filters", () => {
    const { window } = dom;
    expect(typeof window.toggleChip).toBe("function");
    expect(typeof window.clearFilters).toBe("function");
    expect(typeof window.applyFilters).toBe("function");
    expect(window.activeFilters.size).toBe(0);
  });

  it("shows all cards and hides the notice when no filters are active", () => {
    const { window, cards, visibleCards, notice } = dom;
    window.applyFilters();
    expect(visibleCards().length).toBe(cards().length);
    expect(notice().style.display).toBe("none");
  });

  it("with one filter shows only cards whose data-tags include that slug", () => {
    const { window, visibleCards, tagsOf } = dom;
    window.toggleChip("lean");

    const visible = visibleCards();
    expect(visible.length).toBeGreaterThan(0);
    for (const card of visible) {
      expect(tagsOf(card)).toContain("lean");
    }
  });

  it("uses OR (union) semantics across multiple filters, not AND", () => {
    const { window, visibleCards, tagsOf } = dom;
    window.toggleChip("lean");
    window.toggleChip("econ");

    const visible = visibleCards();
    // Every visible card matches at least one selected slug...
    for (const card of visible) {
      const tags = tagsOf(card);
      expect(tags.includes("lean") || tags.includes("econ")).toBe(true);
    }
    // ...and the union is at least as large as either filter alone.
    window.clearFilters();
    window.toggleChip("lean");
    const leanOnly = visibleCards().length;
    expect(visible.length).toBeGreaterThanOrEqual(leanOnly);

    // A card tagged econ-but-not-lean proves it is a union, not an intersection.
    const econNotLean = dom
      .cards()
      .some((c) => tagsOf(c).includes("econ") && !tagsOf(c).includes("lean"));
    if (econNotLean) {
      expect(visible.length).toBeGreaterThan(leanOnly);
    }
  });

  it("renders the notice with singular/plural wording by filter count", () => {
    const { window, noticeText } = dom;

    window.toggleChip("lean");
    expect(noticeText().innerHTML).toContain("competency:");
    expect(noticeText().innerHTML).not.toContain("competencies:");

    window.toggleChip("econ");
    expect(noticeText().innerHTML).toContain("competencies:");
  });

  it("toggleChip is idempotent in pairs and mirrors the .selected class", () => {
    const { window, document } = dom;
    const chip = document.querySelector('.filter-chip[data-slug="lean"]');

    window.toggleChip("lean");
    expect(window.activeFilters.has("lean")).toBe(true);
    expect(chip.classList.contains("selected")).toBe(true);

    window.toggleChip("lean");
    expect(window.activeFilters.has("lean")).toBe(false);
    expect(chip.classList.contains("selected")).toBe(false);
  });

  it("clearFilters resets the Set, chip styling, cards, and notice", () => {
    const { window, document, cards, visibleCards, notice } = dom;
    window.toggleChip("lean");
    window.toggleChip("econ");

    window.clearFilters();

    expect(window.activeFilters.size).toBe(0);
    expect(document.querySelectorAll(".filter-chip.selected").length).toBe(0);
    expect(visibleCards().length).toBe(cards().length);
    expect(notice().style.display).toBe("none");
  });
});
