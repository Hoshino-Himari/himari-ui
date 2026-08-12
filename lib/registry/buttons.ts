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
];
