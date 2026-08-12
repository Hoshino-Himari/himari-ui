"use client";

import { AnimatedBreadcrumb } from "@/components/ui/animated-breadcrumb";

export default function AnimatedBreadcrumbDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <AnimatedBreadcrumb
        items={[
          { label: "首頁", href: "#" },
          { label: "元件庫", href: "#" },
          { label: "導覽", href: "#" },
          { label: "動畫麵包屑" },
        ]}
      />
      <p className="text-xs text-ink-faint">
        項目逐個淡入；滑過連結會有底線從左邊滑入
      </p>
    </div>
  );
}
