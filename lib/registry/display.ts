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
  {
    slug: "image-compare",
    name: "影像比較滑桿",
    nameEn: "Image Compare",
    category: "display",
    description:
      "拖曳分隔把手在前後兩層內容之間滑動對比，支援水平／垂直方向與鍵盤方向鍵操作。適合展示修圖前後或改版前後的差異。",
    dependencies: [],
    props: [
      { name: "before", type: "ReactNode", description: "把手左側（或上方）顯示的「之前」內容" },
      { name: "after", type: "ReactNode", description: "底層的「之後」內容，決定整體尺寸" },
      { name: "initial", type: "number", defaultValue: "50", description: "把手初始位置（0–100）" },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "滑動方向",
      },
      { name: "beforeLabel", type: "string", description: "左上角的「之前」標籤文字" },
      { name: "afterLabel", type: "string", description: "右上角的「之後」標籤文字" },
      { name: "onChange", type: "(position: number) => void", description: "把手位置改變時的回呼" },
      { name: "className", type: "string", description: "疊加在容器上的 class" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/image-compare",
      license: "MIT",
    },
  },
  {
    slug: "card-swap",
    name: "卡片交換",
    nameEn: "Card Swap",
    category: "display",
    description:
      "一疊 3D 堆疊卡片自動輪播交換順序，滑鼠移動時整疊卡片跟著視差傾斜，附前後切換按鈕。適合輪播特色亮點或作品集。",
    dependencies: ["framer-motion"],
    props: [
      { name: "children", type: "ReactNode", description: "要輪播的卡片（建議 2–5 張），由前到後排列" },
      { name: "interval", type: "number", defaultValue: "3500", description: "自動輪播間隔（毫秒），0 表示停用" },
      { name: "pauseOnHover", type: "boolean", defaultValue: "true", description: "滑鼠移入時暫停自動輪播" },
      { name: "offsetY", type: "number", defaultValue: "28", description: "堆疊卡片之間的垂直位移（px）" },
      { name: "offsetX", type: "number", defaultValue: "22", description: "堆疊卡片之間的水平位移（px）" },
      { name: "scaleStep", type: "number", defaultValue: "0.06", description: "每往後一張卡片縮小的比例" },
      { name: "className", type: "string", description: "疊加在容器上的 class（記得給定寬高）" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/card-swap",
      license: "MIT",
    },
  },
  {
    slug: "split-flap-display",
    name: "翻牌顯示器",
    nameEn: "Split Flap Display",
    category: "display",
    description:
      "機場看板風格的機械翻字板，捲動進入視窗後逐欄波浪式翻牌直到定格成目標文字。適合班次表、倒數或復古告示看板。",
    dependencies: ["framer-motion"],
    props: [
      { name: "value", type: "string", description: "看板定格的文字（以大寫對照 charset 顯示）" },
      { name: "length", type: "number", description: "固定的翻牌欄數，較短的值會補空白、較長會截斷" },
      {
        name: "align",
        type: '"left" | "center" | "right"',
        defaultValue: '"left"',
        description: "文字在較寬 length 內的對齊方式",
      },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "翻牌尺寸" },
      {
        name: "charset",
        type: "string | string[]",
        defaultValue: "A–Z、0–9 與常見符號",
        description: "翻牌輪轉的字元序列；傳陣列可讓每一欄有自己的字盤",
      },
      { name: "stagger", type: "number", defaultValue: "0.06", description: "相鄰欄位開始翻牌的錯開秒數（波浪感）" },
      { name: "maxFlaps", type: "number", defaultValue: "12", description: "單欄定格前最多翻動的次數" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/split-flap-display",
      license: "MIT",
    },
  },
  {
    slug: "stepper",
    name: "步驟指示器",
    nameEn: "Stepper",
    category: "display",
    description:
      "水平或垂直的多步驟進度指示：完成的步驟以路徑動畫打勾、連接線以彈簧動畫填滿。適合結帳流程或多步驟表單。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "steps",
        type: "{ label: ReactNode; description?: ReactNode }[]",
        description: "步驟清單：標題與可選的描述",
      },
      { name: "active", type: "number", description: "目前步驟的索引（從 0 起算），之前的步驟顯示為完成" },
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "排列方向",
      },
      { name: "className", type: "string", description: "疊加在容器上的 class" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/stepper",
      license: "MIT",
    },
  },
  {
    slug: "animated-testimonials",
    name: "動畫見證輪播",
    nameEn: "Animated Testimonials",
    category: "display",
    description:
      "左側人像以微傾斜的牌堆輪流翻到最前面，右側引言逐字模糊淡入，可自動輪播也能手動前後切換。適合客戶推薦或案例輪播。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "testimonials",
        type: "{ quote: string; name: string; role: string; src: string }[]",
        description: "要輪播的引言、姓名、頭銜與人像圖",
      },
      {
        name: "autoplay",
        type: "boolean",
        defaultValue: "true",
        description: "是否自動輪播",
      },
      {
        name: "interval",
        type: "number",
        defaultValue: "5000",
        description: "自動輪播間隔（毫秒）",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/animated-testimonials",
      license: "MIT",
    },
  },
  {
    slug: "avatar-group",
    name: "頭像群組",
    nameEn: "Avatar Group",
    category: "display",
    description:
      "一排互相重疊的頭像，滑鼠移入時整排散開、單顆再往上浮起，超過上限的收成 +N；沒有圖片時自動退回文字縮寫。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "avatars",
        type: "{ src?: string; alt?: string; fallback?: string; href?: string }[]",
        description: "頭像清單",
      },
      {
        name: "max",
        type: "number",
        defaultValue: "4",
        description: "收成 +N 之前最多顯示幾顆",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "頭像尺寸",
      },
      {
        name: "spreadOnHover",
        type: "boolean",
        defaultValue: "true",
        description: "滑鼠移入時整排散開",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/avatar-group",
      license: "MIT",
    },
  },
  {
    slug: "accordion",
    name: "手風琴",
    nameEn: "Accordion",
    category: "display",
    description:
      "可展開收合的問答清單，展開時高度以彈簧動畫撐開、內容再輕輕落下，有 smooth／spring／bounce 三種手感，支援單開與多開。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "items",
        type: "{ value: string; title: ReactNode; content: ReactNode; disabled?: boolean }[]",
        description: "項目清單",
      },
      {
        name: "type",
        type: '"single" | "multiple"',
        defaultValue: '"single"',
        description: "一次只開一項或可同時展開多項",
      },
      {
        name: "defaultValue",
        type: "string | string[]",
        description: "初始展開的項目",
      },
      {
        name: "collapsible",
        type: "boolean",
        defaultValue: "true",
        description: "單開模式下允許把唯一展開的項目收起來",
      },
      {
        name: "animation",
        type: '"smooth" | "spring" | "bounce"',
        defaultValue: '"smooth"',
        description: "展開動畫的手感",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/accordion",
      license: "MIT",
    },
  },
  {
    slug: "reorder-list",
    name: "拖曳排序清單",
    nameEn: "Reorder List",
    category: "display",
    description:
      "抓住任一列上下拖動就能重新排序，被抓起的那列會浮起加陰影，其他列以彈簧動畫讓位。匯出 ReorderList 與 ReorderItem 兩個元件。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "values",
        type: "T[]",
        description: "目前排序的值（每個值必須是穩定的參考）",
      },
      {
        name: "onReorder",
        type: "(values: T[]) => void",
        description: "拖曳過程中回報新的順序",
      },
      {
        name: "axis",
        type: '"x" | "y"',
        defaultValue: '"y"',
        description: "拖曳軸向",
      },
      {
        name: "value（ReorderItem）",
        type: "T",
        description: "這一列在 values 裡對應的值",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/layout/reorder-list",
      license: "MIT",
    },
  },
];
