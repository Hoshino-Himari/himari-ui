"use client";

import { JellyButton } from "@/components/ui/jelly-button";

export default function JellyButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex min-h-40 w-full max-w-md flex-wrap items-center justify-center gap-6 rounded-2xl bg-zinc-100 p-8">
        <JellyButton variant="primary">加入購物車</JellyButton>
        <JellyButton variant="secondary">加入收藏</JellyButton>
        <JellyButton variant="outline" squash={0.9}>
          用力壓我
        </JellyButton>
      </div>
      <p className="text-sm text-ink-mute">按住看看果凍般的壓扁回彈</p>
    </div>
  );
}
