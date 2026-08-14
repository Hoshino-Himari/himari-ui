import type { Metadata } from "next";
import Link from "next/link";
import { categories, entriesByCategory } from "@/lib/registry";
import { isHeavyDemo } from "@/lib/heavy-demos";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { LazyDemo } from "@/components/site/lazy-demo";

const DESCRIPTION =
  "全部元件依分類排列，每張卡片都是即時預覽，點進去看完整程式碼。";

export const metadata: Metadata = {
  title: "元件總覽",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/components` },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: SITE_NAME,
    title: "元件總覽",
    description: DESCRIPTION,
    url: `${SITE_URL}/components`,
  },
  twitter: {
    card: "summary_large_image",
    title: "元件總覽",
    description: DESCRIPTION,
  },
};

export default function ComponentsIndexPage() {
  return (
    <main>
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
        元件總覽
      </h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-mute">
        每張卡片都是真的在跑的元件，可以直接互動。捲到哪裡才載到哪裡；吃 WebGL
        的元件標了「滑入播放」，滑鼠移上去才啟動。
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
              <span className="font-mono text-xs text-ink-faint">
                {items.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.slug}
                  className="group overflow-hidden rounded-xl border border-line bg-paper-2 transition-colors duration-(--dur-base) ease-(--ease-out) hover:border-line-strong"
                >
                  <LazyDemo slug={item.slug} heavy={isHeavyDemo(item)} />
                  <Link
                    href={`/components/${item.slug}`}
                    className="block border-t border-line p-4 transition-colors duration-(--dur-fast) hover:bg-paper-3"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-bold text-ink transition-colors duration-(--dur-fast) group-hover:text-accent">
                        {item.name}
                      </h3>
                      <span className="truncate font-mono text-[11px] text-ink-faint">
                        {item.nameEn}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-mute">
                      {item.description}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
