import type { ComponentEntry } from "./types";

export const loaders: ComponentEntry[] = [
  {
    slug: "skeleton-loader",
    name: "骨架屏",
    nameEn: "Skeleton Loader",
    category: "loaders",
    description:
      "載入中的佔位塊，帶一道微光由左至右掃過；寬、高、圓角皆可調，可自由組合出卡片、列表等骨架。",
    dependencies: [],
    props: [
      { name: "width", type: "number | string", defaultValue: '"100%"', description: "寬度，數字為 px" },
      { name: "height", type: "number | string", defaultValue: "16", description: "高度，數字為 px" },
      { name: "radius", type: "number | string", defaultValue: "8", description: "圓角，數字為 px" },
      { name: "baseColor", type: "string", defaultValue: '"#e4e4e7"', description: "底色" },
      {
        name: "shimmerColor",
        type: "string",
        defaultValue: '"rgba(255, 255, 255, 0.65)"',
        description: "掃過的微光顏色",
      },
      { name: "duration", type: "number", defaultValue: "1.6", description: "微光掃過一輪的秒數" },
    ],
  },
  {
    slug: "ring-spinner",
    name: "旋轉環",
    nameEn: "Ring Spinner",
    category: "loaders",
    description:
      "帶缺口的圓環持續旋轉的載入指示，大小、粗細、顏色與轉速皆可調，內建無障礙標籤。",
    dependencies: [],
    props: [
      { name: "size", type: "number", defaultValue: "40", description: "外徑（px）" },
      { name: "thickness", type: "number", defaultValue: "4", description: "環的粗細（px）" },
      { name: "color", type: "string", defaultValue: '"#3f3f46"', description: "環的顏色" },
      {
        name: "trackColor",
        type: "string",
        defaultValue: '"rgba(0, 0, 0, 0.08)"',
        description: "背景軌道顏色，transparent 可隱藏",
      },
      { name: "speed", type: "number", defaultValue: "0.9", description: "轉一圈的秒數，越小越快" },
      { name: "label", type: "string", defaultValue: '"載入中"', description: "無障礙標籤" },
    ],
  },
  {
    slug: "bouncing-dots",
    name: "跳動點",
    nameEn: "Bouncing Dots",
    category: "loaders",
    description:
      "數個小圓點依序彈跳、delay 錯開形成波浪節奏的載入指示，適合聊天輸入中或輕量等待場景。",
    dependencies: [],
    props: [
      { name: "count", type: "number", defaultValue: "3", description: "點的數量" },
      { name: "size", type: "number", defaultValue: "10", description: "點的直徑（px）" },
      { name: "color", type: "string", defaultValue: '"#3f3f46"', description: "點的顏色" },
      { name: "speed", type: "number", defaultValue: "1", description: "單一點彈跳一輪的秒數" },
      { name: "stagger", type: "number", defaultValue: "0.16", description: "相鄰點的延遲差（秒）" },
      { name: "label", type: "string", defaultValue: '"載入中"', description: "無障礙標籤" },
    ],
  },
  {
    slug: "animated-progress",
    name: "動畫進度條",
    nameEn: "Animated Progress",
    category: "loaders",
    description:
      "value 受控的進度條，填色段平滑過渡並帶一道流動高光，可顯示百分比，含 progressbar 無障礙屬性。",
    dependencies: [],
    props: [
      { name: "value", type: "number", description: "目前進度（0 ~ max）" },
      { name: "max", type: "number", defaultValue: "100", description: "進度上限" },
      { name: "showLabel", type: "boolean", defaultValue: "false", description: "是否在右側顯示百分比" },
      { name: "color", type: "string", defaultValue: '"#f59e0b"', description: "填色" },
      {
        name: "trackColor",
        type: "string",
        defaultValue: '"rgba(0, 0, 0, 0.08)"',
        description: "軌道底色",
      },
      { name: "height", type: "number", defaultValue: "10", description: "條的高度（px）" },
      { name: "label", type: "string", defaultValue: '"進度"', description: "無障礙標籤" },
    ],
  },
  {
    slug: "orbit-loader",
    name: "軌道載入",
    nameEn: "Orbit Loader",
    category: "loaders",
    description:
      "數個小點繞著圓心等速公轉的載入指示，半徑、點數、大小與速度皆可調，尾點漸淡帶出方向感。",
    dependencies: [],
    props: [
      { name: "radius", type: "number", defaultValue: "16", description: "公轉半徑（px）" },
      { name: "count", type: "number", defaultValue: "4", description: "小點數量" },
      { name: "dotSize", type: "number", defaultValue: "7", description: "小點直徑（px）" },
      { name: "color", type: "string", defaultValue: '"#3f3f46"', description: "小點顏色" },
      { name: "speed", type: "number", defaultValue: "1.4", description: "公轉一圈的秒數，越小越快" },
      { name: "label", type: "string", defaultValue: '"載入中"', description: "無障礙標籤" },
    ],
  },
];
