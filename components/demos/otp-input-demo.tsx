"use client";

import { useState } from "react";
import { OtpInput } from "@/components/ui/otp-input";

export default function OtpInputDemo() {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        請輸入 6 位數驗證碼（可直接整串貼上）
      </p>
      <OtpInput onComplete={setCode} />
      <p className="h-5 text-sm text-emerald-600 dark:text-emerald-400">
        {code ? `輸入完成：${code}` : ""}
      </p>
    </div>
  );
}
