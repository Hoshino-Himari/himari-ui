"use client";

import { Ripple } from "@/components/ui/ripple";

export default function RippleDemo() {
  return (
    <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-xl">
      <Ripple />
      <p className="z-10 text-center text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        漣漪
      </p>
    </div>
  );
}
