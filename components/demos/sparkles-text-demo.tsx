"use client";

import { SparklesText } from "@/components/ui/sparkles-text";

export default function SparklesTextDemo() {
  return (
    <div className="flex h-48 items-center justify-center px-6">
      <SparklesText className="text-5xl font-bold text-ink">
        星火文字
      </SparklesText>
    </div>
  );
}
