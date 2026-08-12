"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

const FileIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M14 3v5h5M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M9 13h6M9 17h6" />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const GlobeIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z" />
  </svg>
);

const features = [
  {
    Icon: FileIcon,
    name: "檔案管理",
    description: "示範卡片：把所有檔案集中在一處，隨時搜尋與分享。",
    href: "#",
    cta: "了解更多",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100/60 to-transparent dark:from-sky-950/40" />
    ),
  },
  {
    Icon: BellIcon,
    name: "即時通知",
    description: "示範卡片：重要事件發生時立即收到提醒，不漏掉任何更新。",
    href: "#",
    cta: "了解更多",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 to-transparent dark:from-amber-950/40" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "行事曆整合",
    description: "示範卡片：同步多個行事曆，安排時程一目瞭然。",
    href: "#",
    cta: "了解更多",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 to-transparent dark:from-emerald-950/40" />
    ),
  },
  {
    Icon: GlobeIcon,
    name: "多語系支援",
    description: "示範卡片：介面支援多種語言，走到哪裡都能用。",
    href: "#",
    cta: "了解更多",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-100/60 to-transparent dark:from-violet-950/40" />
    ),
  },
];

export default function BentoGridDemo() {
  return (
    <div className="w-full p-2">
      <BentoGrid className="auto-rows-[14rem] lg:grid-cols-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
}
