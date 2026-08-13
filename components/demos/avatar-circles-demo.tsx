"use client";

import { AvatarCircles } from "@/components/ui/avatar-circles";

// 示範不給 profileUrl，頭像就只是頭像，不會變成連結
const avatars = ["himari", "akiu", "yuki", "sora", "ren", "mio"].map(
  (name) => ({ imageUrl: `https://avatar.vercel.sh/${name}` })
);

export default function AvatarCirclesDemo() {
  return (
    <div className="flex h-48 w-full flex-col items-center justify-center gap-4">
      <AvatarCircles numPeople={99} avatarUrls={avatars} />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        已有 105 位示範用戶加入
      </p>
    </div>
  );
}
