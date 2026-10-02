(() => {
  let theme = "system";
  try {
    theme = JSON.parse(localStorage.getItem("sleepy.preferences") || "{}").theme;
  } catch {}
  const dark =
    theme === "dark" ||
    (theme !== "light" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", dark ? "#152927" : "#f4f1ea");
})();
