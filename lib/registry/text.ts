import type { ComponentEntry } from "./types";

export const text: ComponentEntry[] = [
  {
    slug: "typewriter-text",
    name: "打字機文字",
    nameEn: "Typewriter Text",
    category: "text",
    description:
      "把句子逐字打出、停頓後逐字刪除，再換下一句循環播放，附閃爍游標。適合首頁標語輪播多個賣點。",
    dependencies: [],
    props: [
      { name: "phrases", type: "string[]", description: "要輪播的句子" },
      { name: "typingSpeed", type: "number", defaultValue: "90", description: "打出一個字的間隔（毫秒）" },
      { name: "deletingSpeed", type: "number", defaultValue: "45", description: "刪除一個字的間隔（毫秒）" },
      { name: "pause", type: "number", defaultValue: "1600", description: "整句打完後的停留時間（毫秒）" },
      { name: "showCursor", type: "boolean", defaultValue: "true", description: "是否顯示閃爍游標" },
      { name: "cursorColor", type: "string", defaultValue: '"currentColor"', description: "游標顏色" },
    ],
  },
  {
    slug: "gradient-text",
    name: "漸層動畫文字",
    nameEn: "Gradient Text",
    category: "text",
    description:
      "用 background-clip: text 讓漸層在文字上緩緩流動，顏色與速度皆可調。適合標題或品牌名稱的視覺焦點。",
    dependencies: [],
    props: [
      {
        name: "colors",
        type: "string[]",
        defaultValue: '["#f59e0b", "#ec4899", "#8b5cf6", "#f59e0b"]',
        description: "漸層顏色，頭尾同色可無縫循環（未補尾色會自動補上）",
      },
      { name: "speed", type: "number", defaultValue: "6", description: "流動一輪的秒數，越小越快" },
    ],
  },
  {
    slug: "decrypt-text",
    name: "解碼文字",
    nameEn: "Decrypt Text",
    category: "text",
    description:
      "進入視窗時觸發，亂碼字元由左至右逐位收斂成目標文字，帶出駭客解密的氛圍。適合科技感的標題進場。",
    dependencies: [],
    props: [
      { name: "text", type: "string", description: "要解碼出來的目標文字" },
      { name: "speed", type: "number", defaultValue: "45", description: "每次收斂一個字的間隔（毫秒）" },
      {
        name: "charset",
        type: "string",
        defaultValue: '"A-Za-z0-9 與常見符號"',
        description: "亂碼取樣的字元集",
      },
    ],
    source: { label: "React Bits", url: "https://reactbits.dev" },
  },
  {
    slug: "stagger-text",
    name: "逐字浮現",
    nameEn: "Stagger Text",
    category: "text",
    description:
      "進入視窗時每個字元依序淡入並上浮，只觸發一次。適合標題或重點句的進場動畫。",
    dependencies: ["motion"],
    props: [
      { name: "text", type: "string", description: "要逐字浮現的文字" },
      { name: "stagger", type: "number", defaultValue: "0.04", description: "相鄰字元的錯開時間（秒）" },
      { name: "duration", type: "number", defaultValue: "0.5", description: "單一字元的動畫時長（秒）" },
      { name: "delay", type: "number", defaultValue: "0", description: "整段動畫的起始延遲（秒）" },
    ],
  },
  {
    slug: "neon-text",
    name: "霓虹文字",
    nameEn: "Neon Text",
    category: "text",
    description:
      "多層 text-shadow 疊出霓虹燈光暈，並帶偶發閃爍，光色可調。適合深色背景上的招牌式標題。",
    dependencies: [],
    props: [
      { name: "color", type: "string", defaultValue: '"#22d3ee"', description: "霓虹光暈顏色" },
      { name: "flicker", type: "boolean", defaultValue: "true", description: "是否啟用偶發閃爍" },
      { name: "flickerDuration", type: "number", defaultValue: "4", description: "閃爍循環週期（秒）" },
    ],
  },
  {
    slug: "number-ticker",
    name: "數字滾動",
    nameEn: "Number Ticker",
    category: "text",
    description:
      "進入視窗時數字從 0 以彈簧曲線平滑滾到目標值，自動加千分位、支援小數。適合數據看板與成效區塊。",
    dependencies: ["motion"],
    props: [
      { name: "value", type: "number", description: "目標數字" },
      { name: "decimalPlaces", type: "number", defaultValue: "0", description: "顯示的小數位數" },
      { name: "delay", type: "number", defaultValue: "0", description: "進入視窗後的起始延遲（秒）" },
      { name: "prefix", type: "string", defaultValue: '""', description: "數字前綴，例如 $" },
      { name: "suffix", type: "string", defaultValue: '""', description: "數字後綴，例如 +" },
    ],
    source: { label: "MagicUI", url: "https://magicui.design/docs/components/number-ticker" },
  },
  {
    slug: "word-rotate",
    name: "詞語輪播",
    nameEn: "Word Rotate",
    category: "text",
    description:
      "一組詞彙以垂直翻頁動畫依序輪播，動畫參數可透過 motionProps 覆寫。適合首頁標語中替換的關鍵字。",
    dependencies: ["motion"],
    props: [
      { name: "words", type: "string[]", description: "要輪播的詞彙" },
      { name: "duration", type: "number", defaultValue: "2500", description: "每個詞停留的時間（毫秒）" },
      { name: "motionProps", type: "MotionProps", defaultValue: "淡入下滑／淡出下滑", description: "覆寫進出場動畫" },
    ],
    source: { label: "MagicUI", url: "https://magicui.design/docs/components/word-rotate", license: "MIT" },
  },
  {
    slug: "sparkles-text",
    name: "星火文字",
    nameEn: "Sparkles Text",
    category: "text",
    description:
      "文字周圍隨機閃現的星星火花，位置與顏色持續更新，火花數量與雙色可調。適合強調品牌名或關鍵詞。",
    dependencies: ["motion"],
    props: [
      { name: "children", type: "ReactNode", description: "要加上火花的文字內容" },
      { name: "sparklesCount", type: "number", defaultValue: "10", description: "同時存在的火花數量" },
      {
        name: "colors",
        type: "{ first: string; second: string }",
        defaultValue: '{ first: "#9E7AFF", second: "#FE8BBB" }',
        description: "火花隨機取用的兩種顏色",
      },
    ],
    source: { label: "MagicUI", url: "https://magicui.design/docs/components/sparkles-text", license: "MIT" },
  },
  {
    slug: "hyper-text",
    name: "亂數翻牌文字",
    nameEn: "Hyper Text",
    category: "text",
    description:
      "字元先以隨機字母快速翻動，再由左至右逐一定格成目標文字，滑鼠移入可重播。適合科技感的標題或 logo 文字。",
    dependencies: ["motion"],
    props: [
      { name: "children", type: "string", description: "目標文字" },
      { name: "duration", type: "number", defaultValue: "800", description: "整段翻動動畫的時長（毫秒）" },
      { name: "delay", type: "number", defaultValue: "0", description: "動畫起始延遲（毫秒）" },
      { name: "as", type: '"div" | "span" | "h1" | ...', defaultValue: '"div"', description: "渲染成的標籤" },
      { name: "startOnView", type: "boolean", defaultValue: "false", description: "是否等進入視窗才開始" },
      { name: "animateOnHover", type: "boolean", defaultValue: "true", description: "滑鼠移入是否重播" },
      { name: "characterSet", type: "string[]", defaultValue: "A–Z 大寫字母", description: "翻動取樣的字元集" },
    ],
    source: { label: "MagicUI", url: "https://magicui.design/docs/components/hyper-text", license: "MIT" },
  },
  {
    slug: "morphing-text",
    name: "變形文字",
    nameEn: "Morphing Text",
    category: "text",
    description:
      "兩層文字以模糊交叉淡變，配合 SVG threshold 濾鏡產生液態變形的輪播效果。適合大標題輪播少量短詞。",
    dependencies: [],
    props: [
      { name: "texts", type: "string[]", description: "要輪播變形的文字" },
    ],
    source: { label: "MagicUI", url: "https://magicui.design/docs/components/morphing-text", license: "MIT" },
  },
  {
    slug: "text-reveal",
    name: "捲動顯現文字",
    nameEn: "Text Reveal",
    category: "text",
    description:
      "整段文字先以低透明度鋪底，隨捲動進度逐字轉為實色，段落會黏在畫面中央直到讀完。適合長頁面的宣言式文案。",
    dependencies: ["motion"],
    props: [
      { name: "children", type: "string", description: "要逐字顯現的整段文字（以空格分詞）" },
      {
        name: "containerRef",
        type: "RefObject<HTMLElement | null>",
        description: "自訂捲動容器的 ref；不傳則追蹤整頁捲動",
      },
    ],
    source: { label: "MagicUI", url: "https://magicui.design/docs/components/text-reveal", license: "MIT" },
  },
  {
    slug: "spinning-text",
    name: "環形旋轉文字",
    nameEn: "Spinning Text",
    category: "text",
    description:
      "把文字逐字排成圓環並持續旋轉，半徑、速度、方向皆可調。適合徽章、印章或圓形裝飾標語。",
    dependencies: ["motion"],
    props: [
      { name: "children", type: "string | string[]", description: "要排成圓環的文字" },
      { name: "duration", type: "number", defaultValue: "10", description: "旋轉一圈的秒數" },
      { name: "reverse", type: "boolean", defaultValue: "false", description: "是否逆時針旋轉" },
      { name: "radius", type: "number", defaultValue: "5", description: "圓環半徑（ch 單位）" },
      { name: "transition", type: "Transition", description: "覆寫旋轉的 transition 設定" },
      { name: "variants", type: "{ container?: Variants; item?: Variants }", description: "覆寫容器與字元的 variants" },
    ],
    source: { label: "MagicUI", url: "https://magicui.design/docs/components/spinning-text", license: "MIT" },
  },
];
