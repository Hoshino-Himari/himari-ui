"use client";

import { MorphingText } from "@/components/ui/morphing-text";

export default function MorphingTextDemo() {
  return (
    <div className="flex h-48 items-center justify-center px-6">
      <MorphingText
        texts={["設計", "開發", "部署", "分享"]}
        className="text-ink"
      />
    </div>
  );
}
