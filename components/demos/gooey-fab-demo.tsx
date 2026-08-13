"use client";

import { GooeyFab } from "@/components/ui/gooey-fab";

const ShareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-[45%]"
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);

const PencilIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-[45%]"
    aria-hidden="true"
  >
    <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
  </svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-[45%]"
    aria-hidden="true"
  >
    <path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.1 3 5.5l7 7Z" />
  </svg>
);

export default function GooeyFabDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-80 w-full max-w-md items-end justify-center rounded-2xl bg-zinc-100 pb-10">
        <GooeyFab
          triggerLabel="開啟快速操作"
          actions={[
            { icon: <ShareIcon />, label: "分享" },
            { icon: <PencilIcon />, label: "編輯" },
            { icon: <HeartIcon />, label: "收藏" },
          ]}
        />
      </div>
      <p className="text-sm text-ink-mute">點一下加號，衛星按鈕會黏在一起彈出來</p>
    </div>
  );
}
