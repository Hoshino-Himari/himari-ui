"use client";

import { useState } from "react";

import { DecryptText } from "@/components/ui/decrypt-text";

export default function DecryptTextDemo() {
  const [round, setRound] = useState(0);

  return (
    <div className="flex h-48 flex-col items-center justify-center gap-6 px-6">
      <p className="font-mono text-2xl font-semibold tracking-wide text-ink">
        <DecryptText key={round} text="ACCESS GRANTED：歡迎回來" />
      </p>
      <button
        type="button"
        onClick={() => setRound((r) => r + 1)}
        className="rounded-full border border-ink/15 px-4 py-1.5 text-sm text-ink-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        再解碼一次
      </button>
    </div>
  );
}
