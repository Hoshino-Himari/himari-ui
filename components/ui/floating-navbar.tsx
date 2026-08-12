"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * 浮動導覽列：懸浮膠囊造型、玻璃模糊與陰影；往下捲動時收起、往上捲動時滑出。
 * 預設監聽整個視窗捲動，也可用 scrollContainer 指定容器。
 * @example
 * <FloatingNavbar
 *   items={[{ label: "首頁", href: "/" }, { label: "文件", href: "/docs" }]}
 *   activeHref="/"
 * />
 */
export type FloatingNavbarItem = {
  label: string;
  href: string;
};

type FloatingNavbarProps = {
  items: FloatingNavbarItem[];
  /** 目前頁面的 href，會以高亮顯示 */
  activeHref?: string;
  /** 監聽捲動的容器；不傳則監聽整個視窗 */
  scrollContainer?: RefObject<HTMLElement | null>;
  /** 定位方式：整頁用 fixed，放在可捲動容器內用 sticky */
  position?: "fixed" | "sticky" | "absolute";
  className?: string;
};

export function FloatingNavbar({
  items,
  activeHref,
  scrollContainer,
  position = "fixed",
  className = "",
}: FloatingNavbarProps) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = scrollContainer?.current;
    const target: HTMLElement | Window = container ?? window;
    const getY = () => (container ? container.scrollTop : window.scrollY);
    lastY.current = getY();

    const onScroll = () => {
      const y = getY();
      const delta = y - lastY.current;
      if (Math.abs(delta) < 4) return;
      // 往上捲、或接近頂端時顯示；往下捲時隱藏
      setVisible(delta < 0 || y < 40);
      lastY.current = y;
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollContainer]);

  return (
    <motion.nav
      animate={{ y: visible ? 0 : -88, opacity: visible ? 1 : 0 }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 320, damping: 30 }
      }
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className={`${position} top-4 right-0 left-0 z-50 mx-auto flex w-fit items-center gap-1 rounded-full border border-zinc-200/80 bg-white/75 px-2 py-1.5 shadow-lg shadow-zinc-900/10 backdrop-blur-md dark:border-zinc-700/80 dark:bg-zinc-900/75 ${className}`}
    >
      {items.map((item) => {
        const isActive = item.href === activeHref;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-3 py-1 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-500 ${
              isActive
                ? "bg-zinc-900 font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </motion.nav>
  );
}
