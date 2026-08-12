"use client";

import { TypewriterText } from "@/components/ui/typewriter-text";

export default function TypewriterTextDemo() {
  return (
    <div className="flex h-48 items-center justify-center px-6">
      <p className="text-2xl font-semibold text-ink">
        我們擅長{" "}
        <TypewriterText
          phrases={["介面設計", "動態效果", "前端工程", "把細節做到位"]}
          className="text-amber-600"
        />
      </p>
    </div>
  );
}
