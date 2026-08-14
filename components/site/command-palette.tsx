"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, registry } from "@/lib/registry";
import { searchEntries } from "@/lib/search";
import type { ComponentEntry } from "@/lib/registry/types";

/** 站頭那顆搜尋鈕用這個事件開面板，不必再拉一層 context。 */
export const OPEN_EVENT = "himari:open-command-palette";

const categoryNameById = new Map(categories.map((c) => [c.id, c.name]));

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchEntries(registry, query), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (entry: ComponentEntry) => {
      close();
      router.push(`/components/${entry.slug}`);
    },
    [close, router]
  );

  // ⌘K / Ctrl+K 開關；輸入框裡的 Esc 由下面的 onKeyDown 處理
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  // 開啟時鎖住底層捲動並聚焦輸入框
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // 選取項目跟著鍵盤捲進視野
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  if (!open) return null;

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length === 0 ? 0 : (i + 1) % results.length));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) =>
        results.length === 0 ? 0 : (i - 1 + results.length) % results.length
      );
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[active];
      if (entry) go(entry);
    }
  }

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="搜尋元件"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />
      <div
        className="relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-line-strong bg-paper shadow-2xl shadow-black/60"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <svg
            viewBox="0 0 16 16"
            aria-hidden
            className="size-4 shrink-0 fill-none stroke-ink-faint stroke-[1.5]"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="m10.5 10.5 3 3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="搜尋元件…試試「玻璃」「3D」「滑鼠」"
            aria-label="搜尋元件"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-ink-faint"
          />
          <span className="shrink-0 font-mono text-[10px] text-ink-faint">
            esc
          </span>
        </div>

        {results.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-ink-faint">
            找不到符合「{query}」的元件。
          </p>
        ) : (
          <ul ref={listRef} className="min-h-0 flex-1 overflow-y-auto p-2">
            {results.map((entry, i) => (
              <li key={entry.slug}>
                <button
                  type="button"
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(entry)}
                  className={`flex w-full items-baseline gap-3 rounded-md px-3 py-2 text-left transition-colors duration-(--dur-fast) ${
                    i === active ? "bg-accent-soft" : ""
                  }`}
                >
                  <span
                    className={`text-sm ${
                      i === active ? "text-accent" : "text-ink"
                    }`}
                  >
                    {entry.name}
                  </span>
                  <span className="truncate font-mono text-[11px] text-ink-faint">
                    {entry.nameEn}
                  </span>
                  <span className="ml-auto shrink-0 text-[11px] text-ink-faint">
                    {categoryNameById.get(entry.category)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-4 border-t border-line px-4 py-2 text-[11px] text-ink-faint">
          <span>↑↓ 選擇</span>
          <span>↵ 前往</span>
          <span className="ml-auto font-mono">{results.length} 個結果</span>
        </div>
      </div>
    </div>
  );
}
