"use client";

import { useEffect, useRef, useState } from "react";
import { DemoHost } from "@/components/demos";

/**
 * 目錄頁的縮圖預覽。126 個 demo 不能一起跑，所以：
 * 1. 一律等 IntersectionObserver 判定進入視窗才掛載，離開視窗就卸載。
 * 2. 吃 canvas / WebGL / 物理引擎的元件再多一道關卡：要滑鼠移入才啟動。
 */
export function LazyDemo({ slug, heavy }: { slug: string; heavy: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(!heavy);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 先用 rect 同步判一次：IntersectionObserver 的首次回呼會等到下一次畫面合成，
    // 分頁在背景時根本不會送達，光靠它初次進站的卡片會一直卡在佔位狀態。
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const vw = window.innerWidth || document.documentElement.clientWidth;
    setVisible(r.bottom > 0 && r.top < vh && r.right > 0 && r.left < vw);

    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        // 捲出視窗就把重量級元件重新上鎖，免得回捲時一整排同時啟動
        if (!entry.isIntersecting && heavy) setArmed(false);
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [heavy]);

  const mounted = visible && armed;

  return (
    <div
      ref={ref}
      onPointerEnter={() => heavy && setArmed(true)}
      className="relative flex h-[176px] w-full items-center justify-center overflow-hidden bg-paper"
    >
      {mounted ? (
        <div className="flex w-full items-center justify-center">
          <DemoHost slug={slug} />
        </div>
      ) : (
        <span className="text-xs text-ink-faint">
          {heavy ? "滑入播放" : "…"}
        </span>
      )}
    </div>
  );
}
