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
import { poems, themeNames } from "../model/poems";
import { useReader } from "../viewmodel/useReader";
import { Panels } from "./Panels";
import { Scene } from "./Scene";

export function App() {
  const reader = useReader();
  const { poem } = reader;
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
            onClick={() => reader.setPanel("about")}
          >
            <span className="brand-moon" />
            <span>
              sleepy<span className="brand-dot">.</span>
            </span>
          </button>
          <span className="header-note">一首诗，一小片安静。</span>
          <nav className="header-actions" aria-label="阅读工具">
            <button
              type="button"
              className="text-button library-button"
              onClick={() => reader.setPanel("library")}
            >
              <BookOpen size={18} />
              <span>诗集</span>
            </button>
            <span className="toolbar-divider" />
            <button
              type="button"
              className="icon-button"
              title="阅读设置"
              aria-label="阅读设置"
              onClick={() => reader.setPanel("settings")}
            >
              <Type size={19} />
            </button>
            <button
              type="button"
              className="icon-button"
              title={reader.isDark ? "切换到纸白" : "切换到月夜"}
              aria-label={reader.isDark ? "切换到纸白" : "切换到月夜"}
              onClick={reader.toggleTheme}
            >
              {reader.isDark ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              ref={reader.quietTriggerRef}
              type="button"
              className="icon-button quiet-trigger"
              title="沉浸阅读"
              aria-label="沉浸阅读"
              onClick={() => reader.setQuiet(true)}
            >
              <Maximize2 size={18} />
            </button>
          </nav>
        </header>
      )}
      {reader.quiet && (
        <button
          type="button"
          className="quiet-exit icon-button"
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
              onClick={() => reader.setPanel("together")}
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
            <button
              type="button"
              className="dock-caption"
              onClick={() => reader.setPanel("about")}
            >
              <span className="status-dot" />
              <span>留一盏月光，陪你入梦。</span>
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
                onClick={() => reader.setPanel("library")}
              >
                <span>{String(reader.index + 1).padStart(2, "0")}</span>
                <i>/</i>
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
      <Panels reader={reader} />
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
