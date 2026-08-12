"use client";

import { useState, type ReactNode } from "react";

type Props = {
  preview: ReactNode;
  code: ReactNode;
};

export function PreviewTabs({ preview, code }: Props) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  const tabClass = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-(--dur-fast) ${
      active ? "bg-paper-3 text-ink" : "text-ink-mute hover:text-ink"
    }`;

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
        <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-xl border border-line bg-paper-2 p-6 sm:p-10">
          {preview}
        </div>
      </div>
      <div hidden={tab !== "code"}>{code}</div>
    </div>
  );
}
