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
];
