import type { ComponentEntry } from "./types";

export const cards: ComponentEntry[] = [
  {
    slug: "spotlight-card",
    name: "聚光燈卡片",
    nameEn: "Spotlight Card",
    category: "cards",
    description:
      "滑鼠在卡片上移動時，一圈柔和的 radial-gradient 光暈跟著游標走，適合功能介紹或定價卡片。",
    dependencies: [],
    props: [
      {
        name: "spotlightColor",
        type: "string",
        defaultValue: '"rgba(245, 158, 11, 0.16)"',
        description: "光暈顏色，建議帶透明度",
      },
      {
        name: "spotlightSize",
        type: "number",
        defaultValue: "320",
        description: "光暈半徑（px）",
      },
    ],
    source: { label: "Aceternity UI", url: "https://ui.aceternity.com" },
  },
  {
    slug: "tilt-card",
    name: "3D 傾斜卡片",
    nameEn: "Tilt Card",
    category: "cards",
    description:
      "依游標位置做 rotateX / rotateY 的 3D 傾斜，內容帶 translateZ 景深，離開後以 spring 回正。",
    dependencies: ["motion"],
    props: [
      {
        name: "maxTilt",
        type: "number",
        defaultValue: "12",
        description: "最大傾斜角度（度）",
      },
      {
        name: "depth",
        type: "number",
        defaultValue: "36",
        description: "內容抬升的景深距離（px）",
      },
    ],
  },
  {
    slug: "glass-card",
    name: "液態玻璃卡片",
    nameEn: "Glass Card",
    category: "cards",
    description:
      "backdrop-blur 玻璃擬態卡片，帶邊緣高光與內部微噪點，放在漸層或照片背景上效果最好。",
    dependencies: [],
    props: [
      {
        name: "blur",
        type: "number",
        defaultValue: "16",
        description: "背景模糊強度（px）",
      },
      {
        name: "tint",
        type: "string",
        defaultValue: '"rgba(255, 255, 255, 0.1)"',
        description: "玻璃底色，建議帶透明度",
      },
    ],
    source: { label: "Aether CSS", url: "https://aethercss.lovable.app/" },
  },
  {
    slug: "gradient-border-card",
    name: "漸層邊框卡片",
    nameEn: "Gradient Border Card",
    category: "cards",
    description:
      "底層一圈持續旋轉的 conic-gradient、內層蓋住中間，形成會流動的漸層邊框。",
    dependencies: [],
    props: [
      {
        name: "colors",
        type: "string[]",
        defaultValue: '["#f59e0b", "#ec4899", "#8b5cf6", "#f59e0b"]',
        description: "邊框漸層色，首尾同色可無縫循環",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "4",
        description: "旋轉一圈的秒數",
      },
      {
        name: "borderWidth",
        type: "number",
        defaultValue: "1.5",
        description: "邊框寬度（px）",
      },
      {
        name: "background",
        type: "string",
        defaultValue: '"#09090b"',
        description: "內層背景色",
      },
    ],
  },
  {
    slug: "flip-card",
    name: "翻轉卡片",
    nameEn: "Flip Card",
    category: "cards",
    description:
      "hover 或點擊時沿 Y 軸 3D 翻面，front / back 各接一個 ReactNode，鍵盤也能操作。",
    dependencies: [],
    props: [
      {
        name: "front",
        type: "ReactNode",
        description: "正面內容",
      },
      {
        name: "back",
        type: "ReactNode",
        description: "背面內容",
      },
      {
        name: "trigger",
        type: '"hover" | "click"',
        defaultValue: '"hover"',
        description: "翻面觸發方式",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "0.6",
        description: "翻面動畫秒數",
      },
    ],
  },
  {
    slug: "magic-card",
    name: "魔法卡片",
    nameEn: "Magic Card",
    category: "cards",
    description:
      "游標靠近時邊框浮現漸層、卡片內跟著游標出現柔和光暈；另有 orb 模式改為一顆彈簧跟隨的模糊光球。深淺色模式自動偵測。",
    dependencies: ["motion"],
    props: [
      {
        name: "mode",
        type: '"gradient" | "orb"',
        defaultValue: '"gradient"',
        description: "光效模式：跟隨光暈或彈簧光球",
      },
      {
        name: "gradientSize",
        type: "number",
        defaultValue: "200",
        description: "跟隨光暈的半徑（px）",
      },
      {
        name: "gradientColor",
        type: "string",
        defaultValue: '"#262626"',
        description: "跟隨光暈的顏色",
      },
      {
        name: "gradientOpacity",
        type: "number",
        defaultValue: "0.8",
        description: "跟隨光暈的不透明度 0–1",
      },
      {
        name: "gradientFrom",
        type: "string",
        defaultValue: '"#9E7AFF"',
        description: "邊框漸層起始色",
      },
      {
        name: "gradientTo",
        type: "string",
        defaultValue: '"#FE8BBB"',
        description: "邊框漸層結束色",
      },
      {
        name: "backgroundColor",
        type: "string",
        description: "卡片內層背景色；未指定時依深淺色模式自動選擇",
      },
      {
        name: "borderColor",
        type: "string",
        description: "靜止時的邊框色；未指定時依深淺色模式自動選擇",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/magic-card",
      license: "MIT",
    },
  },
  {
    slug: "neon-gradient-card",
    name: "霓虹漸層卡片",
    nameEn: "Neon Gradient Card",
    category: "cards",
    description:
      "卡片外圈一層流動的雙色漸層邊框，外加同色系大範圍模糊光暈，像霓虹燈管一樣發光。適合深色頁面的重點卡片。",
    dependencies: [],
    props: [
      {
        name: "borderSize",
        type: "number",
        defaultValue: "2",
        description: "邊框寬度（px）",
      },
      {
        name: "borderRadius",
        type: "number",
        defaultValue: "20",
        description: "圓角半徑（px）",
      },
      {
        name: "neonColors",
        type: "{ firstColor: string; secondColor: string }",
        defaultValue: '{ firstColor: "#ff00aa", secondColor: "#00FFF1" }',
        description: "霓虹漸層的兩端顏色",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/neon-gradient-card",
      license: "MIT",
    },
  },
  {
    slug: "holographic-card",
    name: "全息卡片",
    nameEn: "Holographic Card",
    category: "cards",
    description:
      "隨游標傾斜的 3D 卡片，表面帶彩虹箔光、閃粉與鏡面眩光，像實體全息收藏卡。四種箔色可選，也能改用手機陀螺儀驅動傾斜。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "variant",
        type: '"rainbow" | "aurora" | "galaxy" | "gold"',
        defaultValue: '"rainbow"',
        description: "箔光配色",
      },
      {
        name: "maxTilt",
        type: "number",
        defaultValue: "14",
        description: "朝游標最大傾斜角度（度）",
      },
      {
        name: "glare",
        type: "boolean",
        defaultValue: "true",
        description: "是否顯示跟著游標的鏡面眩光",
      },
      {
        name: "sparkle",
        type: "boolean",
        defaultValue: "true",
        description: "是否疊上細閃粉遮罩",
      },
      {
        name: "gyroscope",
        type: "boolean",
        defaultValue: "false",
        description: "觸控裝置改用陀螺儀驅動傾斜（iOS 需使用者手勢授權）",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/holographic-card",
      license: "MIT",
    },
  },
  {
    slug: "liquid-glass-card",
    name: "液態玻璃折射卡片",
    nameEn: "Liquid Glass Card",
    category: "cards",
    description:
      "用 SVG 位移貼圖做出真實折射的玻璃面板：邊緣把背後畫面折彎並產生色散，游標移動時浮現鏡面高光。Chrome / Edge 支援即時折射，其他瀏覽器自動退回純模糊。",
    dependencies: [],
    props: [
      { name: "radius", type: "number", defaultValue: "28", description: "圓角半徑（px）" },
      { name: "blur", type: "number", defaultValue: "2", description: "背景霧化強度（px）" },
      {
        name: "strength",
        type: "number",
        defaultValue: "60",
        description: "折射位移強度（px），越大邊緣彎越兇",
      },
      {
        name: "dispersion",
        type: "number",
        defaultValue: "0.15",
        description: "色散量 0–1，把 R/G/B 折射分離",
      },
      {
        name: "saturation",
        type: "number",
        defaultValue: "1.6",
        description: "背景飽和度倍率",
      },
      {
        name: "tint",
        type: "string",
        defaultValue: '"rgba(255,255,255,0.08)"',
        description: "玻璃底色，建議帶透明度",
      },
      { name: "sheen", type: "number", defaultValue: "0.5", description: "高光強度 0–1" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/glass/liquid-glass-card",
      license: "MIT",
    },
  },
  {
    slug: "liquid-glass-lens",
    name: "液態玻璃透鏡",
    nameEn: "Liquid Glass Lens",
    category: "cards",
    description:
      "一顆跟著游標跑的圓形玻璃鏡片，把底下真實 DOM 折射放大並帶色散。父層要是 relative，鏡片本身不擋點擊，可直接疊在既有內容上。",
    dependencies: [],
    props: [
      { name: "size", type: "number", defaultValue: "160", description: "鏡片直徑（px）" },
      { name: "blur", type: "number", defaultValue: "2", description: "背景霧化強度（px）" },
      {
        name: "strength",
        type: "number",
        defaultValue: "80",
        description: "折射位移強度（px）",
      },
      {
        name: "dispersion",
        type: "number",
        defaultValue: "0.15",
        description: "色散量 0–1",
      },
      {
        name: "saturation",
        type: "number",
        defaultValue: "1.6",
        description: "背景飽和度倍率",
      },
      {
        name: "tint",
        type: "string",
        defaultValue: '"rgba(255,255,255,0.08)"',
        description: "鏡片底色，建議帶透明度",
      },
      { name: "sheen", type: "number", defaultValue: "0.5", description: "高光強度 0–1" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/glass/liquid-glass-lens",
      license: "MIT",
    },
  },
  {
    slug: "encrypted-card",
    name: "加密卡片",
    nameEn: "Encrypted Card",
    category: "cards",
    description:
      "卡片底下鋪滿不斷跳動的亂碼字流，游標經過時只在一圈柔邊視窗內顯形，像正在解密掃描。適合資安、AI 或技術類的功能卡片。",
    dependencies: [],
    props: [
      {
        name: "characters",
        type: "string",
        defaultValue: "英數與符號",
        description: "亂碼字流的字元池",
      },
      {
        name: "speed",
        type: "number",
        defaultValue: "55",
        description: "hover 時重新亂數的間隔（毫秒）",
      },
      {
        name: "revealRadius",
        type: "number",
        defaultValue: "130",
        description: "跟著游標的顯形視窗半徑（px）",
      },
      {
        name: "streamColor",
        type: "string",
        defaultValue: '"var(--primary, oklch(0.205 0 0))"',
        description: "亂碼字流顏色",
      },
      {
        name: "streamOpacity",
        type: "number",
        defaultValue: "1",
        description: "顯形後的字流不透明度 0–1",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/effects/encrypted-card",
      license: "MIT",
    },
  },
];
