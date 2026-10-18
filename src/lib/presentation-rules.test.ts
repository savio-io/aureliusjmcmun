import { expect, test } from "bun:test";
import { PORTRAIT_COLOR_DURATION_MS, scrollProgress } from "./presentation-rules";

test("a portrait stays coloured for two seconds after the last tap", () => {
  expect(PORTRAIT_COLOR_DURATION_MS).toBe(2000);
});

test("scroll progress accounts for viewport height and reaches both endpoints", () => {
  expect(scrollProgress(0, 2000, 800)).toBe(0);
  expect(scrollProgress(600, 2000, 800)).toBe(0.5);
  expect(scrollProgress(1200, 2000, 800)).toBe(1);
});

test("short pages have an empty progress bar", () => {
  expect(scrollProgress(0, 600, 800)).toBe(0);
});