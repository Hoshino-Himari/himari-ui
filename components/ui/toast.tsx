"use client";

// 移植自 GodUI <https://godui.design/docs/components/overlays/toast> — MIT License © LucasBassetti
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
 * 通知吐司：掛一次 <ToastProvider />，之後在任何地方呼叫 toast() / toast.success() / toast.error()。
 * 多則通知會堆疊收合，hover 展開、左右拖曳可滑掉。
 * @example
 * <ToastProvider position="bottom-right" />
 * // 任何地方：
 * toast.success({ title: "已儲存", description: "設定已更新" })
 */
export type ToastVariant = "default" | "success" | "error";

export type ToastAction = {
  label: string;
  onClick: () => void;
};

export type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  /** Auto-dismiss delay in ms. Overrides the provider default. */
  duration?: number;
  action?: ToastAction;
};

type ToastRecord = ToastOptions & { id: number };

export type ToastPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type ToastProviderProps = {
  /** Corner the stack is anchored to. */
  position?: ToastPosition;
  /** Default auto-dismiss delay in ms. */
  duration?: number;
};

// Minimal external store so `toast()` can be called from anywhere, no context needed.
let counter = 0;
let records: ToastRecord[] = [];
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribeToStore(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getRecords() {
  return records;
}

function addToast(options: ToastOptions): number {
  const id = ++counter;
  records = [{ id, variant: "default", ...options }, ...records];
  emit();
  return id;
}

function dismissToast(id: number) {
  records = records.filter((r) => r.id !== id);
  emit();
}

type ToastFn = ((options: ToastOptions) => number) & {
  success: (options: ToastOptions) => number;
  error: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
};

const toast = ((options: ToastOptions) => addToast(options)) as ToastFn;
toast.success = (options) => addToast({ ...options, variant: "success" });
toast.error = (options) => addToast({ ...options, variant: "error" });
toast.dismiss = dismissToast;

// Corner the stack is pinned to. Items are absolutely positioned against this edge.
const POSITION_CLASS: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
};

const VARIANT_CLASS: Record<ToastVariant, string> = {
  default: "",
  success: "border-l-4 border-l-[oklch(0.72_0.15_150)]",
  error: "border-l-4 border-l-red-600 dark:border-l-red-400",
};

// Stacking tuning.
const GAP = 14; // px between toasts when expanded
const PEEK = 16; // px each toast peeks out behind the front when collapsed
const SCALE_STEP = 0.05; // scale lost per depth when collapsed
const MAX_VISIBLE = 3; // toasts shown behind the front when collapsed

const TOAST_SPRING = {
  type: "spring",
  stiffness: 320,
  damping: 32,
  mass: 0.9,
} as const;

const emptySubscribe = () => () => {};

function useMounted() {
  // SSR 安全的掛載偵測：伺服器端回傳 false，客戶端回傳 true。
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function ToastItem({
  record,
  index,
  total,
  expanded,
  isBottom,
  expandedOffset,
  onHeight,
  onHeightGone,
  defaultDuration,
}: {
  record: ToastRecord;
  index: number;
  total: number;
  expanded: boolean;
  isBottom: boolean;
  expandedOffset: number;
  onHeight: (id: number, height: number) => void;
  onHeightGone: (id: number) => void;
  defaultDuration: number;
}) {
  const ref = React.useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion();

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const report = () => onHeight(record.id, el.offsetHeight);
    report();
    const observer = new ResizeObserver(report);
    observer.observe(el);
    return () => {
      observer.disconnect();
      // Forget this toast's height once it has left the stack.
      onHeightGone(record.id);
    };
  }, [record.id, onHeight, onHeightGone]);

  // Pause the countdown while the stack is expanded (i.e. hovered).
  React.useEffect(() => {
    if (expanded) return;
    const id = setTimeout(
      () => dismissToast(record.id),
      record.duration ?? defaultDuration,
    );
    return () => clearTimeout(id);
  }, [expanded, record.id, record.duration, defaultDuration]);

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500) {
      dismissToast(record.id);
    }
  };

  const dir = isBottom ? -1 : 1; // stack grows away from the anchored edge
  const hidden = !expanded && index >= MAX_VISIBLE;

  const y = expanded ? dir * expandedOffset : dir * index * PEEK;
  const scale = expanded ? 1 : Math.max(0, 1 - index * SCALE_STEP);

  return (
    <motion.li
      ref={ref}
      data-slot="toast"
      initial={
        reduceMotion ? { opacity: 0 } : { opacity: 0, y: dir * -40, scale: 0.9 }
      }
      animate={{ opacity: hidden ? 0 : 1, y, scale }}
      exit={
        reduceMotion
          ? { opacity: 0, transition: { duration: 0.2 } }
          : { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
      }
      transition={reduceMotion ? { duration: 0 } : TOAST_SPRING}
      drag={hidden ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      style={{
        zIndex: total - index,
        transformOrigin: isBottom ? "bottom center" : "top center",
        pointerEvents: hidden ? "none" : "auto",
      }}
      className={`absolute inset-x-0 flex w-full cursor-grab items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-zinc-950 shadow-lg active:cursor-grabbing dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-50 ${isBottom ? "bottom-0" : "top-0"} ${VARIANT_CLASS[record.variant ?? "default"]}`}
    >
      <div className="flex-1">
        {record.title ? (
          <div className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            {record.title}
          </div>
        ) : null}
        {record.description ? (
          <div className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            {record.description}
          </div>
        ) : null}
      </div>
      {record.action ? (
        <button
          type="button"
          onClick={() => {
            record.action?.onClick();
            dismissToast(record.id);
          }}
          className="shrink-0 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-950 [transition:background_200ms_ease] hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
        >
          {record.action.label}
        </button>
      ) : null}
    </motion.li>
  );
}

function ToastProvider({
  position = "bottom-right",
  duration = 4000,
}: ToastProviderProps) {
  const mounted = useMounted();
  const reduceMotion = useReducedMotion();
  const items = React.useSyncExternalStore(
    subscribeToStore,
    getRecords,
    getRecords,
  );
  const [expanded, setExpanded] = React.useState(false);
  const [heights, setHeights] = React.useState<Record<number, number>>({});

  const setHeight = React.useCallback((id: number, height: number) => {
    setHeights((prev) =>
      prev[id] === height ? prev : { ...prev, [id]: height },
    );
  }, []);

  // Forget heights for toasts that have been dismissed (reported on item unmount).
  const removeHeight = React.useCallback((id: number) => {
    setHeights((prev) => {
      if (prev[id] == null) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  if (!mounted) return null;

  const isBottom = position.startsWith("bottom");

  // Cumulative offset of each toast from the anchored edge when expanded.
  const offsets: number[] = [];
  let running = 0;
  for (let i = 0; i < items.length; i++) {
    offsets.push(running);
    running += (heights[items[i].id] ?? 0) + GAP;
  }

  const frontHeight = items.length ? (heights[items[0].id] ?? 0) : 0;
  const totalHeight = running > 0 ? running - GAP : 0;
  const collapsedHeight =
    frontHeight + Math.min(items.length - 1, MAX_VISIBLE - 1) * PEEK;
  const regionHeight = Math.max(0, expanded ? totalHeight : collapsedHeight);

  return createPortal(
    <motion.ol
      data-slot="toaster"
      aria-live="polite"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{ height: regionHeight }}
      transition={reduceMotion ? { duration: 0 } : TOAST_SPRING}
      style={{ transformOrigin: isBottom ? "bottom" : "top" }}
      className={`fixed z-50 w-[min(24rem,calc(100vw-2rem))] ${items.length ? "pointer-events-auto" : "pointer-events-none"} ${POSITION_CLASS[position]}`}
    >
      <AnimatePresence initial={false}>
        {items.map((record, index) => (
          <ToastItem
            key={record.id}
            record={record}
            index={index}
            total={items.length}
            expanded={expanded}
            isBottom={isBottom}
            expandedOffset={offsets[index]}
            onHeight={setHeight}
            onHeightGone={removeHeight}
            defaultDuration={duration}
          />
        ))}
      </AnimatePresence>
    </motion.ol>,
    document.body,
  );
}

export { ToastProvider, toast };
