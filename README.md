<p align="center"><img src="assets/brand/icon-rounded.png" width="240" alt="Sleepy logo" /></p>
<h1 align="center">sleepy</h1>
<p align="center">和孩子一起，把一首诗读慢一点。</p>
<p align="center"><a href="https://sleepy.hexly.ai">在线读诗</a> · <a href="docs/README.en.md">English</a></p>

## 这是什么

Sleepy 是给家长和孩子一起使用的中文古诗阅读器。精选 30 首古典诗词，一次读一首；大字、纸白与月夜主题，让诗文留在页面中央。

这是一个纯静态网站，没有账号、广告、追踪统计、自动播放声音或 AI 后端。心藏与阅读偏好只保存在当前浏览器，不跨设备同步。

## 功能

- 完整诗文与自然滚动；长诗不会被裁切，诗经节选与异文逐首注明。
- 按主题浏览，按诗名、诗人或诗句搜索，把喜欢的诗加入心藏。
- 纸白、月夜与随系统主题，三档字号，以及隐藏工具栏的沉浸阅读。
- 原创陪读提示、部分字词注音、聊天问题与可复制的晚安话。
- 支持安装的浏览器可将网站添加到主屏幕；首次保存完成后，整本诗集、字体与阅读素材可离线使用。
- 有新版本时由读者选择刷新，不打断正在读的诗。

## 使用

打开 [sleepy.hexly.ai](https://sleepy.hexly.ai)，用翻页按钮选择一首诗，或从「诗集」中搜索。点「一起读」查看陪读提示，点页面左上角的 sleepy 查看离线保存状态与安装说明。

首次使用需要联网，等「关于」面板显示整本诗集已备好，再离线阅读。iPhone / iPad 请在 Safari 中选择「分享 → 添加到主屏幕」；其他支持安装的浏览器可使用菜单中的「安装应用」。

主屏幕模式提供更完整的阅读空间，普通 Safari 的地址栏仍由系统控制。浏览器清理网站数据或回收存储空间后，需要联网重新保存；心藏与偏好也可能被清除。

## 开发

需要 Node.js 22.12+ 和 Bun 1.4.0；已验证的发布环境使用 Node.js 26.9.0。

```sh
bun install --frozen-lockfile
bun run dev
```

在作者的本机网络中，通过批准的镜像安装，不修改锁文件中的 registry：

```sh
BUN_CONFIG_REGISTRY=https://packagefeedproxy.microsoft.io/npm/ bun install --frozen-lockfile
```

`dev` 仅监听本机回环地址。预览实际 Workers 静态资源行为：

```sh
bun run build
bun run preview
```

预览地址为 `http://127.0.0.1:4173`。`/api/live` 是构建生成的健康 JSON，包含状态、包版本与 Git SHA，使用 `no-store`；它证明静态资源交付，不探测外部依赖。`/release.json` 另含构建时的工作区状态。普通 Vite 开发服务器不生成这两个文件。

品牌母版与来源记录位于 `logo.png` 和 `assets/brand/`。安装 Pillow 后，在仓库根目录运行 `python3 scripts/build-icons.py`，生成透明页头与 favicon、带背景的 PWA 平台图标。

## 测试

```sh
bun run check
bunx playwright install chromium webkit
bun run test:e2e
```

`check` 依次运行 TypeScript 类型检查、Biome 和生产构建。浏览器测试要求先构建，覆盖 Chromium 与 WebKit 视口、阅读与面板交互、主题、键盘、离线、更新和静态资源响应。浏览器视口测试不等于真机验证；WebKit 离线边界见验证文档。

## 技术栈

- Preact 与 TypeScript：按 Model / ViewModel / View 分离诗文、阅读状态与界面。
- Vite 与 Biome：构建、代码格式与静态检查。
- Workbox：预缓存整本诗集及阅读素材；不提供导航回退。
- Cloudflare Workers Static Assets：只交付 `dist`，不使用 D1、KV、R2 或应用密钥。
- Playwright 与 axe-core：浏览器交互和可访问性检查。

## 文档

- [产品与架构](docs/design.md)
- [验证范围与部署流程](docs/verification.md)
- [诗文来源、字体与第三方许可](docs/content.md)
- [品牌来源记录](assets/brand/provenance.json)

唯一生产域名为 `https://sleepy.hexly.ai`，Worker 名为 `sleepy`。生产发布需要独立审查、目标提交的 CI 与干净构建；不因 README 或品牌调整自动发布。

## 许可证

应用代码与原创陪读内容采用 [MIT](LICENSE)。古典诗文不作为原创 MIT 作品重新授权；Noto Serif 字体子集遵循 [SIL OFL 1.1](public/fonts/OFL.txt)，Lucide 图标保留 ISC 与适用的 Feather MIT 声明。完整运行时第三方声明随站点提供，见 [THIRD_PARTY_NOTICES.txt](public/THIRD_PARTY_NOTICES.txt)。
