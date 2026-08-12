import type { ComponentEntry } from "./types";

export const backgrounds: ComponentEntry[] = [
  {
    slug: "aurora-background",
    name: "極光背景",
    nameEn: "Aurora Background",
    category: "backgrounds",
    description:
      "數團大型模糊漸層色塊緩慢漂移，營造夜空極光氛圍，顏色與速度可調。適合 hero 區塊或深色頁面的氣氛底圖。",
    dependencies: [],
    props: [
      {
        name: "colors",
        type: "string[]",
        defaultValue: '["#22d3ee", "#a78bfa", "#f472b6", "#34d399"]',
        description: "色塊顏色，依序輪流套用",
      },
      {
        name: "speed",
        type: "number",
        defaultValue: "16",
        description: "漂移一趟的基準秒數，越大越慢",
      },
      {
        name: "blur",
        type: "number",
        defaultValue: "60",
        description: "模糊程度（px）",
      },
      {
        name: "opacity",
        type: "number",
        defaultValue: "0.35",
        description: "色塊不透明度 0–1",
      },
    ],
    source: {
      label: "Aceternity UI",
      url: "https://ui.aceternity.com/components/aurora-background",
    },
  },
  {
    slug: "particles-background",
    name: "粒子背景",
    nameEn: "Particles Background",
    category: "backgrounds",
    description:
      "canvas 粒子緩慢漂浮的背景，數量、顏色、速度、大小皆可調；已處理 devicePixelRatio 與視窗縮放，unmount 自動清理。",
    dependencies: [],
    props: [
      {
        name: "quantity",
        type: "number",
        defaultValue: "60",
        description: "粒子數量",
      },
      {
        name: "color",
        type: "string",
        defaultValue: '"#a1a1aa"',
        description: "粒子顏色",
      },
      {
        name: "speed",
        type: "number",
        defaultValue: "1",
        description: "漂浮速度倍率",
      },
      {
        name: "size",
        type: "number",
        defaultValue: "2",
        description: "粒子最大半徑（px）",
      },
    ],
  },
  {
    slug: "meteors",
    name: "流星雨",
    nameEn: "Meteors",
    category: "backgrounds",
    description:
      "多顆帶漸層尾巴的流星斜向劃過容器，位置與節奏各不相同，SSR 渲染結果穩定。適合深色 hero 或空狀態的點綴。",
    dependencies: [],
    props: [
      {
        name: "number",
        type: "number",
        defaultValue: "20",
        description: "流星數量",
      },
      {
        name: "color",
        type: "string",
        defaultValue: '"#94a3b8"',
        description: "流星頭與尾巴的顏色",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/meteors",
    },
  },
  {
    slug: "dot-pattern",
    name: "點陣背景",
    nameEn: "Dot Pattern",
    category: "backgrounds",
    description:
      "以 SVG pattern 鋪滿小圓點的靜態底紋，可選放射狀遮罩讓邊緣淡出，間距、半徑、顏色可調。",
    dependencies: [],
    props: [
      {
        name: "spacing",
        type: "number",
        defaultValue: "16",
        description: "相鄰圓點的間距（px）",
      },
      {
        name: "radius",
        type: "number",
        defaultValue: "1.5",
        description: "圓點半徑（px）",
      },
      {
        name: "color",
        type: "string",
        defaultValue: '"#a1a1aa"',
        description: "圓點顏色",
      },
      {
        name: "fade",
        type: "boolean",
        defaultValue: "false",
        description: "是否用放射狀遮罩讓邊緣淡出",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/dot-pattern",
    },
  },
  {
    slug: "grid-beams",
    name: "網格光束",
    nameEn: "Grid Beams",
    category: "backgrounds",
    description:
      "細網格線鋪底，幾道亮光沿著水平與垂直格線奔馳，網格間距、顏色與光束速度可調。適合科技感區塊背景。",
    dependencies: [],
    props: [
      {
        name: "gridSize",
        type: "number",
        defaultValue: "40",
        description: "網格間距（px）",
      },
      {
        name: "gridColor",
        type: "string",
        defaultValue: '"rgba(148, 163, 184, 0.18)"',
        description: "網格線顏色",
      },
      {
        name: "beamColor",
        type: "string",
        defaultValue: '"#38bdf8"',
        description: "光束顏色",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "5",
        description: "光束跑完一趟的秒數",
      },
    ],
  },
  {
    slug: "wave-background",
    name: "波浪背景",
    nameEn: "Wave Background",
    category: "backgrounds",
    description:
      "容器底部多層 SVG 波浪以不同速度錯開漂移，透明度逐層遞減做出景深，顏色、高度、速度與層數可調。",
    dependencies: [],
    props: [
      {
        name: "color",
        type: "string",
        defaultValue: '"#38bdf8"',
        description: "波浪顏色",
      },
      {
        name: "height",
        type: "number",
        defaultValue: "120",
        description: "波浪區域高度（px）",
      },
      {
        name: "speed",
        type: "number",
        defaultValue: "1",
        description: "速度倍率，越大越快",
      },
      {
        name: "opacities",
        type: "number[]",
        defaultValue: "[0.5, 0.32, 0.18]",
        description: "各層透明度，同時決定層數",
      },
    ],
  },
  {
    slug: "retro-grid",
    name: "復古網格",
    nameEn: "Retro Grid",
    category: "backgrounds",
    description:
      "80 年代風格的透視網格地平線持續向前捲動，WebGL 繪製、不支援時自動退回 CSS 3D 版本。適合復古或合成波風格的 hero 區塊。",
    dependencies: [],
    props: [
      {
        name: "angle",
        type: "number",
        defaultValue: "65",
        description: "網格平面的傾斜角度（度）",
      },
      {
        name: "cellSize",
        type: "number",
        defaultValue: "60",
        description: "網格格子大小（px）",
      },
      {
        name: "opacity",
        type: "number",
        defaultValue: "0.5",
        description: "整體不透明度 0–1",
      },
      {
        name: "lightLineColor",
        type: "string",
        defaultValue: '"gray"',
        description: "淺色模式的網格線顏色",
      },
      {
        name: "darkLineColor",
        type: "string",
        defaultValue: '"gray"',
        description: "深色模式的網格線顏色",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/retro-grid",
      license: "MIT",
    },
  },
  {
    slug: "flickering-grid",
    name: "閃爍網格",
    nameEn: "Flickering Grid",
    category: "backgrounds",
    description:
      "canvas 繪製的方格陣列，每格以隨機機率變換透明度形成閃爍效果；已處理 devicePixelRatio、容器縮放與離開視窗自動暫停。",
    dependencies: [],
    props: [
      {
        name: "squareSize",
        type: "number",
        defaultValue: "4",
        description: "每個方格的邊長（px）",
      },
      {
        name: "gridGap",
        type: "number",
        defaultValue: "6",
        description: "方格間距（px）",
      },
      {
        name: "flickerChance",
        type: "number",
        defaultValue: "0.3",
        description: "每秒每格閃爍的機率",
      },
      {
        name: "color",
        type: "string",
        defaultValue: '"rgb(0, 0, 0)"',
        description: "方格顏色",
      },
      {
        name: "maxOpacity",
        type: "number",
        defaultValue: "0.3",
        description: "方格最大不透明度 0–1",
      },
      {
        name: "width",
        type: "number",
        description: "固定寬度（px），未指定時跟隨容器",
      },
      {
        name: "height",
        type: "number",
        description: "固定高度（px），未指定時跟隨容器",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/flickering-grid",
      license: "MIT",
    },
  },
  {
    slug: "warp-background",
    name: "空間扭曲邊框",
    nameEn: "Warp Background",
    category: "backgrounds",
    description:
      "內容四周以 3D 透視網格包圍，隨機色相的光束沿著網格面飛向遠方，營造穿越空間的科幻感。適合強調單一卡片或 CTA 的容器。",
    dependencies: ["motion"],
    props: [
      {
        name: "perspective",
        type: "number",
        defaultValue: "100",
        description: "3D 透視距離（px），越小扭曲越強",
      },
      {
        name: "beamsPerSide",
        type: "number",
        defaultValue: "3",
        description: "每一面同時飛行的光束數量",
      },
      {
        name: "beamSize",
        type: "number",
        defaultValue: "5",
        description: "光束寬度（佔該面寬度的百分比）",
      },
      {
        name: "beamDelayMin",
        type: "number",
        defaultValue: "0",
        description: "光束隨機延遲下限（秒）",
      },
      {
        name: "beamDelayMax",
        type: "number",
        defaultValue: "3",
        description: "光束隨機延遲上限（秒）",
      },
      {
        name: "beamDuration",
        type: "number",
        defaultValue: "3",
        description: "光束飛完一趟的秒數",
      },
      {
        name: "gridColor",
        type: "string",
        defaultValue: '"rgba(163, 163, 163, 0.35)"',
        description: "透視網格線顏色",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/warp-background",
      license: "MIT",
    },
  },
  {
    slug: "interactive-grid-pattern",
    name: "互動網格",
    nameEn: "Interactive Grid Pattern",
    category: "backgrounds",
    description:
      "SVG 方格鋪滿容器，滑鼠掠過的格子會亮起並緩慢淡出。適合互動感較強的 hero 或功能區塊背景，可配合 mask 做邊緣淡出。",
    dependencies: [],
    props: [
      {
        name: "width",
        type: "number",
        defaultValue: "40",
        description: "每格寬度（px）",
      },
      {
        name: "height",
        type: "number",
        defaultValue: "40",
        description: "每格高度（px）",
      },
      {
        name: "squares",
        type: "[number, number]",
        defaultValue: "[24, 24]",
        description: "格子數量 [水平, 垂直]",
      },
      {
        name: "squaresClassName",
        type: "string",
        description: "疊加在每個格子上的 class，可改 hover 顏色",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/interactive-grid-pattern",
      license: "MIT",
    },
  },
];
