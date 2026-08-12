"use client";

import { Globe } from "@/components/ui/globe";

export default function GlobeDemo() {
  return (
    <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-xl">
      <Globe className="w-64" />
      <p className="absolute bottom-4 text-sm text-zinc-500">
        拖曳旋轉地球，放開後會自動慢轉
      </p>
    </div>
  );
}
