"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";

export default function MagneticButtonDemo() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <MagneticButton range={40}>靠近我試試</MagneticButton>
    </div>
  );
}
