"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * 動畫分頁籤：選中指示器以 motion layoutId 在選項之間滑動，
 * 支援方向鍵 / Home / End 鍵盤操作與 role="tablist" 無障礙屬性。
 * @example
 * <AnimatedTabs
 *   tabs={[
 *     { value: "a", label: "總覽", content: <p>總覽內容</p> },
 *     { value: "b", label: "設定", content: <p>設定內容</p> },
 *   ]}
 * />
 */
export type AnimatedTabItem = {
  value: string;
  label: string;
  /** 選填：對應的面板內容，有提供才會渲染 tabpanel */
  content?: ReactNode;
};

type AnimatedTabsProps = {
  tabs: AnimatedTabItem[];
  /** 預設選中的 value，不傳則選第一個 */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function AnimatedTabs({
  tabs,
  defaultValue,
  onValueChange,
  className = "",
}: AnimatedTabsProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value ?? "");
  const uid = useId();
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);

  const select = (value: string) => {
    setActive(value);
    onValueChange?.(value);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    event.preventDefault();
    select(tabs[next].value);
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  };

  const activeTab = tabs.find((tab) => tab.value === active);

  return (
    <div className={className}>
      <div
        ref={listRef}
        role="tablist"
        aria-orientation="horizontal"
        className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-700 dark:bg-zinc-900"
      >
        {tabs.map((tab, index) => {
          const selected = tab.value === active;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              id={`${uid}-tab-${tab.value}`}
              aria-selected={selected}
              aria-controls={
                tab.content != null ? `${uid}-panel-${tab.value}` : undefined
              }
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`relative rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 ${
                selected
                  ? "font-medium text-zinc-900 dark:text-zinc-50"
                  : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={`${uid}-indicator`}
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-zinc-700"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34 }
                  }
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
      {activeTab?.content != null && (
        <div
          role="tabpanel"
          id={`${uid}-panel-${activeTab.value}`}
          aria-labelledby={`${uid}-tab-${activeTab.value}`}
          tabIndex={0}
          className="mt-4 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
