"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

export default function NumberTickerDemo() {
  return (
    <div className="flex h-48 items-center justify-center gap-12 px-6">
      <div className="text-center">
        <NumberTicker value={12345} suffix="+" className="text-4xl font-bold text-ink" />
        <p className="mt-1 text-sm text-ink-faint">示範下載數</p>
      </div>
      <div className="text-center">
        <NumberTicker
          value={98.76}
          decimalPlaces={2}
          suffix="%"
          delay={0.3}
          className="text-4xl font-bold text-amber-600"
        />
        <p className="mt-1 text-sm text-ink-faint">示範達成率</p>
      </div>
    </div>
  );
}
