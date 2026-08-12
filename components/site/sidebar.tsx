"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category, ComponentEntry } from "@/lib/registry/types";

type Props = {
  categories: Category[];
  entries: ComponentEntry[];
};

export function Sidebar({ categories, entries }: Props) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  function toggleCategory(id: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.nameEn.toLowerCase().includes(q) ||
        e.slug.includes(q)
    );
  }, [entries, query]);

  const nav = (
    <nav aria-label="元件目錄" className="flex flex-col gap-6">
      <label className="relative block">
        <span className="sr-only">搜尋元件</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋元件…"
          className="w-full rounded-lg border border-line bg-paper-2 px-3 py-2 text-sm text-ink placeholder:text-ink-faint transition-colors duration-(--dur-fast) focus:border-line-strong focus:outline-2 focus:outline-offset-0 focus:outline-focus"
        />
      </label>
      {categories.map((cat) => {
        const items = filtered.filter((e) => e.category === cat.id);
        if (items.length === 0) return null;
        // 搜尋時一律展開，避免結果被收合狀態藏住
        const isOpen = query.trim() !== "" || !collapsed.has(cat.id);
        return (
          <div key={cat.id}>
            <button
              type="button"
              onClick={() => toggleCategory(cat.id)}
              aria-expanded={isOpen}
              className="mb-1 flex w-full items-center gap-1.5 rounded-md px-2 py-1 font-display text-xs font-bold uppercase tracking-widest text-ink-faint transition-colors duration-(--dur-fast) hover:bg-paper-3 hover:text-ink-mute"
            >
              <svg
                viewBox="0 0 12 12"
                aria-hidden
                className={`size-2.5 shrink-0 fill-none stroke-current stroke-[1.75] transition-transform duration-(--dur-fast) ease-(--ease-out) ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                <path d="M4 2.5 8 6l-4 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {cat.name}
              <span className="ml-auto font-mono text-[10px] text-ink-faint/70">
                {items.length}
              </span>
            </button>
            {isOpen && (
            <ul className="flex flex-col gap-0.5">
              {items.map((item) => {
                const href = `/components/${item.slug}`;
                const active = pathname === href;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-md px-2 py-1.5 text-sm transition-colors duration-(--dur-fast) ${
                        active
                          ? "bg-accent-soft text-accent"
                          : "text-ink-mute hover:bg-paper-3 hover:text-ink"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            )}
          </div>
        );
      })}
      {filtered.length === 0 && (
        <p className="px-2 text-sm text-ink-faint">找不到符合「{query}」的元件。</p>
      )}
    </nav>
  );

  return (
    <>
      {/* 手機版：抽屜開關 */}
      <button
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        className="fixed bottom-5 right-5 z-50 rounded-full border border-line-strong bg-paper-2 px-4 py-2.5 text-sm font-medium text-ink shadow-lg shadow-black/40 transition-transform duration-(--dur-fast) ease-(--ease-out) active:scale-95 lg:hidden"
      >
        {mobileOpen ? "關閉目錄" : "元件目錄"}
      </button>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto border-r border-line bg-paper p-4 pt-6">
            {nav}
          </div>
        </div>
      )}
      {/* 桌面版：固定側欄 */}
      <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-line p-4 lg:block">
        {nav}
      </aside>
    </>
  );
}
