"use client";

import { ToastProvider, toast } from "@/components/ui/toast";

const buttonClass =
  "rounded-full border border-line bg-paper-2 px-4 py-2 text-xs font-medium text-ink transition-colors duration-150 hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export default function ToastDemo() {
  return (
    <div className="flex h-56 flex-col items-center justify-center gap-6 px-6">
      <ToastProvider position="bottom-right" duration={4000} />
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          className={buttonClass}
          onClick={() =>
            toast({
              title: "已排入佇列",
              description: "示範任務 #1234 已加入處理佇列",
            })
          }
        >
          預設通知
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() =>
            toast.success({
              title: "儲存成功",
              description: "所有變更都已同步",
            })
          }
        >
          成功通知
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() =>
            toast.error({
              title: "上傳失敗",
              description: "網路連線中斷，請再試一次",
            })
          }
        >
          錯誤通知
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() =>
            toast({
              title: "已封存 1 個項目",
              action: {
                label: "復原",
                onClick: () =>
                  toast.success({ title: "已復原", duration: 2000 }),
              },
            })
          }
        >
          含操作按鈕
        </button>
      </div>
      <p className="text-center text-xs text-ink-faint">
        通知出現在畫面右下角：連按幾次會堆疊，hover 可展開、左右拖曳可滑掉。
      </p>
    </div>
  );
}
