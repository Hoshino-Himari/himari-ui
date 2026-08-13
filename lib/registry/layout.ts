import type { ComponentEntry } from "./types";

export const layout: ComponentEntry[] = [
  {
    slug: "three-d-marquee",
    name: "3D 跑馬燈",
    nameEn: "3D Marquee",
    category: "layout",
    description:
      "整面圖片牆以 rotateX + rotateZ 傾斜成 3D 平面，每一欄以不同速度上下漂移，適合首屏或作品集背景。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "images",
        type: "string[]",
        description: "要鋪滿格線的圖片網址（建議 8 張以上）",
      },
      {
        name: "columns",
        type: "3 | 4",
        defaultValue: "4",
        description: "欄數",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/three-d-marquee",
      license: "MIT",
    },
  },
  {
    slug: "hero-parallax",
    name: "英雄視差",
    nameEn: "Hero Parallax",
    category: "layout",
    description:
      "捲動時三排卡片牆在透視平面上左右漂移、整體翻正淡入的首屏展示區，卡片 hover 會浮起並顯示標題。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "products",
        type: "{ title: string; thumbnail: string; href?: string }[]",
        description: "散佈在三排的卡片（建議 15 張）",
      },
      { name: "header", type: "ReactNode", description: "取代預設的標題區塊" },
      {
        name: "scrollContainer",
        type: "RefObject<HTMLElement | null>",
        description: "監聽捲動的容器，不傳則監聽整個視窗",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/hero-parallax",
      license: "MIT",
    },
  },
  {
    slug: "container-scroll",
    name: "容器捲動",
    nameEn: "Container Scroll",
    category: "layout",
    description:
      "捲動時一台傾斜的裝置外框慢慢立正、放大並把標題往上帶，適合首頁展示產品畫面或影片。",
    dependencies: ["framer-motion"],
    props: [
      { name: "header", type: "ReactNode", description: "裝置上方的標題區塊" },
      {
        name: "children",
        type: "ReactNode",
        description: "裝置「螢幕」裡的內容，圖片與影片會自動填滿",
      },
      {
        name: "scrollContainer",
        type: "RefObject<HTMLElement | null>",
        description: "監聽捲動的容器，不傳則監聽整個視窗",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/container-scroll",
      license: "MIT",
    },
  },
  {
    slug: "cover-flow",
    name: "封面流",
    nameEn: "Cover Flow",
    category: "layout",
    description:
      "iTunes 風格的 3D 封面輪播：中央那張正面朝向使用者，兩側往內翻轉並帶地板倒影，可拖曳、點擊或用左右鍵切換。",
    dependencies: ["framer-motion"],
    props: [
      { name: "children", type: "ReactNode", description: "依序排列的封面" },
      {
        name: "defaultIndex",
        type: "number",
        defaultValue: "0",
        description: "初始置中的索引",
      },
      {
        name: "onChange",
        type: "(index: number) => void",
        description: "置中封面改變時的回呼",
      },
      { name: "itemWidth", type: "number", defaultValue: "240", description: "封面寬度（px）" },
      { name: "itemHeight", type: "number", defaultValue: "300", description: "封面高度（px）" },
      { name: "gap", type: "number", defaultValue: "0", description: "封面中心之間額外的間距（px）" },
      {
        name: "perspective",
        type: "number",
        defaultValue: "1200",
        description: "3D 舞台的透視深度",
      },
      {
        name: "reflection",
        type: "boolean",
        defaultValue: "true",
        description: "是否在封面下方畫出漸隱倒影",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/cover-flow",
      license: "MIT",
    },
  },
  {
    slug: "orbit-carousel",
    name: "環形輪播",
    nameEn: "Orbit Carousel",
    category: "layout",
    description:
      "卡片沿著一道圓弧排列，前方那張最大最清楚，兩側沿弧線下沉、旋轉並淡出，可拖曳、點擊或用左右鍵切換。",
    dependencies: ["framer-motion"],
    props: [
      { name: "children", type: "ReactNode", description: "依序排列的卡片" },
      { name: "radius", type: "number", defaultValue: "240", description: "圓弧半徑（px）" },
      {
        name: "angleStep",
        type: "number",
        defaultValue: "26",
        description: "相鄰卡片在弧線上的夾角（度）",
      },
      { name: "itemWidth", type: "number", defaultValue: "160", description: "卡片寬度（px）" },
      { name: "itemHeight", type: "number", defaultValue: "200", description: "卡片高度（px）" },
      {
        name: "defaultIndex",
        type: "number",
        defaultValue: "0",
        description: "初始置於最前方的索引",
      },
      {
        name: "onChange",
        type: "(index: number) => void",
        description: "最前方卡片改變時的回呼",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/orbit-carousel",
      license: "MIT",
    },
  },
  {
    slug: "swipe-deck",
    name: "滑卡牌組",
    nameEn: "Swipe Deck",
    category: "layout",
    description:
      "Tinder 風格的卡片堆：往左右拖曳或按按鈕就把最前面那張甩出去，拖曳過程依方向浮現同意／略過的色調與標記，後面的卡片跟著遞補。",
    dependencies: ["framer-motion"],
    props: [
      { name: "children", type: "ReactNode", description: "卡片，最前面的排最上層" },
      {
        name: "onSwipe",
        type: "(index: number, direction: \"left\" | \"right\") => void",
        description: "卡片被甩出去時的回呼",
      },
      {
        name: "loop",
        type: "boolean",
        defaultValue: "false",
        description: "把甩掉的卡片接回牌尾，牌組永不見底",
      },
      {
        name: "threshold",
        type: "number",
        defaultValue: "110",
        description: "放手後判定為甩出的拖曳距離（px）",
      },
      {
        name: "actions",
        type: "{ left: string; right: string }",
        description: "左右兩側動作的文字，同時用在卡片上的標記",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/swipe-deck",
      license: "MIT",
    },
  },
  {
    slug: "image-accordion",
    name: "圖片手風琴",
    nameEn: "Image Accordion",
    category: "layout",
    description:
      "一排並列的圖片面板，滑到哪一片就展開哪一片，同時恢復飽和度並帶出標題與說明；手機上自動轉為直向排列。",
    dependencies: [],
    props: [
      {
        name: "panels",
        type: "{ image: string; title: string; description?: string; href?: string }[]",
        description: "由左至右的面板（建議 3–6 片）",
      },
      {
        name: "defaultIndex",
        type: "number",
        defaultValue: "0",
        description: "預設展開的面板索引",
      },
      {
        name: "activeGrow",
        type: "number",
        defaultValue: "5",
        description: "展開的面板相對其他面板的寬度倍率",
      },
      {
        name: "height",
        type: "string",
        defaultValue: '"26rem"',
        description: "手風琴高度（任何 CSS 長度）",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/image-accordion",
      license: "MIT",
    },
  },
  {
    slug: "gooey-stack",
    name: "黏稠堆疊",
    nameEn: "Gooey Stack",
    category: "layout",
    description:
      "一疊卡片收合時會像液體一樣黏在一起、拉出中間的頸部再融成一張，用 SVG 高斯模糊加門檻濾鏡做出 metaball 效果。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "各張卡片的內容（元件自己畫卡片表面，children 只放內容）",
      },
      {
        name: "gap",
        type: "number",
        description: "受控的卡片間距（px），負值會重疊融合；設了就蓋過 collapsed",
      },
      {
        name: "collapsed",
        type: "boolean",
        defaultValue: "false",
        description: "在展開與收合兩個間距之間彈性切換",
      },
      { name: "expandedGap", type: "number", defaultValue: "18", description: "展開時的間距（px）" },
      {
        name: "collapsedGap",
        type: "number",
        defaultValue: "-48",
        description: "收合時要融合到的間距（px）",
      },
      {
        name: "gooeyness",
        type: "number",
        defaultValue: "10",
        description: "餵給 goo 濾鏡的模糊半徑，越大越早黏在一起",
      },
      { name: "radius", type: "number", defaultValue: "28", description: "融合形狀的圓角（px）" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/gooey-stack",
      license: "MIT",
    },
  },
];
