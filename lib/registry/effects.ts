import type { ComponentEntry } from "./types";

export const effects: ComponentEntry[] = [
  {
    slug: "globe",
    name: "互動 3D 地球",
    nameEn: "Globe",
    category: "effects",
    description:
      "以 cobe 繪製的點陣 3D 地球，可拖曳旋轉、放開後自動慢轉，標記點與配色可調。適合全球服務、據點分佈的視覺焦點。",
    dependencies: ["cobe"],
    props: [
      {
        name: "markers",
        type: "Marker[]",
        defaultValue: "六個示範城市",
        description: "標記點：location 為 [緯度, 經度]，size 為相對大小",
      },
      {
        name: "rotateSpeed",
        type: "number",
        defaultValue: "0.004",
        description: "自轉速度（每幀弧度），0 為不自轉",
      },
      {
        name: "markerColor",
        type: "[number, number, number]",
        defaultValue: "[0.98, 0.6, 0.2]",
        description: "標記點顏色（RGB 各分量 0–1）",
      },
      {
        name: "dark",
        type: "number",
        defaultValue: "1",
        description: "暗色模式程度 0–1",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/globe",
    },
  },
  {
    slug: "marquee",
    name: "無限跑馬燈",
    nameEn: "Marquee",
    category: "effects",
    description:
      "內容複製兩份接續捲動的無縫跑馬燈，方向、速度、hover 暫停皆可調。適合展示 logo 牆、標語或卡片列。",
    dependencies: [],
    props: [
      {
        name: "direction",
        type: '"left" | "right"',
        defaultValue: '"left"',
        description: "捲動方向",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "30",
        description: "捲完一輪的秒數，越小越快",
      },
      {
        name: "gap",
        type: "number",
        defaultValue: "16",
        description: "項目間距（px）",
      },
      {
        name: "pauseOnHover",
        type: "boolean",
        defaultValue: "false",
        description: "滑鼠移入時暫停",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/marquee",
    },
  },
  {
    slug: "border-beam",
    name: "光束邊框",
    nameEn: "Border Beam",
    category: "effects",
    description:
      "一段漸層亮光沿著容器邊框繞行，以 CSS mask + conic-gradient 實現、相容性佳。放進 relative 容器即可，圓角自動繼承。",
    dependencies: [],
    props: [
      {
        name: "size",
        type: "number",
        defaultValue: "80",
        description: "光束弧長（度數，0–360）",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "6",
        description: "繞行一圈的秒數",
      },
      {
        name: "colorFrom",
        type: "string",
        defaultValue: '"#ffaa40"',
        description: "光束起始色（尾端）",
      },
      {
        name: "colorTo",
        type: "string",
        defaultValue: '"#9c40ff"',
        description: "光束結束色（頭端）",
      },
      {
        name: "borderWidth",
        type: "number",
        defaultValue: "1.5",
        description: "邊框線寬（px）",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/border-beam",
    },
  },
  {
    slug: "mouse-spotlight",
    name: "滑鼠聚光燈",
    nameEn: "Mouse Spotlight",
    category: "effects",
    description:
      "游標在區塊內移動時，一圈柔和光暈跟隨游標，移出後淡出；直接更新樣式不觸發 re-render。適合暗色卡片或區塊的互動點綴。",
    dependencies: [],
    props: [
      {
        name: "size",
        type: "number",
        defaultValue: "320",
        description: "光暈直徑（px）",
      },
      {
        name: "color",
        type: "string",
        defaultValue: '"rgba(56, 189, 248, 0.15)"',
        description: "光暈顏色（建議帶透明度）",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "要罩上聚光燈效果的內容",
      },
    ],
  },
  {
    slug: "confetti",
    name: "彩帶慶祝",
    nameEn: "Confetti",
    category: "effects",
    description:
      "自製 canvas 彩紙噴發，不依賴第三方套件；透過 ref 呼叫 fire() 從指定點噴出，重力加旋轉再淡出，動畫結束自動停止繪製。",
    dependencies: [],
    props: [
      {
        name: "ref",
        type: "Ref<ConfettiHandle>",
        description: "取得 fire(options) 觸發函式的 ref",
      },
      {
        name: "colors",
        type: "string[]",
        defaultValue: "六色彩紙",
        description: "預設彩紙顏色池",
      },
      {
        name: "fire(options)",
        type: "(options?: ConfettiFireOptions) => void",
        description:
          "噴發彩紙：x / y 為 0–1 的相對位置，count 數量、power 初速倍率、colors 顏色池",
      },
    ],
  },
  {
    slug: "animated-grid-pattern",
    name: "動畫網格",
    nameEn: "Animated Grid Pattern",
    category: "effects",
    description:
      "SVG 方格鋪底，隨機方格緩緩亮起又熄滅，並隨容器縮放重新分佈。適合低調的科技感區塊背景。",
    dependencies: [],
    props: [
      {
        name: "cellSize",
        type: "number",
        defaultValue: "40",
        description: "單一方格邊長（px）",
      },
      {
        name: "numSquares",
        type: "number",
        defaultValue: "30",
        description: "同時存在的亮起方格數",
      },
      {
        name: "maxOpacity",
        type: "number",
        defaultValue: "0.3",
        description: "方格最亮時的不透明度 0–1",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "3",
        description: "一次亮滅循環的秒數",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/animated-grid-pattern",
    },
  },
];
