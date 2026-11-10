import { describe, expect, test } from "bun:test";
import { coercePreferences, defaultPoemId } from "./preferences";

describe("coercePreferences", () => {
  test("returns defaults for missing or malformed input", () => {
    expect(coercePreferences(null)).toEqual({
      theme: "system",
      textSize: "large",
      favorites: [],
      lastPoem: defaultPoemId,
    });
    expect(coercePreferences("not-json")).toEqual({
      theme: "system",
      textSize: "large",
      favorites: [],
      lastPoem: defaultPoemId,
    });
  });

  test("accepts explicit theme and text size", () => {
    expect(
      coercePreferences({
        theme: "dark",
        textSize: "larger",
        favorites: [],
        lastPoem: defaultPoemId,
      }),
    ).toEqual({
      theme: "dark",
      textSize: "larger",
      favorites: [],
      lastPoem: defaultPoemId,
    });
  });

  test("drops unknown poems and deduplicates favorites", () => {
    expect(
      coercePreferences({
        favorites: ["jing-ye-si", "missing-poem", "jing-ye-si", 42],
        lastPoem: "also-missing",
      }),
    ).toEqual({
      theme: "system",
      textSize: "large",
      favorites: ["jing-ye-si"],
      lastPoem: defaultPoemId,
    });
  });
});
