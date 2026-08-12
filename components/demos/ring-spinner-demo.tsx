"use client";

import { RingSpinner } from "@/components/ui/ring-spinner";

export default function RingSpinnerDemo() {
  return (
    <div className="flex h-48 items-center justify-center gap-12 px-6">
      <div className="flex flex-col items-center gap-3">
        <RingSpinner size={32} thickness={3} />
        <span className="text-xs text-ink-faint">預設</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <RingSpinner size={48} thickness={5} color="#f59e0b" speed={0.7} />
        <span className="text-xs text-ink-faint">大尺寸．加速</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <RingSpinner size={40} thickness={2} color="#22d3ee" trackColor="transparent" />
        <span className="text-xs text-ink-faint">細環．無軌道</span>
      </div>
    </div>
  );
}
