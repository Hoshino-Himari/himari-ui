import type { Metadata } from "next";
import Link from "next/link";
import { categories, entriesByCategory } from "@/lib/registry";

export const metadata: Metadata = {
  title: "元件總覽",
  description: "全部元件依分類排列，點進去看即時預覽與完整程式碼。",
};

export default function ComponentsIndexPage() {
  return (
    <main>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
        元件總覽
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-mute">
        依分類排列，每個元件都有即時預覽、完整程式碼與相依套件說明。
      </p>
      {categories.map((cat) => {
        const items = entriesByCategory(cat.id);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} id={cat.id} className="mt-12 scroll-mt-20">
            <div className="mb-5 flex items-baseline gap-3">
              <h2 className="font-display text-xl font-bold text-ink">
                {cat.name}
              </h2>
              <span className="text-sm text-ink-faint">{cat.nameEn}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/components/${item.slug}`}
                  className="group rounded-xl border border-line bg-paper-2 p-5 transition-all duration-(--dur-base) ease-(--ease-out) hover:-translate-y-0.5 hover:border-line-strong hover:bg-paper-3"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-bold text-ink">{item.name}</h3>
                    <span className="truncate font-mono text-[11px] text-ink-faint">
                      {item.nameEn}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-mute">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
