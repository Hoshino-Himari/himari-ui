"use client";

import { FloatingLabelInput } from "@/components/ui/floating-label-input";

export default function FloatingLabelInputDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 py-6">
      <FloatingLabelInput label="電子郵件" type="email" autoComplete="email" />
      <FloatingLabelInput
        label="密碼"
        type="password"
        defaultValue="1234"
        error="密碼至少需要 8 個字元"
      />
    </div>
  );
}
