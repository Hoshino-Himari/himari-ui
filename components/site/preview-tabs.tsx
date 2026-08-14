"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  preview: ReactNode;
  code: ReactNode;
};

type Bg = "dark" | "light" | "checker" | "none";
type Width = "phone" | "tablet" | "full";

const BG_LABEL: Record<Bg, string> = {
  dark: "深色",
  light: "淺色",
  checker: "棋盤格",
  none: "透明",
};

const BG_CLASS: Record<Bg, string> = {
  dark: "bg-paper-2",
  light: "bg-white",
  checker: "bg-paper-2",
  none: "",
};

const WIDTH_LABEL: Record<Width, string> = {
  phone: "手機",
  tablet: "平板",
  full: "滿版",
};

const WIDTH_PX: Record<Width, string | undefined> = {
  phone: "390px",
  tablet: "768px",
  full: undefined,
};

/** 棋盤格底：用來看清楚元件本身有沒有帶背景、邊緣是不是真的透明 */
const CHECKER_STYLE = {
  backgroundImage:
    "repeating-conic-gradient(oklch(24% 0.02 265) 0% 25%, oklch(18% 0.02 265) 0% 50%)",
  backgroundSize: "20px 20px",
};

function ControlGroup<T extends string>({
  label,
  value,
  options,
  labels,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  labels: Record<T, string>;
  onChange: (v: T) => void;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex gap-0.5 rounded-md border border-line bg-paper-2 p-0.5"
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={`rounded px-2 py-1 text-xs transition-colors duration-(--dur-fast) ${
            value === opt
              ? "bg-paper-3 text-ink"
              : "text-ink-faint hover:text-ink-mute"
          }`}
        >
          {labels[opt]}
        </button>
      ))}
    </div>
  );
}

export function PreviewTabs({ preview, code }: Props) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  // 每次 +1 都會讓預覽整個重新掛載，一次性動畫（彩帶、解碼文字…）才有辦法重看
  const [runId, setRunId] = useState(0);
  const [bg, setBg] = useState<Bg>("dark");
  const [width, setWidth] = useState<Width>("full");
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setFullscreen(false);
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [fullscreen]);

  const tabClass = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-(--dur-fast) ${
      active ? "bg-paper-3 text-ink" : "text-ink-mute hover:text-ink"
    }`;

  const maxWidth = WIDTH_PX[width];

  const stage = (
    <div
      className={`relative flex min-h-[380px] w-full items-center justify-center overflow-hidden p-6 sm:p-10 ${BG_CLASS[bg]}`}
      style={bg === "checker" ? CHECKER_STYLE : undefined}
    >
      {/* key 換掉 → 整棵子樹重新掛載，動畫從頭跑 */}
      <div key={runId} className="flex w-full items-center justify-center">
        {preview}
      </div>
    </div>
  );

  const controls = (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => setRunId((n) => n + 1)}
        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper-2 px-2.5 py-1.5 text-xs font-medium text-ink-mute transition-colors duration-(--dur-fast) hover:border-line-strong hover:text-ink active:translate-y-px"
      >
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="size-3.5 fill-none stroke-current stroke-[1.5]"
        >
          <path
            d="M13.5 8a5.5 5.5 0 1 1-1.7-3.97"
            strokeLinecap="round"
          />
          <path d="M13.5 2v3h-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        重播
      </button>
      <ControlGroup
        label="預覽背景"
        value={bg}
        options={["dark", "light", "checker", "none"] as const}
        labels={BG_LABEL}
        onChange={setBg}
      />
      <ControlGroup
        label="預覽寬度"
        value={width}
        options={["phone", "tablet", "full"] as const}
        labels={WIDTH_LABEL}
        onChange={setWidth}
      />
      <button
        type="button"
        onClick={() => setFullscreen(true)}
        className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-line bg-paper-2 px-2.5 py-1.5 text-xs font-medium text-ink-mute transition-colors duration-(--dur-fast) hover:border-line-strong hover:text-ink"
      >
        <svg
          viewBox="0 0 16 16"
          aria-hidden
          className="size-3.5 fill-none stroke-current stroke-[1.5]"
        >
          <path
            d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        全螢幕
      </button>
    </div>
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="預覽與程式碼切換"
        className="mb-3 inline-flex gap-1 rounded-lg border border-line bg-paper-2 p-1"
      >
        <button
          role="tab"
          aria-selected={tab === "preview"}
          onClick={() => setTab("preview")}
          className={tabClass(tab === "preview")}
        >
          預覽
        </button>
        <button
          role="tab"
          aria-selected={tab === "code"}
          onClick={() => setTab("code")}
          className={tabClass(tab === "code")}
        >
          程式碼
        </button>
      </div>
      <div hidden={tab !== "preview"}>
        {!fullscreen && controls}
        <div className="overflow-hidden rounded-xl border border-line">
          {fullscreen ? (
            // 全螢幕時不在這裡再掛一份，否則同一個 demo 會有兩個實例同時跑
            <div className="flex min-h-[380px] items-center justify-center text-sm text-ink-faint">
              預覽已切到全螢幕
            </div>
          ) : (
            <div
              className="mx-auto w-full transition-[max-width] duration-(--dur-base) ease-(--ease-out)"
              style={{ maxWidth }}
            >
              {stage}
            </div>
          )}
        </div>
      </div>
      <div hidden={tab !== "code"}>{code}</div>

      {fullscreen && (
        <div
          className="fixed inset-0 z-100 flex flex-col bg-paper"
          role="dialog"
          aria-modal="true"
          aria-label="全螢幕預覽"
        >
          <div className="flex items-center gap-2 border-b border-line px-4 py-2">
            {controls}
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-paper-2 px-2.5 py-1.5 text-xs font-medium text-ink-mute transition-colors duration-(--dur-fast) hover:border-line-strong hover:text-ink"
            >
              關閉
              <span className="font-mono text-[10px] text-ink-faint">esc</span>
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto">
            <div
              className="mx-auto flex min-h-full w-full items-center"
              style={{ maxWidth }}
            >
              {stage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
