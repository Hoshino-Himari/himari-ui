"use client";

import { DecryptReveal } from "@/components/ui/decrypt-reveal";
import { CanvasApiNote } from "./canvas-api-note";

export default function DecryptRevealDemo() {
  return (
    <>
      <CanvasApiNote fallback="none" />
      <div className="relative h-72 overflow-hidden rounded-xl">
      <DecryptReveal className="h-full w-full" radius={220} background="#09090b">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-zinc-950 px-8 text-center">
          <h3 className="text-2xl font-semibold tracking-wide text-emerald-400">
            機密文件：僅限相關人員
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-zinc-300">
            畫面上的內容都被加密成跳動的字元，把游標移過來，
            掃到的範圍才會即時解密還原。
          </p>
        </div>
      </DecryptReveal>
      </div>
    </>
  );
}
