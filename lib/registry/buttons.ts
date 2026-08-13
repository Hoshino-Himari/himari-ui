import type { ComponentEntry } from "./types";

export const buttons: ComponentEntry[] = [
  {
    slug: "progress-fold-button",
    name: "進度摺疊按鈕",
    nameEn: "Progress Fold Button",
    category: "buttons",
    description:
      "點擊後正面沿 X 軸向後摺疊，露出底下的進度條，跑完顯示成功勾勾再自動復原。適合送出表單、下單等非同步操作的回饋。",
    dependencies: [],
    props: [
      { name: "duration", type: "number", defaultValue: "2", description: "模擬載入秒數" },
      { name: "onComplete", type: "() => void", description: "進度跑完時的回呼" },
      {
        name: "accentColor",
        type: "string",
        defaultValue: '"#34d399"',
        description: "進度條與成功勾勾的顏色",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/buttons/progress-fold-button",
    },
  },
  {
    slug: "shimmer-button",
    name: "微光按鈕",
    nameEn: "Shimmer Button",
    category: "buttons",
    description: "邊緣有一道光沿著按鈕輪廓繞行的 CTA 按鈕，適合當主要行動呼籲。",
    dependencies: [],
    props: [
      {
        name: "shimmerColor",
        type: "string",
        defaultValue: '"#ffffff"',
        description: "光帶顏色",
      },
      { name: "duration", type: "number", defaultValue: "3", description: "繞行一圈的秒數" },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/shimmer-button",
    },
  },
  {
    slug: "magnetic-button",
    name: "磁吸按鈕",
    nameEn: "Magnetic Button",
    category: "buttons",
    description:
      "滑鼠靠近時按鈕被輕微吸向游標，離開後彈性回彈，替主要行動呼籲增添一點趣味與互動感。",
    dependencies: ["motion"],
    props: [
      {
        name: "strength",
        type: "number",
        defaultValue: "0.35",
        description: "吸附強度（0–1，越大偏移越明顯）",
      },
      {
        name: "range",
        type: "number",
        defaultValue: "24",
        description: "感應範圍：按鈕外圍多少 px 內就開始吸附",
      },
    ],
  },
  {
    slug: "liquid-glass-button",
    name: "液態玻璃按鈕",
    nameEn: "Liquid Glass Button",
    category: "buttons",
    description:
      "backdrop-blur 玻璃擬態按鈕，帶頂部高光，hover 時一道光澤流過表面。放在漸層或圖片背景上效果最好。",
    dependencies: [],
    props: [
      {
        name: "tint",
        type: "string",
        defaultValue: '"rgba(255, 255, 255, 0.15)"',
        description: "玻璃底色（建議帶透明度）",
      },
    ],
    source: { label: "Aether CSS", url: "https://aethercss.lovable.app/" },
  },
  {
    slug: "beam-border-button",
    name: "光束邊框按鈕",
    nameEn: "Beam Border Button",
    category: "buttons",
    description:
      "一道亮光沿著按鈕邊框不停繞行的暗色按鈕，用旋轉的 conic-gradient 實作，適合次要但想吸睛的行動呼籲。",
    dependencies: [],
    props: [
      {
        name: "beamColor",
        type: "string",
        defaultValue: '"#38bdf8"',
        description: "光束顏色",
      },
      { name: "duration", type: "number", defaultValue: "4", description: "繞行一圈的秒數" },
    ],
  },
  {
    slug: "push-button",
    name: "3D 按壓按鈕",
    nameEn: "Push Button",
    category: "buttons",
    description:
      "立體鍵帽造型的按鈕，底下有一層深色鍵座，hover 微微抬起、按下時整顆沉下去，回饋感十足。",
    dependencies: [],
    props: [
      {
        name: "frontColor",
        type: "string",
        defaultValue: '"#f59e0b"',
        description: "鍵帽正面顏色",
      },
      {
        name: "edgeColor",
        type: "string",
        defaultValue: '"#92400e"',
        description: "鍵座（側邊）顏色，建議用比正面深的同色系",
      },
      {
        name: "textColor",
        type: "string",
        defaultValue: '"#ffffff"',
        description: "文字顏色",
      },
    ],
  },
  {
    slug: "gooey-fab",
    name: "黏液浮動按鈕",
    nameEn: "Gooey FAB",
    category: "buttons",
    description:
      "點擊主圓球後，衛星按鈕像黏液一樣分裂彈出，用 SVG goo 濾鏡把圓球融接在一起。適合頁面角落的快速操作選單。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "actions",
        type: "{ icon: ReactNode; label: string; onClick?: () => void }[]",
        description: "衛星按鈕清單：圖示、無障礙標籤與點擊回呼",
      },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "主按鈕尺寸" },
      {
        name: "direction",
        type: '"up" | "down" | "left" | "right"',
        defaultValue: '"up"',
        description: "衛星按鈕彈出的方向",
      },
      { name: "open", type: "boolean", description: "受控模式的展開狀態" },
      {
        name: "defaultOpen",
        type: "boolean",
        defaultValue: "false",
        description: "非受控模式的初始展開狀態",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "展開狀態切換時的回呼",
      },
      {
        name: "triggerIcon",
        type: "ReactNode",
        description: "主按鈕圖示，預設為會旋轉成叉叉的加號",
      },
      {
        name: "triggerLabel",
        type: "string",
        defaultValue: '"Open actions"',
        description: "主按鈕的無障礙標籤",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/buttons/gooey-fab",
      license: "MIT",
    },
  },
  {
    slug: "hold-confirm-button",
    name: "長按確認按鈕",
    nameEn: "Hold Confirm Button",
    category: "buttons",
    description:
      "按住不放時填色從左掃到右，撐滿指定時間才觸發 onConfirm，中途放開會彈回歸零。適合刪除帳號等需要防誤觸的危險操作。",
    dependencies: ["framer-motion"],
    props: [
      { name: "onConfirm", type: "() => void", description: "長按完成時觸發的回呼" },
      {
        name: "variant",
        type: '"destructive" | "default"',
        defaultValue: '"destructive"',
        description: "外觀：紅色危險或主色",
      },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "按鈕尺寸" },
      {
        name: "duration",
        type: "number",
        defaultValue: "900",
        description: "需要按住的毫秒數",
      },
      {
        name: "holdingLabel",
        type: "ReactNode",
        defaultValue: '"Confirming…"',
        description: "按住期間顯示的文字",
      },
      {
        name: "confirmedLabel",
        type: "ReactNode",
        defaultValue: '"Confirmed"',
        description: "確認完成後顯示的文字",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/buttons/hold-confirm-button",
      license: "MIT",
    },
  },
  {
    slug: "jelly-button",
    name: "果凍按鈕",
    nameEn: "Jelly Button",
    category: "buttons",
    description:
      "按下時整顆按鈕從底部壓扁，放開後帶一次過衝的 Q 彈回彈，只動 scale、全程走合成器。適合想強調點擊回饋的行動呼籲。",
    dependencies: [],
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "outline"',
        defaultValue: '"primary"',
        description: "按鈕外觀",
      },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "按鈕尺寸" },
      {
        name: "squash",
        type: "number",
        defaultValue: "0.6",
        description: "壓扁強度（0–1，越大變形越明顯）",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/buttons/jelly-button",
      license: "MIT",
    },
  },
  {
    slug: "slide-confirm-button",
    name: "滑動確認按鈕",
    nameEn: "Slide Confirm Button",
    category: "buttons",
    description:
      "把圓形滑塊拖到軌道尾端才觸發 onConfirm，沒過門檻會彈回；回傳 Promise 時滑塊會轉圈等待、完成後打勾。適合付款、刪除等關鍵操作。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "onConfirm",
        type: "() => void | Promise<unknown>",
        description: "滑到底觸發的回呼，回傳 Promise 會顯示載入轉圈",
      },
      {
        name: "variant",
        type: '"default" | "destructive"',
        defaultValue: '"default"',
        description: "外觀：主色或紅色危險",
      },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "軌道尺寸" },
      {
        name: "threshold",
        type: "number",
        defaultValue: "0.9",
        description: "需要拖過的軌道比例（0–1）",
      },
      {
        name: "label",
        type: "ReactNode",
        defaultValue: '"Slide to confirm"',
        description: "軌道上的提示文字",
      },
      {
        name: "loadingLabel",
        type: "ReactNode",
        defaultValue: '"Working…"',
        description: "非同步等待期間的文字",
      },
      {
        name: "confirmedLabel",
        type: "ReactNode",
        defaultValue: '"Confirmed"',
        description: "確認完成後的文字",
      },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "停用整個控制" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/buttons/slide-confirm-button",
      license: "MIT",
    },
  },
  {
    slug: "mask-button",
    name: "遮罩按鈕",
    nameEn: "Mask Button",
    category: "buttons",
    description:
      "hover 時用逐格 sprite 遮罩動畫（自然、城市、森林三種筆刷）把實色表面刷進來蓋住按鈕。適合想要手作質感的行動呼籲。",
    dependencies: [],
    props: [
      {
        name: "mask",
        type: '"nature" | "urban" | "forest"',
        defaultValue: '"nature"',
        description: "遮罩筆刷樣式",
      },
      {
        name: "variant",
        type: '"primary" | "secondary"',
        defaultValue: '"primary"',
        description: "刷進來的表面顏色",
      },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "按鈕尺寸" },
      {
        name: "maskUrl",
        type: "string",
        description: "自訂 sprite 遮罩圖網址（預設抓 GodUI 原始 repo 的圖）",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/buttons/mask-button",
      license: "MIT",
    },
  },
];
