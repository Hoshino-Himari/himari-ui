import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "開源資源目錄",
  description: "精選的開源 UI 元件庫與工具，附授權與適用情境說明。",
};

type Resource = {
  name: string;
  url: string;
  tag: string;
  license: string;
  description: string;
};

const resources: Resource[] = [
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    tag: "元件庫",
    license: "MIT",
    description:
      "複製即用的 Radix + Tailwind 元件集，不是 npm 套件而是直接把原始碼放進你的專案，客製自由度最高。",
  },
  {
    name: "MagicUI",
    url: "https://magicui.design",
    tag: "動效元件",
    license: "MIT",
    description:
      "150+ 個 React + Tailwind + Motion 動效元件，Globe、Marquee、Border Beam 都出自這裡，跟 shadcn/ui 無縫搭配。",
  },
  {
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    tag: "動效元件",
    license: "免費使用",
    description: "以視覺衝擊力見長的動效元件：3D 卡片、聚光燈、光束背景，適合做形象頁與 Landing Page。",
  },
  {
    name: "React Bits",
    url: "https://reactbits.dev",
    tag: "動效元件",
    license: "MIT",
    description: "動畫文字、互動背景與創意元件的大合集，每個元件提供 JS/TS、CSS/Tailwind 四種版本。",
  },
  {
    name: "Origin UI",
    url: "https://originui.com",
    tag: "元件庫",
    license: "MIT",
    description: "500+ 個 Tailwind 元件片段，按鈕、輸入框、日曆、表格等基礎件非常齊全，複製即用。",
  },
  {
    name: "Uiverse",
    url: "https://uiverse.io",
    tag: "CSS 元件",
    license: "MIT",
    description: "社群貢獻的數千個純 CSS/HTML 小元件（按鈕、開關、載入動畫），不綁框架，任何專案都能貼。",
  },
  {
    name: "Cult UI",
    url: "https://www.cult-ui.com",
    tag: "動效元件",
    license: "MIT",
    description: "shadcn 風格的進階動效元件，Dock、Shader 卡片、動態家族按鈕等較少見的設計。",
  },
  {
    name: "HeroUI",
    url: "https://www.heroui.com",
    tag: "元件庫",
    license: "MIT",
    description: "前身是 NextUI，完整的 React 元件系統（npm 套件形式），內建深色模式與動效。",
  },
  {
    name: "daisyUI",
    url: "https://daisyui.com",
    tag: "CSS 元件",
    license: "MIT",
    description: "Tailwind 的語意化元件外掛，用 btn、card 這種 class 名就能組出介面，主題切換超快。",
  },
  {
    name: "HyperUI",
    url: "https://www.hyperui.dev",
    tag: "CSS 元件",
    license: "MIT",
    description: "免費的 Tailwind HTML 區塊集合：行銷區塊、電商卡片、表單版型，複製 HTML 就能用。",
  },
  {
    name: "Motion",
    url: "https://motion.dev",
    tag: "動畫引擎",
    license: "MIT",
    description: "Framer Motion 的後繼者，React 動畫的事實標準。本站多數動效元件都建立在它之上。",
  },
  {
    name: "Tremor",
    url: "https://tremor.so",
    tag: "圖表",
    license: "Apache-2.0",
    description: "做儀表板專用的 React 圖表與 KPI 元件庫，搭 Tailwind，適合後台與數據頁。",
  },
  {
    name: "CanvasUI",
    url: "https://canvasui.dev",
    tag: "WebGL 特效",
    license: "依官網",
    description: "40+ 個 Canvas/WebGL 創意特效：液體模擬、玻璃折射、粒子與 ASCII 渲染，不綁框架。",
  },
  {
    name: "GodUI",
    url: "https://godui.design",
    tag: "動效元件",
    license: "依官網",
    description: "進度摺疊按鈕等精緻 3D 動效元件的來源，AI 介面與協作元件的設計參考。",
  },
];

export default function ResourcesPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
        開源資源目錄
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-mute">
        本站元件之外，這些是值得收藏的開源 UI
        資源。使用前請自行確認各專案當下的授權條款。
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {resources.map((r) => (
          <a
            key={r.name}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group rounded-xl border border-line bg-paper-2 p-5 transition-all duration-(--dur-base) ease-(--ease-out) hover:-translate-y-0.5 hover:border-line-strong hover:bg-paper-3"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-bold text-ink group-hover:text-accent">
                {r.name}
              </h2>
              <span className="rounded-full border border-line px-2 py-0.5 text-[11px] text-ink-faint">
                {r.tag}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-mute">
              {r.description}
            </p>
            <p className="mt-3 font-mono text-[11px] text-ink-faint">
              授權：{r.license}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
