"use client";

import { ProgressFoldButton } from "@/components/ui/progress-fold-button";

export default function ProgressFoldButtonDemo() {
  return (
    <div className="flex min-h-40 items-center justify-center">
      <ProgressFoldButton duration={2}>送出訂單</ProgressFoldButton>
    </div>
  );
}
