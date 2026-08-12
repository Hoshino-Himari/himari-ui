"use client";

import { NeonText } from "@/components/ui/neon-text";

export default function NeonTextDemo() {
  return (
    <div className="flex h-56 flex-col items-center justify-center gap-5 rounded-xl bg-zinc-950 px-6">
      <NeonText className="text-4xl font-bold tracking-widest">深夜食堂</NeonText>
      <NeonText color="#f472b6" flickerDuration={6} className="text-xl font-semibold tracking-wider">
        營業中 OPEN
      </NeonText>
    </div>
  );
}
