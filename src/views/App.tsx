import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Heart,
  Maximize2,
  Minimize2,
  Moon,
  Shuffle,
  Sparkles,
  Sun,
  Type,
} from "lucide-preact";
import type { TargetedMouseEvent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { poems, themeNames } from "../model/poems";
import { usePwa } from "../viewmodel/usePwa";
import { type Panel, useReader } from "../viewmodel/useReader";
import { Panels } from "./Panels";
import { Scene } from "./Scene";

export function App() {
  const reader = useReader();
  const pwa = usePwa();
  const { poem } = reader;
  const [tooltipsDismissed, setTooltipsDismissed] = useState(false);
  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTooltipsDismissed(true);
    };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, []);
  const openPanel =
    (panel: Exclude<Panel, null>) => (event: TargetedMouseEvent<HTMLButtonElement>) => {
      event.currentTarget.focus({ preventScroll: true });
      reader.setPanel(panel);
    };
  return (
    <div
      className={`app ${reader.quiet ? "is-quiet" : ""} text-${reader.preferences.textSize}`}
    >
      <a className="skip-link" href="#poem-content">
        跳到诗文
      </a>
      <Scene />
      {!reader.quiet && (
        <header className="site-header">
          <button
            type="button"
            className="brand"
            aria-label="关于 sleepy"
            onClick={openPanel("about")}
          >
            <img
              className="brand-logo"
              src="/logo-80.png"
              width="32"
              height="32"
              alt=""
            />
            <span>
              sleepy<span className="brand-dot">.</span>
            </span>
          </button>
          <span className="header-note">一首诗，一小片安静。</span>
          <nav
            className="header-actions"
            aria-label="阅读工具"
            data-tooltips-dismissed={tooltipsDismissed}
            onMouseLeave={() => setTooltipsDismissed(false)}
            onFocusCapture={() => setTooltipsDismissed(false)}
          >
            <button
              type="button"
              className="text-button library-button"
              aria-label="诗集"
              onClick={openPanel("library")}
            >
              <BookOpen size={18} />
              <span>诗集</span>
            </button>
            <span className="toolbar-divider" />
            <button
              type="button"
              className="icon-button"
              aria-label="阅读设置"
              onClick={openPanel("settings")}
            >
              <Type size={19} />
              <span className="header-tooltip" role="tooltip">
                阅读设置
              </span>
            </button>
            <a
              className="icon-button"
              href="https://hexly.ai/projects/sleepy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="在 hexly.ai 查看 Sleepy（新标签页）"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m12 2 8.66 5v10L12 22l-8.66-5V7Z" />
                <path d="M12 2v20M3.34 7l17.32 10m0-10L3.34 17" />
              </svg>
              <span className="header-tooltip" role="tooltip">
                在 hexly.ai 查看 Sleepy
              </span>
            </a>
            <button
              type="button"
              className="icon-button"
              aria-label={reader.isDark ? "切换到纸白" : "切换到月夜"}
              onClick={reader.toggleTheme}
            >
              {reader.isDark ? <Sun size={19} /> : <Moon size={19} />}
              <span className="header-tooltip" role="tooltip">
                {reader.isDark ? "切换到纸白" : "切换到月夜"}
              </span>
            </button>
            <button
              ref={reader.quietTriggerRef}
              type="button"
              className="icon-button quiet-trigger"
              aria-label="沉浸阅读"
              onClick={reader.enterQuiet}
            >
              <Maximize2 size={18} />
              <span className="header-tooltip" role="tooltip">
                沉浸阅读
              </span>
            </button>
          </nav>
        </header>
      )}
      {reader.quiet && (
        <button
          type="button"
          className="quiet-exit icon-button"
          ref={reader.quietExitRef}
          aria-label="退出沉浸阅读"
          title="退出沉浸阅读 · Esc"
          onClick={reader.exitQuiet}
        >
          <Minimize2 size={19} />
        </button>
      )}
      <main id="poem-content" className="reading-main">
        <div className="chapter-mark" aria-hidden="true">
          <span>诗意入眠</span>
          <i />
          <span>卷 {String(reader.index + 1).padStart(2, "0")}</span>
        </div>
        <article
          className={`poem-page ${poem.lines.length > 8 ? "long-poem" : ""}`}
          key={poem.id}
          aria-labelledby="poem-title"
        >
          <div className="poem-kicker">
            <span className="tiny-star">✧</span>
            {themeNames[poem.theme]}
            <span className="kicker-rule" />
          </div>
          <div className="poem-heading">
            <h1 id="poem-title" ref={reader.headingRef} tabIndex={-1}>
              {poem.title}
            </h1>
            <p className="poet">
              {poem.era}
              <span>·</span>
              {poem.author}
              {poem.excerpt && <span className="excerpt-tag">节选</span>}
            </p>
          </div>
          <div className="poem-lines">
            {poem.lines.map((line, index) => (
              <p key={`${poem.id}-${index}`}>{line}</p>
            ))}
          </div>
          {poem.excerpt && <p className="excerpt-note">{poem.excerpt}</p>}
          <div className="poem-afterword">
            <span className="poem-seal" aria-hidden="true">
              眠
            </span>
            <span>读给孩子，也读给自己。</span>
            <button
              type="button"
              className={`icon-button favorite-button ${reader.isFavorite ? "is-saved" : ""}`}
              aria-label={reader.isFavorite ? "从心藏移出" : "藏起这首诗"}
              aria-pressed={reader.isFavorite}
              onClick={reader.toggleFavorite}
            >
              <Heart size={18} fill={reader.isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
          {!reader.quiet && (
            <button
              type="button"
              className="together-button"
              onClick={openPanel("together")}
            >
              <span className="together-icon">
                <Sparkles size={17} />
              </span>
              <span>
                和孩子一起读<span className="together-subtitle">一句诗，一句晚安</span>
              </span>
              <ArrowUpRight size={17} />
            </button>
          )}
          {poem.lines.length > 8 && (
            <a
              className="poem-source"
              href={poem.source}
              target="_blank"
              rel="noreferrer"
            >
              诗文出处 <ArrowUpRight size={12} />
            </a>
          )}
        </article>
        <div className="side-inscription" aria-hidden="true">
          <span>把一首诗</span>
          <span>读慢一点</span>
          <i />
        </div>
      </main>
      {!reader.quiet && (
        <footer className="reading-dock">
          <div className="dock-inner">
            <button type="button" className="dock-caption" onClick={openPanel("about")}>
              <span className="status-dot" />
              <span>
                {pwa.ready
                  ? pwa.offline
                    ? "离线也有诗，安心慢慢读。"
                    : "诗集已备好，离线也能读。"
                  : "留一盏月光，陪你入梦。"}
              </span>
            </button>
            <nav className="page-navigation" aria-label="翻阅诗集">
              <button
                type="button"
                className="icon-button"
                aria-label="上一首"
                onClick={() => reader.turnPage(-1)}
              >
                <ArrowLeft size={19} />
              </button>
              <button
                type="button"
                className="page-count"
                aria-label={`打开诗集，当前第 ${reader.index + 1} 首，共 ${poems.length} 首`}
                onClick={openPanel("library")}
              >
                <span>{String(reader.index + 1).padStart(2, "0")}</span>
                <i aria-hidden="true">/</i>
                {String(poems.length).padStart(2, "0")}
              </button>
              <button
                type="button"
                className="icon-button"
                aria-label="下一首"
                onClick={() => reader.turnPage(1)}
              >
                <ArrowRight size={19} />
              </button>
            </nav>
            <button
              type="button"
              className="text-button surprise-button"
              onClick={reader.surprise}
            >
              <Shuffle size={16} />
              <span>偶遇一首</span>
            </button>
          </div>
        </footer>
      )}
      {reader.quiet && (
        <div className="quiet-navigation">
          <button
            type="button"
            className="icon-button"
            aria-label="上一首"
            onClick={() => reader.turnPage(-1)}
          >
            <ArrowLeft size={18} />
          </button>
          <span>{String(reader.index + 1).padStart(2, "0")}</span>
          <button
            type="button"
            className="icon-button"
            aria-label="下一首"
            onClick={() => reader.turnPage(1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      )}
      <Panels reader={reader} pwa={pwa} />
      {pwa.needRefresh && !pwa.updateDismissed && (
        <aside className="update-prompt" aria-label="诗集更新">
          <span>
            {pwa.updateError
              ? "这次更新没有成功，请稍后再试。"
              : "诗集有更新，读完再翻开。"}
          </span>
          <button type="button" className="text-button" onClick={pwa.dismissUpdate}>
            稍后
          </button>
          <button
            type="button"
            className="update-button"
            disabled={pwa.updating}
            onClick={() => void pwa.update()}
          >
            {pwa.updating ? "正在更新" : "刷新诗集"}
          </button>
        </aside>
      )}
      <div
        className={`toast ${reader.notice ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {reader.notice}
      </div>
    </div>
  );
}
