"use client";

import { AnimatedList } from "@/components/ui/animated-list";

type Notification = {
  title: string;
  description: string;
  time: string;
  icon: string;
  color: string;
};

const notifications: Notification[] = [
  {
    title: "收到新訊息",
    description: "示範帳號傳來一則訊息",
    time: "剛剛",
    icon: "💬",
    color: "#1e86ff",
  },
  {
    title: "付款完成",
    description: "示範訂單 NT$1,234",
    time: "2 分鐘前",
    icon: "💳",
    color: "#00c9a7",
  },
  {
    title: "有人追蹤你",
    description: "示範用戶開始追蹤你",
    time: "5 分鐘前",
    icon: "👤",
    color: "#ffb800",
  },
  {
    title: "系統更新",
    description: "示範版本 v1.2.3 已發布",
    time: "10 分鐘前",
    icon: "🛠️",
    color: "#ff3d71",
  },
  {
    title: "行事曆提醒",
    description: "示範會議將在 30 分鐘後開始",
    time: "15 分鐘前",
    icon: "🗓️",
    color: "#9b5de5",
  },
];

function NotificationCard({ title, description, time, icon, color }: Notification) {
  return (
    <figure className="relative mx-auto w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,.05),0_2px_4px_rgba(0,0,0,.05)] transition-transform duration-200 ease-in-out hover:scale-[103%] dark:bg-zinc-900 dark:shadow-[0_0_0_1px_rgba(255,255,255,.1)]">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex items-center gap-2 whitespace-pre text-sm font-medium text-zinc-900 dark:text-zinc-100">
            <span>{title}</span>
            <span className="text-xs font-normal text-zinc-400">{time}</span>
          </figcaption>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
}

export default function AnimatedListDemo() {
  return (
    <div className="relative flex h-[400px] w-full flex-col overflow-hidden p-2">
      <AnimatedList delay={1200}>
        {notifications.map((item, idx) => (
          <NotificationCard {...item} key={idx} />
        ))}
      </AnimatedList>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-paper" />
    </div>
  );
}
