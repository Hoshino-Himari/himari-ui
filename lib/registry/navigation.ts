import type { ComponentEntry } from "./types";

export const navigation: ComponentEntry[] = [
  {
    slug: "dock",
    name: "macOS Dock",
    nameEn: "Dock",
    category: "navigation",
    description:
      "macOS 風格的底部圖示列：游標靠近的圖示放大、鄰近圖示漸進縮放，以 spring 平滑過渡。",
    dependencies: ["motion"],
    props: [
      {
        name: "size",
        type: "number",
        defaultValue: "44",
        description: "圖示基礎尺寸（px）",
      },
      {
        name: "magnification",
        type: "number",
        defaultValue: "76",
        description: "游標正下方時的放大尺寸（px）",
      },
      {
        name: "distance",
        type: "number",
        defaultValue: "140",
        description: "放大效果的影響半徑（px）",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/dock",
    },
  },
  {
    slug: "floating-navbar",
    name: "浮動導覽列",
    nameEn: "Floating Navbar",
    category: "navigation",
    description:
      "懸浮膠囊造型的導覽列，帶玻璃模糊與陰影；往下捲動時收起、往上捲動時滑出。",
    dependencies: ["motion"],
    props: [
      {
        name: "items",
        type: "{ label: string; href: string }[]",
        description: "導覽連結清單",
      },
      {
        name: "activeHref",
        type: "string",
        description: "目前頁面的 href，會以高亮顯示",
      },
      {
        name: "scrollContainer",
        type: "RefObject<HTMLElement | null>",
        description: "監聽捲動的容器，不傳則監聽整個視窗",
      },
      {
        name: "position",
        type: '"fixed" | "sticky" | "absolute"',
        defaultValue: '"fixed"',
        description: "定位方式：整頁用 fixed，可捲動容器內用 sticky",
      },
    ],
  },
  {
    slug: "animated-tabs",
    name: "動畫分頁籤",
    nameEn: "Animated Tabs",
    category: "navigation",
    description:
      "選中指示器以 motion layoutId 在選項之間滑動，支援方向鍵切換與 role=\"tablist\" 無障礙屬性。",
    dependencies: ["motion"],
    props: [
      {
        name: "tabs",
        type: "{ value: string; label: string; content?: ReactNode }[]",
        description: "頁籤清單，content 有提供才會渲染面板",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "預設選中的 value，不傳則選第一個",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "切換頁籤時的回呼",
      },
    ],
  },
  {
    slug: "animated-breadcrumb",
    name: "動畫麵包屑",
    nameEn: "Animated Breadcrumb",
    category: "navigation",
    description:
      "麵包屑項目由左至右逐個淡入，目前頁高亮，連結 hover 時底線從左滑入。",
    dependencies: ["motion"],
    props: [
      {
        name: "items",
        type: "{ label: string; href?: string }[]",
        description: "麵包屑項目，最後一項視為目前頁",
      },
      {
        name: "separator",
        type: "ReactNode",
        defaultValue: '"/"',
        description: "項目之間的分隔符號",
      },
      {
        name: "stagger",
        type: "number",
        defaultValue: "0.08",
        description: "每個項目淡入的間隔秒數",
      },
    ],
  },
  {
    slug: "segmented-control",
    name: "分段控制器",
    nameEn: "Segmented Control",
    category: "navigation",
    description:
      "iOS 風格的選項列，選中的白色藥丸用 layoutId 在選項之間彈性滑動，支援受控／非受控、圖示與停用選項。適合檢視切換或篩選條件。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "options",
        type: "{ label: ReactNode; value: string; icon?: ReactNode; disabled?: boolean }[]",
        description: "選項清單",
      },
      { name: "value", type: "string", description: "受控模式的目前值" },
      {
        name: "defaultValue",
        type: "string",
        description: "非受控模式的初始值，不傳則選第一個",
      },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "控制器尺寸" },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "切換選項時的回呼",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/navigation/segmented-control",
      license: "MIT",
    },
  },
  {
    slug: "magic-tab",
    name: "魔法分頁",
    nameEn: "Magic Tab",
    category: "navigation",
    description:
      "選中的分頁會浮起成 3D 立體按鈕，下方托著一層流動的彩虹光暈與陰影；支援方向鍵移動焦點、Enter／空白鍵選取的完整鍵盤操作。",
    dependencies: [],
    props: [
      {
        name: "items",
        type: "{ value: string; label: ReactNode; disabled?: boolean }[]",
        description: "分頁清單",
      },
      { name: "value", type: "string", description: "受控模式的目前值" },
      {
        name: "defaultValue",
        type: "string",
        description: "非受控模式的初始值，不傳則選第一個可用分頁",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "切換分頁時的回呼",
      },
      {
        name: "variant",
        type: '"default" | "secondary"',
        defaultValue: '"default"',
        description: "選中分頁的配色",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "分頁尺寸",
      },
      {
        name: "rainbow",
        type: "boolean",
        defaultValue: "true",
        description: "選中分頁的邊緣與陰影跑彩虹漸層動畫",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/navigation/magic-tab",
      license: "MIT",
    },
  },
  {
    slug: "tab-bar",
    name: "底部分頁列",
    nameEn: "Tab Bar",
    category: "navigation",
    description:
      "手機 App 風格的膠囊底部導覽列，選中的藥丸用 layoutId 彈性滑動、圖示輕彈一下、文字只在選中時展開，支援未讀徽章與 iOS 安全區內距。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "tabs",
        type: "{ value: string; label: string; icon: ReactNode; badge?: ReactNode }[]",
        description: "分頁清單",
      },
      { name: "value", type: "string", description: "受控模式的目前值" },
      {
        name: "defaultValue",
        type: "string",
        description: "非受控模式的初始值，不傳則選第一個",
      },
      {
        name: "labelsOnActiveOnly",
        type: "boolean",
        defaultValue: "true",
        description: "只在選中的分頁顯示文字",
      },
      {
        name: "safeArea",
        type: "boolean",
        defaultValue: "false",
        description: "加上底部安全區內距（手機 home indicator）",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        description: "切換分頁時的回呼",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/navigation/tab-bar",
      license: "MIT",
    },
  },
];
