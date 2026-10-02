import { poems } from "./poems";

export type ColorPreference = "system" | "light" | "dark";
export type TextSize = "regular" | "large" | "larger";

export interface Preferences {
  theme: ColorPreference;
  textSize: TextSize;
  favorites: string[];
  lastPoem: string;
}

export const preferenceKey = "sleepy.preferences";
export const defaultPoemId = "jing-ye-si";
const ids = new Set(poems.map((poem) => poem.id));

export function readPreferences(): Preferences {
  const defaults: Preferences = {
    theme: "system",
    textSize: "large",
    favorites: [],
    lastPoem: defaultPoemId,
  };
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(preferenceKey) || "null");
    if (!saved || typeof saved !== "object") return defaults;
    const value = saved as Record<string, unknown>;
    return {
      theme: value.theme === "light" || value.theme === "dark" ? value.theme : "system",
      textSize:
        value.textSize === "regular" || value.textSize === "larger"
          ? value.textSize
          : "large",
      favorites: Array.isArray(value.favorites)
        ? [
            ...new Set(
              value.favorites.filter(
                (id): id is string => typeof id === "string" && ids.has(id),
              ),
            ),
          ]
        : [],
      lastPoem:
        typeof value.lastPoem === "string" && ids.has(value.lastPoem)
          ? value.lastPoem
          : defaultPoemId,
    };
  } catch {
    return defaults;
  }
}

export function writePreferences(preferences: Preferences): boolean {
  try {
    localStorage.setItem(preferenceKey, JSON.stringify(preferences));
    return true;
  } catch {
    return false;
  }
}

export function poemFromHash(): string | undefined {
  const id = location.hash.slice(1);
  return ids.has(id) ? id : undefined;
}
