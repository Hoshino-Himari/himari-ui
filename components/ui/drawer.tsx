"use client";

// 移植自 GodUI <https://godui.design/docs/components/overlays/drawer> — MIT License © LucasBassetti
// 保留原始實作，僅做自足化最小調整。

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import * as React from "react";
import { createPortal } from "react-dom";

/**
 * 抽屜：從底部或右側滑入的面板，支援拖曳關閉、Esc 與點背景關閉。
 * @example
 * const [open, setOpen] = useState(false)
 * <Drawer open={open} onOpenChange={setOpen} side="bottom" title="設定">
 *   內容
 * </Drawer>
 */
export type DrawerSide = "bottom" | "right";

export type DrawerProps = {
  /** Controlled open state. */
  open: boolean;
  /** Called when the drawer requests to open or close. */
  onOpenChange: (open: boolean) => void;
  /** Side the drawer slides in from. */
  side?: DrawerSide;
  /** Optional accessible title rendered at the top. */
  title?: React.ReactNode;
  /** Extra classes for the panel. */
  className?: string;
  children?: React.ReactNode;
};

const PANEL_BY_SIDE: Record<DrawerSide, string> = {
  bottom:
    "inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl border-t border-zinc-200 dark:border-white/10",
  right:
    "inset-y-0 right-0 w-full max-w-md rounded-l-2xl border-l border-zinc-200 dark:border-white/10",
};

const CLOSE_OFFSET = 120;
const CLOSE_VELOCITY = 600;

const emptySubscribe = () => () => {};

function useMounted() {
  // SSR 安全的掛載偵測：伺服器端回傳 false，客戶端回傳 true。
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    { open, onOpenChange, side = "bottom", title, className, children },
    ref,
  ) => {
    const mounted = useMounted();
    const reduceMotion = useReducedMotion();
    const isBottom = side === "bottom";

    React.useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onOpenChange(false);
      };
      document.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = prevOverflow;
      };
    }, [open, onOpenChange]);

    const handleDragEnd = (
      _e: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
    ) => {
      const offset = isBottom ? info.offset.y : info.offset.x;
      const velocity = isBottom ? info.velocity.y : info.velocity.x;
      if (offset > CLOSE_OFFSET || velocity > CLOSE_VELOCITY) {
        onOpenChange(false);
      }
    };

    if (!mounted) return null;

    const hidden = isBottom ? { y: "100%" } : { x: "100%" };
    const shown = isBottom ? { y: 0 } : { x: 0 };

    return createPortal(
      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-50">
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onOpenChange(false)}
              className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            />
            <motion.div
              ref={ref}
              role="dialog"
              aria-modal="true"
              data-slot="drawer"
              initial={hidden}
              animate={shown}
              exit={hidden}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      damping: 32,
                      stiffness: 320,
                      mass: 0.9,
                    }
              }
              drag={isBottom ? "y" : "x"}
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              dragElastic={
                isBottom ? { top: 0, bottom: 0.6 } : { left: 0, right: 0.6 }
              }
              onDragEnd={handleDragEnd}
              className={`absolute flex flex-col bg-white p-5 text-zinc-950 shadow-xl dark:bg-zinc-900 dark:text-zinc-50 ${PANEL_BY_SIDE[side]} ${className ?? ""}`}
            >
              {isBottom ? (
                <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 cursor-grab rounded-full bg-zinc-500/30 active:cursor-grabbing dark:bg-zinc-400/30" />
              ) : null}
              {title ? (
                <h2 className="mb-3 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  {title}
                </h2>
              ) : null}
              <div className="overflow-y-auto">{children}</div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );
  },
);
Drawer.displayName = "Drawer";

export { Drawer };
