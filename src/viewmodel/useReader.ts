import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { poems, type Theme } from "../model/poems";
import {
  defaultPoemId,
  poemFromHash,
  readPreferences,
  writePreferences,
} from "../model/preferences";

export type Panel = "library" | "together" | "settings" | "about" | null;

export function useReader() {
  const [preferences, setPreferences] = useState(readPreferences);
  const [poemId, setPoemId] = useState(
    () => poemFromHash() || preferences.lastPoem || defaultPoemId,
  );
  const [panel, setPanel] = useState<Panel>(null);
  const [quiet, setQuiet] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Theme | "all" | "favorites">("all");
  const [systemDark, setSystemDark] = useState(
    () => matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const [notice, setNotice] = useState("");
  const [storageAvailable, setStorageAvailable] = useState(true);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const quietTriggerRef = useRef<HTMLButtonElement>(null);
  const index = Math.max(
    0,
    poems.findIndex((poem) => poem.id === poemId),
  );
  const poem = poems[index] || poems[0];
  if (!poem) throw new Error("The poetry collection must not be empty.");
  const isDark =
    preferences.theme === "dark" || (preferences.theme === "system" && systemDark);
  const isFavorite = preferences.favorites.includes(poemId);

  const announce = useCallback((message: string) => {
    clearTimeout(noticeTimer.current);
    setNotice(message);
    noticeTimer.current = setTimeout(() => setNotice(""), 3200);
  }, []);

  const choosePoem = useCallback((id: string) => {
    if (!poems.some((item) => item.id === id)) return;
    setPoemId(id);
    setPanel(null);
    history.replaceState(null, "", `#${id}`);
    setPreferences((current) => ({ ...current, lastPoem: id }));
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }, []);

  const turnPage = useCallback(
    (direction: number) => {
      const next = poems[(index + direction + poems.length) % poems.length];
      if (next) choosePoem(next.id);
    },
    [choosePoem, index],
  );

  const surprise = () => {
    const step = 1 + Math.floor(Math.random() * (poems.length - 1));
    turnPage(step);
  };

  const toggleFavorite = () => {
    setPreferences((current) => ({
      ...current,
      favorites: isFavorite
        ? current.favorites.filter((id) => id !== poemId)
        : [...current.favorites, poemId],
    }));
    announce(isFavorite ? "已从心藏中移出" : "这首诗，已放进心藏");
  };

  const toggleTheme = () => {
    setPreferences((current) => ({ ...current, theme: isDark ? "light" : "dark" }));
  };

  const exitQuiet = useCallback(() => {
    setQuiet(false);
    requestAnimationFrame(() => quietTriggerRef.current?.focus({ preventScroll: true }));
  }, []);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#152927" : "#f4f1ea");
  }, [isDark]);

  useEffect(() => {
    setStorageAvailable(writePreferences(preferences));
  }, [preferences]);

  useEffect(() => {
    const onHash = () => {
      const id = poemFromHash();
      if (id) choosePoem(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [choosePoem]);

  useEffect(() => {
    document.title = `${poem.title} · sleepy`;
  }, [poem.title]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        panel ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        (target instanceof HTMLElement &&
          target.closest("input, textarea, select, button, a, [contenteditable]"))
      )
        return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        turnPage(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        turnPage(-1);
      }
      if (event.key === "Escape" && quiet) exitQuiet();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exitQuiet, panel, quiet, turnPage]);

  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filteredPoems = poems.filter((item) => {
    const matchesTheme =
      filter === "all" ||
      item.theme === filter ||
      (filter === "favorites" && preferences.favorites.includes(item.id));
    return (
      matchesTheme &&
      (!normalizedQuery ||
        `${item.title}${item.author}${item.era}${item.lines.join("")}`
          .toLocaleLowerCase()
          .includes(normalizedQuery))
    );
  });

  return {
    poem,
    index,
    preferences,
    setPreferences,
    isDark,
    isFavorite,
    panel,
    setPanel,
    quiet,
    setQuiet,
    exitQuiet,
    query,
    setQuery,
    filter,
    setFilter,
    filteredPoems,
    choosePoem,
    turnPage,
    surprise,
    toggleFavorite,
    toggleTheme,
    notice,
    announce,
    storageAvailable,
    headingRef,
    quietTriggerRef,
  };
}

export type Reader = ReturnType<typeof useReader>;
