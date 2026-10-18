import { test } from "node:test";
import { strict as assert } from "node:assert";
import { PORTRAIT_COLOR_DURATION_MS, scrollProgress } from "./presentation-rules";

test("a portrait stays coloured for two seconds after the last tap", () => {
  assert.equal(PORTRAIT_COLOR_DURATION_MS, 2000);
});

test("scroll progress accounts for viewport height and reaches both endpoints", () => {
  assert.equal(scrollProgress(0, 2000, 800), 0);
  assert.equal(scrollProgress(600, 2000, 800), 0.5);
  assert.equal(scrollProgress(1200, 2000, 800), 1);
});

test("short pages have an empty progress bar", () => {
  assert.equal(scrollProgress(0, 600, 800), 0);
});
