import type { ComponentEntry } from "./types";

export const overlays: ComponentEntry[] = [
  {
    slug: "animated-tooltip",
    name: "動畫提示框",
    nameEn: "Animated Tooltip",
    category: "overlays",
    description:
      "hover 或鍵盤聚焦時以彈簧動畫彈出的提示框，並隨滑鼠在觸發器上的位置微幅傾斜偏移，適合替按鈕與圖示補充說明。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "content",
        type: "React.ReactNode",
        description: "提示框內容（hover / focus 時顯示）",
      },
      {
        name: "side",
        type: '"top" | "bottom"',
        defaultValue: '"top"',
        description: "提示框出現在觸發器的哪一側",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "被包住的觸發元素（按鈕、圖示等）",
      },
      {
        name: "className",
        type: "string",
        description: "疊加在外層 span 的 class",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/overlays/animated-tooltip",
      license: "MIT",
    },
  },
  {
    slug: "dynamic-island",
    name: "動態島",
    nameEn: "Dynamic Island",
    category: "overlays",
    description:
      "模仿 iPhone 動態島的黑色膠囊，提供五種尺寸預設值，切換時外殼以彈簧動畫變形、內容交叉淡入，適合做狀態列或即時活動展示。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "size",
        type: '"compact" | "default" | "long" | "tall" | "large"',
        defaultValue: '"default"',
        description: "膠囊要變形到的形狀預設值",
      },
      {
        name: "presenceKey",
        type: "React.Key",
        defaultValue: "size",
        description: "目前內容的識別 key，改變時內容交叉淡入切換",
      },
      {
        name: "className",
        type: "string",
        description: "疊加在膠囊外殼的 class",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/overlays/dynamic-island",
      license: "MIT",
    },
  },
  {
    slug: "morphing-dialog",
    name: "變形對話框",
    nameEn: "Morphing Dialog",
    category: "overlays",
    description:
      "卡片與對話框共用 layoutId 的組合式元件：點擊卡片會以彈簧動畫「長成」置中的對話框，關閉時縮回原位，支援 Esc、點背景與關閉鈕。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "open",
        type: "boolean",
        description: "（MorphingDialog）受控開關狀態，省略則為非受控",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "（MorphingDialog）開關狀態改變時的回呼",
      },
      {
        name: "className",
        type: "string",
        description:
          "（Trigger / Content / Close）各子元件都接受 className 疊加樣式",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/overlays/morphing-dialog",
      license: "MIT",
    },
  },
  {
    slug: "toast",
    name: "通知吐司",
    nameEn: "Toast",
    category: "overlays",
    description:
      "掛一次 ToastProvider 後即可在任何地方呼叫 toast() 發通知：支援成功 / 錯誤型態與操作按鈕，多則通知會堆疊收合、hover 展開、拖曳滑掉。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "position",
        type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
        defaultValue: '"bottom-right"',
        description: "（ToastProvider）通知堆疊釘在哪個角落",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "4000",
        description: "（ToastProvider）預設自動關閉毫秒數",
      },
      {
        name: "toast(options)",
        type: "(options: ToastOptions) => number",
        description:
          "發出通知：options 支援 title、description、variant、duration、action；另有 toast.success / toast.error / toast.dismiss",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/overlays/toast",
      license: "MIT",
    },
  },
  {
    slug: "drawer",
    name: "抽屜",
    nameEn: "Drawer",
    category: "overlays",
    description:
      "從底部或右側滑入的受控面板，支援往關閉方向拖曳、Esc 與點背景關閉，開啟時自動鎖定頁面捲動。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "open",
        type: "boolean",
        description: "受控開關狀態",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "抽屜請求開啟或關閉時的回呼",
      },
      {
        name: "side",
        type: '"bottom" | "right"',
        defaultValue: '"bottom"',
        description: "抽屜從哪一側滑入",
      },
      {
        name: "title",
        type: "React.ReactNode",
        description: "顯示在頂端的標題（可省略）",
      },
      {
        name: "className",
        type: "string",
        description: "疊加在面板上的 class",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/overlays/drawer",
      license: "MIT",
    },
  },
];
