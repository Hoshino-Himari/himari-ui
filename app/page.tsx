import Link from "next/link";
import { categories, registry, entriesByCategory } from "@/lib/registry";
import { shadcnAddCommand } from "@/lib/site";
import { CopyButton } from "@/components/site/copy-button";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 sm:px-6">
      {/* Hero */}
      <section className="border-b border-line py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 font-mono text-sm text-accent">
            {registry.length} 個元件 · {categories.length} 個分類 · 全繁體中文
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-ink sm:text-6xl">
            複製即用的
            <br />
            React 動效元件庫
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-mute sm:text-lg">
            每個元件都是一個完整自足的檔案：React + Tailwind
            CSS，複製貼進任何專案就能跑。丟給 Codex 或任何 AI
            工具，它也能直接看懂、直接做出來。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/components"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-all duration-(--dur-fast) ease-(--ease-out) hover:bg-accent-strong active:translate-y-px"
            >
              瀏覽元件
            </Link>
            <Link
              href="/resources"
              className="rounded-lg border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-(--dur-fast) hover:bg-paper-3"
            >
              開源資源目錄
            </Link>
          </div>
        </div>
      </section>

      {/* 分類總覽 */}
      <section className="py-16">
        <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-ink">
          分類目錄
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((cat) => {
            const items = entriesByCategory(cat.id);
            return (
              <Link
                key={cat.id}
                href={`/components#${cat.id}`}
                className="group rounded-xl border border-line bg-paper-2 p-5 transition-all duration-(--dur-base) ease-(--ease-out) hover:-translate-y-0.5 hover:border-line-strong hover:bg-paper-3"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {cat.name}
                  </h3>
                  <span className="font-mono text-xs text-accent">
                    {items.length}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ink-mute">
                  {cat.description}
                </p>
                <p className="mt-4 text-xs text-ink-faint transition-colors duration-(--dur-fast) group-hover:text-accent">
                  查看全部 →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 使用方式 */}
      <section className="border-t border-line py-16">
        <h2 className="mb-8 font-display text-2xl font-bold tracking-tight text-ink">
          三步驟開始用
        </h2>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "找到元件",
              body: "從分類目錄或側欄搜尋找到你要的效果，先看即時預覽確認動態。",
            },
            {
              step: "2",
              title: "複製程式碼",
              body: "切到「程式碼」分頁一鍵複製整個檔案，需要的 npm 套件都列在安裝區。",
            },
            {
              step: "3",
              title: "貼進專案",
              body: "存成 components/ui/ 底下的檔案直接 import，或整段丟給 Codex 請它幫你組進頁面。",
            },
          ].map((s) => (
            <li
              key={s.step}
              className="rounded-xl border border-line bg-paper-2 p-5"
            >
              <span className="font-mono text-sm text-accent">{s.step}</span>
              <h3 className="mt-2 font-display text-base font-bold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-mute">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 給 AI 與 CLI 的入口 */}
      <section className="border-t border-line py-16">
        <h2 className="mb-3 font-display text-2xl font-bold tracking-tight text-ink">
          給 CLI 與 AI 用
        </h2>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-ink-mute">
          整個元件庫也以機器可讀的形式開放。用 shadcn CLI 一行裝進專案，或把
          <code className="mx-1 rounded bg-paper-3 px-1.5 py-0.5 font-mono text-xs text-ink">
            llms.txt
          </code>
          丟給 Codex、Claude、Cursor，它就知道有哪些元件、怎麼裝、原始碼在哪。
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              href: "/llms.txt",
              title: "llms.txt",
              body: "全部元件的說明、相依與原始碼網址，一份純文字讀完。",
            },
            {
              href: "/r/registry.json",
              title: "registry.json",
              body: "shadcn 格式的全站索引，可直接接進自己的工具鏈。",
            },
            {
              href: "/r/globe.tsx",
              title: "/r/<slug>.tsx",
              body: "任一元件的純文字原始碼，curl 得到什麼就是專案裡跑的什麼。",
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-line bg-paper-2 p-5 transition-all duration-(--dur-base) ease-(--ease-out) hover:-translate-y-0.5 hover:border-line-strong hover:bg-paper-3"
            >
              <h3 className="font-mono text-sm text-accent">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-mute">
                {item.body}
              </p>
            </a>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper-2 px-4 py-3">
          <span className="shrink-0 text-sm text-ink-mute">一行安裝：</span>
          <code className="min-w-0 flex-1 overflow-x-auto font-mono text-xs text-ink">
            {shadcnAddCommand("globe")}
          </code>
          <CopyButton text={shadcnAddCommand("globe")} label="複製指令" />
        </div>
      </section>

      <footer className="border-t border-line py-10 text-sm text-ink-faint">
        Himari UI — 個人整理的繁體中文元件庫。收錄之開源元件均已標註出處與授權。
      </footer>
    </main>
  );
}
