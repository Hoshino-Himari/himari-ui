"use client";

import { Dock, DockIcon } from "@/components/ui/dock";

const apps = [
  { label: "首頁", icon: "🏠" },
  { label: "訊息", icon: "💬" },
  { label: "相簿", icon: "🖼️" },
  { label: "音樂", icon: "🎵" },
  { label: "地圖", icon: "🗺️" },
  { label: "設定", icon: "⚙️" },
];

export default function DockDemo() {
  return (
    <div className="flex flex-col items-center justify-end gap-6 py-10">
      <p className="text-sm text-ink-faint">游標在圖示列上左右移動試試</p>
      <Dock>
        {apps.map((app) => (
          <DockIcon key={app.label} aria-label={app.label}>
            <span className="text-2xl leading-none">{app.icon}</span>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
