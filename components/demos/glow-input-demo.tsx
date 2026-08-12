"use client";

import { GlowInput } from "@/components/ui/glow-input";

export default function GlowInputDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-5 py-6">
      <GlowInput placeholder="點進來看看光暈（靛藍）" />
      <GlowInput glowColor="#f43f5e" placeholder="也可以換成玫瑰紅" />
    </div>
  );
}
