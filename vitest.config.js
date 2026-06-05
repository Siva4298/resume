import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Each test builds its own JSDOM instance from index.html, so the default
    // node environment is all we need.
    environment: "node",
    globals: true,
  },
});
