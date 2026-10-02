import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Heart,
  Moon,
  Search,
  Sun,
} from "lucide-preact";
import { poems, themes } from "../model/poems";
import type { ColorPreference, TextSize } from "../model/preferences";
import type { Reader } from "../viewmodel/useReader";
import { Dialog } from "./Dialog";

export function Panels({ reader }: { reader: Reader }) {
  const { panel, setPanel, poem, preferences, setPreferences } = reader;
  const close = () => setPanel(null);
  if (panel === "library")
    return (
      <Dialog
        title="挑一首，慢慢读"
        eyebrow="THE LITTLE ANTHOLOGY / 小小诗集"
        onClose={close}
        className="library-sheet"
      >
        <label className="search-box">
          <Search size={19} />
          <span className="sr-only">搜索诗名、诗人或诗句</span>
          <input
            data-initial-focus
            type="search"
            placeholder="诗名、诗人，或记得的那一句"
            value={reader.query}
            onInput={(event) => reader.setQuery(event.currentTarget.value)}
            autoComplete="off"
          />
        </label>
        <fieldset className="filter-list" aria-label="诗集分类">
          {themes.map((theme) => (
            <button
              type="button"
              key={theme.id}
              aria-pressed={reader.filter === theme.id}
              onClick={() => reader.setFilter(theme.id)}
            >
              {theme.id === "favorites" && <Heart size={13} />}
              {theme.label}
            </button>
          ))}
        </fieldset>
        <div className="collection-meta">
          <span>{reader.filteredPoems.length} 首诗，等你翻开</span>
          <span>字里行间，都是好时光</span>
        </div>
        <div className="poem-list">
          {reader.filteredPoems.map((item, index) => (
            <button
              type="button"
              className="poem-list-item"
              key={item.id}
              aria-current={item.id === poem.id ? "true" : undefined}
              onClick={() => reader.choosePoem(item.id)}
            >
              <span className="list-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="list-poem">
                <span className="list-poem-title">
                  {item.title}
                  {item.excerpt && <small>节选</small>}
                </span>
                <span className="list-poem-preview">
                  {item.lines.slice(0, 2).join("")}
                </span>
              </span>
              <span className="list-poet">{item.author}</span>
              <span className="list-current">
                {item.id === poem.id ? (
                  <Check size={17} />
                ) : preferences.favorites.includes(item.id) ? (
                  <Heart size={15} fill="currentColor" />
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </span>
            </button>
          ))}
          {reader.filteredPoems.length === 0 && (
            <div className="empty-state">
              <BookOpen size={28} />
              <p>
                {reader.filter === "favorites" && !reader.query
                  ? "把喜欢的诗，轻轻放进心藏。"
                  : "还没有找到这一句。"}
              </p>
              <span>
                {reader.filter === "favorites" && !reader.query
                  ? "读诗时点一下爱心，就能在这里重逢。"
                  : "试试诗人的名字，或换几个字找找。"}
              </span>
            </div>
          )}
        </div>
        <p className="collection-footnote">古人的诗，今天的晚安。诗经节选均已注明。</p>
      </Dialog>
    );
  if (panel === "together")
    return (
      <Dialog
        title="陪你，把这首诗读慢"
        eyebrow="A LITTLE TIME TOGETHER / 一起读"
        onClose={close}
      >
        <div className="together-poem">
          <span>
            {poem.title}
            {poem.excerpt ? " · 节选" : ""}
          </span>
          <span>
            {poem.era} · {poem.author}
          </span>
        </div>
        <section className="reading-note">
          <h3>
            <span>01</span> 先听见诗里的声音
          </h3>
          <p>{poem.reading}</p>
        </section>
        {poem.words && (
          <div className="word-notes">
            {poem.words.map((word) => (
              <div key={word.word}>
                <ruby>
                  {word.word}
                  <rt>{word.pinyin}</rt>
                </ruby>
                <span>{word.meaning}</span>
              </div>
            ))}
          </div>
        )}
        <section className="reading-note">
          <h3>
            <span>02</span> 聊一句就好
          </h3>
          <p>{poem.question}</p>
          <small>没有标准答案，也可以只是一起静静想一想。</small>
        </section>
        <section className="bedtime-note">
          <div className="bedtime-title">
            <h3>
              <Moon size={16} /> 然后，轻轻说晚安
            </h3>
            <button
              type="button"
              className="icon-button"
              aria-label="复制晚安话"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(poem.bedtime);
                  reader.announce("晚安话已复制");
                } catch {
                  reader.announce("未能复制，可以长按文字选择");
                }
              }}
            >
              <Copy size={16} />
            </button>
          </div>
          <p>{poem.bedtime}</p>
        </section>
        <p className="small-print">
          用你熟悉的声音就好。不用背完，不必讲懂；孩子困了，就把诗留到明天。
        </p>
      </Dialog>
    );
  if (panel === "settings") {
    const colors: { id: ColorPreference; label: string }[] = [
      { id: "system", label: "随系统" },
      { id: "light", label: "纸白" },
      { id: "dark", label: "月夜" },
    ];
    const sizes: { id: TextSize; label: string }[] = [
      { id: "regular", label: "适中" },
      { id: "large", label: "大字" },
      { id: "larger", label: "更大" },
    ];
    return (
      <Dialog
        title="读得舒服一点"
        eyebrow="MAKE YOURSELF AT HOME / 阅读设置"
        onClose={close}
      >
        <fieldset className="setting-group">
          <legend>一页的光</legend>
          <div className="segmented-control">
            {colors.map((color) => (
              <button
                type="button"
                key={color.id}
                aria-pressed={preferences.theme === color.id}
                onClick={() =>
                  setPreferences((current) => ({ ...current, theme: color.id }))
                }
              >
                {color.id === "dark" ? (
                  <Moon size={16} />
                ) : color.id === "light" ? (
                  <Sun size={16} />
                ) : (
                  <span className="system-circle" />
                )}
                {color.label}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset className="setting-group">
          <legend>字大一些，靠近一些</legend>
          <div className="segmented-control size-options">
            {sizes.map((size) => (
              <button
                type="button"
                key={size.id}
                aria-pressed={preferences.textSize === size.id}
                onClick={() =>
                  setPreferences((current) => ({ ...current, textSize: size.id }))
                }
              >
                <span className={`size-preview ${size.id}`}>诗</span>
                {size.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className={`type-preview text-${preferences.textSize}`}>
          明月松间照
          <br />
          清泉石上流
        </p>
        <p className="small-print">
          {reader.storageAvailable
            ? "阅读偏好与心藏只保存在这台设备的浏览器里。"
            : "浏览器暂时无法保存偏好。仍可正常阅读，关闭后设置可能不会保留。"}
        </p>
        <button
          type="button"
          className="text-link about-link"
          onClick={() => setPanel("about")}
        >
          关于 sleepy · 添加到主屏幕 <ArrowUpRight size={14} />
        </button>
      </Dialog>
    );
  }
  if (panel === "about")
    return (
      <Dialog title="留一点时间，给一首诗" eyebrow="SLEEPY / 诗意入眠" onClose={close}>
        <p className="about-intro">给孩子读一首诗，也让忙了一天的自己，慢慢安静下来。</p>
        <section className="reading-note">
          <h3>把诗集放在手边</h3>
          <p>
            iPhone / iPad：在 Safari
            中打开本站，点“分享”，选择“添加到主屏幕”，再从桌面图标打开。
          </p>
          <p>
            Android / 桌面：在浏览器菜单中选择“安装应用”或“添加到主屏幕”（如浏览器支持）。
          </p>
          <small>
            主屏幕模式可提供更完整的阅读空间。普通 Safari
            页面的地址栏与系统状态栏仍由系统管理。
          </small>
        </section>
        <section className="reading-note">
          <h3>关于这些诗</h3>
          <p>
            收录 {poems.length}{" "}
            首古典诗词，以公版原作为底本，转换为简体。节选、异文和出处逐首注明；陪读与晚安话为本站原创。
          </p>
          <p>
            软件代码采用 MIT 许可，古诗原文不因此被重新授权为
            MIT。本站未收录传播许可尚未核实的现代诗词全文。
          </p>
          <small>字体源自 Noto Serif CJK，依 SIL Open Font License 1.1 分发。</small>
        </section>
        <section className="reading-note">
          <h3>安静，也安心</h3>
          <p>
            没有账号、广告、追踪统计和后台存储，也不会自动播放声音。心藏与阅读偏好只留在你的浏览器。
          </p>
        </section>
        <a
          className="text-link"
          href="https://github.com/nocoo/sleepy"
          target="_blank"
          rel="noreferrer"
        >
          在 GitHub 看看 sleepy <ArrowUpRight size={14} />
        </a>
      </Dialog>
    );
  return null;
}
