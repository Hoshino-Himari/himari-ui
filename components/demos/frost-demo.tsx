"use client";

import { Frost } from "@/components/ui/frost";

export default function FrostDemo() {
  return (
    <div className="relative h-72 overflow-hidden rounded-xl">
      <Frost className="h-full w-full">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-sky-950 px-8 text-center">
          <h3 className="text-2xl font-semibold tracking-wide text-sky-100">
            冬日清晨的玻璃窗
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-sky-200/80">
            冰霜從邊緣慢慢蔓延，用游標在窗上劃過，融出一道透明的痕跡，
            過一會兒又會重新結凍。
          </p>
        </div>
      </Frost>
    </div>
  );
}
