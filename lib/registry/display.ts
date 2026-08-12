import type { ComponentEntry } from "./types";

export const display: ComponentEntry[] = [
  {
    slug: "animated-list",
    name: "動畫清單",
    nameEn: "Animated List",
    category: "display",
    description:
      "清單項目依序以彈簧動畫彈入，新項目從最上方插入並把舊項目往下推，適合展示通知流或即時動態。",
    dependencies: ["motion"],
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "清單項目，會依序逐一彈入",
      },
      {
        name: "delay",
        type: "number",
        defaultValue: "1000",
        description: "每個項目彈入的間隔（毫秒）",
      },
      {
        name: "className",
        type: "string",
        description: "疊加在清單容器上的 class",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/animated-list",
      license: "MIT",
    },
  },
  {
    slug: "avatar-circles",
    name: "頭像圈",
    nameEn: "Avatar Circles",
    category: "display",
    description:
      "一排互相重疊的圓形頭像，最後可加一顆「+N」表示其餘人數，適合展示參與者、貢獻者或用戶群。",
    dependencies: [],
    props: [
      {
        name: "avatarUrls",
        type: "{ imageUrl: string; profileUrl: string }[]",
        description: "頭像清單：圖片網址與點擊後開啟的個人頁連結",
      },
      {
        name: "numPeople",
        type: "number",
        description: "頭像之外的剩餘人數（顯示為 +N），不填或 0 則不顯示",
      },
      {
        name: "className",
        type: "string",
        description: "疊加在容器上的 class",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/avatar-circles",
      license: "MIT",
    },
  },
  {
    slug: "bento-grid",
    name: "便當格局",
    nameEn: "Bento Grid",
    category: "display",
    description:
      "不規則網格排版的功能卡片牆（BentoGrid + BentoCard），每張卡片含背景、圖示、標題、描述與 hover 時浮出的行動連結，適合做功能總覽區塊。",
    dependencies: [],
    props: [
      {
        name: "name",
        type: "string",
        description: "（BentoCard）卡片標題",
      },
      {
        name: "description",
        type: "string",
        description: "（BentoCard）卡片描述",
      },
      {
        name: "Icon",
        type: "React.ElementType",
        description: "（BentoCard）圖示元件，會收到 className",
      },
      {
        name: "background",
        type: "ReactNode",
        description: "（BentoCard）卡片背景層，通常是絕對定位的裝飾元素",
      },
      {
        name: "href",
        type: "string",
        description: "（BentoCard）行動連結網址",
      },
      {
        name: "cta",
        type: "string",
        description: "（BentoCard）行動連結文字",
      },
      {
        name: "className",
        type: "string",
        description: "BentoCard 用來控制跨欄（如 col-span-2）；BentoGrid 用來調整欄數與列高",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/bento-grid",
      license: "MIT",
    },
  },
  {
    slug: "terminal",
    name: "終端機",
    nameEn: "Terminal",
    category: "display",
    description:
      "macOS 風格的終端機視窗，搭配 TypingAnimation 逐字打字與 AnimatedSpan 淡入行，預設依序播放，適合展示 CLI 安裝流程。",
    dependencies: ["motion"],
    props: [
      {
        name: "children",
        type: "ReactNode",
        description: "終端機內容，放 TypingAnimation 與 AnimatedSpan",
      },
      {
        name: "sequence",
        type: "boolean",
        defaultValue: "true",
        description: "是否讓子項目依序播放（前一行結束才開始下一行）",
      },
      {
        name: "startOnView",
        type: "boolean",
        defaultValue: "true",
        description: "捲動進入視窗時才開始播放",
      },
      {
        name: "className",
        type: "string",
        description: "疊加在終端機視窗上的 class",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/terminal",
      license: "MIT",
    },
  },
];
