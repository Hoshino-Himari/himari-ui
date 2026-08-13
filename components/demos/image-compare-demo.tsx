"use client";

import { ImageCompare } from "@/components/ui/image-compare";

function ShotBefore() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2"
      style={{
        background: "linear-gradient(135deg, #3f3f46 0%, #18181b 60%, #09090b 100%)",
      }}
    >
      <span className="text-3xl font-bold tracking-widest text-zinc-500">草稿</span>
      <span className="text-xs text-zinc-600">灰階線稿・尚未上色</span>
    </div>
  );
}

function ShotAfter() {
  return (
    <div
      className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2"
      style={{
        background: "linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #6366f1 100%)",
      }}
    >
      <span className="text-3xl font-bold tracking-widest text-white drop-shadow">完稿</span>
      <span className="text-xs text-white/80">加上漸層與光影的成品</span>
    </div>
  );
}

export default function ImageCompareDemo() {
  return (
    <div className="flex w-full justify-center py-4">
      <ImageCompare
        before={<ShotBefore />}
        after={<ShotAfter />}
        beforeLabel="修改前"
        afterLabel="修改後"
        initial={45}
        className="w-full max-w-md"
      />
    </div>
  );
}
