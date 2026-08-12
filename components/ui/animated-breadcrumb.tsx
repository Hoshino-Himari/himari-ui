"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * 動畫麵包屑：項目由左至右逐個淡入，目前頁高亮顯示，
 * 連結 hover 時有底線從左滑入。
 * @example
 * <AnimatedBreadcrumb
 *   items={[
 *     { label: "首頁", href: "/" },
 *     { label: "元件", href: "/components" },
 *     { label: "麵包屑" },
 *   ]}
 * />
 */
export type BreadcrumbItem = {
  label: string;
  /** 沒有 href 或位於最後一項時，視為目前頁 */
  href?: string;
};

type AnimatedBreadcrumbProps = {
  items: BreadcrumbItem[];
  /** 項目之間的分隔符號 */
  separator?: ReactNode;
  /** 每個項目淡入的間隔秒數 */
  stagger?: number;
  /** nav 的無障礙名稱 */
  navLabel?: string;
  className?: string;
};

export function AnimatedBreadcrumb({
  items,
  separator = "/",
  stagger = 0.08,
  navLabel = "麵包屑",
  className = "",
}: AnimatedBreadcrumbProps) {
  const reduced = useReducedMotion();

  return (
    <nav aria-label={navLabel} className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = item.href != null && !isLast;
          return (
            <motion.li
              key={`${item.label}-${index}`}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * stagger }}
              className="flex items-center gap-1.5"
            >
              {isLink ? (
                <a
                  href={item.href}
                  className="group relative rounded-sm text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-zinc-900 transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none dark:bg-zinc-100"
                  />
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "font-medium text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-500 dark:text-zinc-400"
                  }
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span
                  aria-hidden
                  className="select-none text-zinc-300 dark:text-zinc-600"
                >
                  {separator}
                </span>
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}
