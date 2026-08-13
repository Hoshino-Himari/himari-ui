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
  {
    slug: "animated-beam",
    name: "連線光束",
    nameEn: "Animated Beam",
    category: "effects",
    description:
      "在容器內的兩個節點之間畫出 SVG 曲線，一段漸層亮光沿線流動，並隨容器縮放自動重算路徑。適合整合示意圖、資料流程圖。",
    dependencies: ["motion"],
    props: [
      {
        name: "containerRef",
        type: "RefObject<HTMLElement | null>",
        description: "外層 relative 容器的 ref，光束以它為座標系",
      },
      {
        name: "fromRef",
        type: "RefObject<HTMLElement | null>",
        description: "起點節點的 ref",
      },
      {
        name: "toRef",
        type: "RefObject<HTMLElement | null>",
        description: "終點節點的 ref",
      },
      {
        name: "curvature",
        type: "number",
        defaultValue: "0",
        description: "曲線弧度，正值向上彎、負值向下彎",
      },
      {
        name: "reverse",
        type: "boolean",
        defaultValue: "false",
        description: "亮光反向流動",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "5",
        description: "亮光流過一次的秒數",
      },
      {
        name: "delay",
        type: "number",
        defaultValue: "0",
        description: "動畫起始延遲（秒）",
      },
      {
        name: "gradientStartColor",
        type: "string",
        defaultValue: '"#ffaa40"',
        description: "亮光漸層起始色",
      },
      {
        name: "gradientStopColor",
        type: "string",
        defaultValue: '"#9c40ff"',
        description: "亮光漸層結束色",
      },
      {
        name: "pathColor",
        type: "string",
        defaultValue: '"gray"',
        description: "底線顏色",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/animated-beam",
      license: "MIT",
    },
  },
  {
    slug: "orbiting-circles",
    name: "環繞軌道",
    nameEn: "Orbiting Circles",
    category: "effects",
    description:
      "把子元素平均分佈在圓形軌道上繞中心公轉，可調半徑、速度、方向與軌道線。適合技術棧、整合服務的視覺展示。",
    dependencies: [],
    props: [
      {
        name: "radius",
        type: "number",
        defaultValue: "160",
        description: "軌道半徑（px）",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "20",
        description: "公轉一圈的秒數",
      },
      {
        name: "speed",
        type: "number",
        defaultValue: "1",
        description: "速度倍率，實際週期為 duration / speed",
      },
      {
        name: "reverse",
        type: "boolean",
        defaultValue: "false",
        description: "逆向公轉",
      },
      {
        name: "path",
        type: "boolean",
        defaultValue: "true",
        description: "是否顯示軌道線",
      },
      {
        name: "iconSize",
        type: "number",
        defaultValue: "30",
        description: "每個子元素的尺寸（px）",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/orbiting-circles",
      license: "MIT",
    },
  },
  {
    slug: "ripple",
    name: "漣漪",
    nameEn: "Ripple",
    category: "effects",
    description:
      "多層同心圓從中心緩慢脹縮擴散的背景效果，底部漸淡不搶主體。適合鋪在 Hero、CTA 區塊後面當低調動態背景。",
    dependencies: [],
    props: [
      {
        name: "mainCircleSize",
        type: "number",
        defaultValue: "210",
        description: "最內圈直徑（px），往外每圈 +70",
      },
      {
        name: "mainCircleOpacity",
        type: "number",
        defaultValue: "0.24",
        description: "最內圈不透明度，往外遞減",
      },
      {
        name: "numCircles",
        type: "number",
        defaultValue: "8",
        description: "同心圓數量",
      },
      {
        name: "color",
        type: "string",
        defaultValue: '"#71717a"',
        description: "漣漪顏色（邊框與填色基準）",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/ripple",
      license: "MIT",
    },
  },
  {
    slug: "shine-border",
    name: "流光邊框",
    nameEn: "Shine Border",
    category: "effects",
    description:
      "一圈漸層光在容器邊框上緩緩流動，以 mask 挖空只留邊框、圓角自動繼承。適合突顯重點卡片或輸入框外框。",
    dependencies: [],
    props: [
      {
        name: "borderWidth",
        type: "number",
        defaultValue: "1",
        description: "邊框線寬（px）",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "14",
        description: "流動一輪的秒數",
      },
      {
        name: "shineColor",
        type: "string | string[]",
        defaultValue: '"#000000"',
        description: "流光顏色，可傳陣列做多色漸層",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/shine-border",
      license: "MIT",
    },
  },
  {
    slug: "lens",
    name: "放大鏡",
    nameEn: "Lens",
    category: "effects",
    description:
      "滑鼠移入時出現跟著游標移動的圓形放大鏡片，也可固定鏡片位置。適合商品圖、截圖等需要看細節的內容。",
    dependencies: ["motion"],
    props: [
      {
        name: "zoomFactor",
        type: "number",
        defaultValue: "1.3",
        description: "放大倍率，必須大於 1",
      },
      {
        name: "lensSize",
        type: "number",
        defaultValue: "170",
        description: "鏡片直徑（px）",
      },
      {
        name: "isStatic",
        type: "boolean",
        defaultValue: "false",
        description: "固定鏡片於 position 指定位置，不跟隨游標",
      },
      {
        name: "position",
        type: "{ x: number; y: number }",
        defaultValue: "{ x: 0, y: 0 }",
        description: "isStatic 時鏡片的固定座標",
      },
      {
        name: "defaultPosition",
        type: "{ x: number; y: number }",
        description: "未 hover 時鏡片的預設停留位置",
      },
      {
        name: "lensColor",
        type: "string",
        defaultValue: '"black"',
        description: "鏡片遮罩顏色",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "0.1",
        description: "鏡片出現/消失的動畫秒數",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/lens",
      license: "MIT",
    },
  },
  {
    slug: "scroll-progress",
    name: "捲動進度條",
    nameEn: "Scroll Progress",
    category: "effects",
    description:
      "固定在頂端的漸層細線，以 scaleX 隨捲動進度增長，預設追蹤整頁、也可指定捲動容器。適合長文閱讀頁與文件頁。",
    dependencies: ["motion"],
    props: [
      {
        name: "containerRef",
        type: "RefObject<HTMLElement | null>",
        description: "要追蹤的捲動容器；不傳則追蹤整頁捲動",
      },
      {
        name: "className",
        type: "string",
        description: "覆寫高度、位置、漸層色等樣式",
      },
    ],
    source: {
      label: "MagicUI",
      url: "https://magicui.design/docs/components/scroll-progress",
      license: "MIT",
    },
  },
  {
    slug: "lamp",
    name: "聚光燈效",
    nameEn: "Lamp",
    category: "effects",
    description:
      "捲動進入視野時，兩道錐形光束向兩側點亮匯成一盞聚光燈，標題從光暈中浮現。適合深色頁面的段落開場或 hero 標題。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "color",
        type: "string",
        defaultValue: '"var(--primary, #22d3ee)"',
        description: "燈光顏色，任何 CSS 顏色字串",
      },
      {
        name: "children",
        type: "ReactNode",
        description: "燈光下方浮現的內容（標題、副標等）",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/effects/lamp",
      license: "MIT",
    },
  },
  {
    slug: "particle-dissolve",
    name: "粒子溶解",
    nameEn: "Particle Dissolve",
    category: "effects",
    description:
      "把文字或圖片取樣成粒子，從四散狀態聚合成形，也可反向散開或來回循環。適合戲劇性的進場標題或轉場效果。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "text",
        type: "string",
        description: "要化成粒子的文字；設定 src 時忽略",
      },
      {
        name: "src",
        type: "string",
        description: "取樣成粒子的圖片網址（保留原圖顏色）",
      },
      {
        name: "width",
        type: "number",
        defaultValue: "640",
        description: "畫布寬度（CSS px）",
      },
      {
        name: "height",
        type: "number",
        defaultValue: "240",
        description: "畫布高度（CSS px）",
      },
      {
        name: "mode",
        type: '"assemble" | "disperse" | "loop"',
        defaultValue: '"assemble"',
        description: "觸發後的行為：聚合、散開或來回循環",
      },
      {
        name: "trigger",
        type: '"mount" | "in-view" | "hover"',
        defaultValue: '"in-view"',
        description: "動畫開始時機",
      },
      {
        name: "density",
        type: "number",
        defaultValue: "4",
        description: "取樣間距（px），越小粒子越密、越吃效能",
      },
      {
        name: "particleSize",
        type: "number",
        defaultValue: "2",
        description: "粒子邊長（px）",
      },
      {
        name: "color",
        type: "string",
        description: "文字粒子顏色，預設繼承文字色",
      },
      {
        name: "font",
        type: "string",
        defaultValue: '"bold 140px ui-sans-serif, system-ui, sans-serif"',
        description: "文字粒子的字型設定",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/effects/particle-dissolve",
      license: "MIT",
    },
  },
  {
    slug: "spotlight-reveal",
    name: "聚光燈揭露",
    nameEn: "Spotlight Reveal",
    category: "effects",
    description:
      "上下兩層內容疊在一起，游標所在的圓形範圍會把上層挖穿、露出底下那層；沒有游標時光圈自己緩慢繞圈，點一下可以釘住。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "reveal",
        type: "ReactNode",
        description: "藏在下層、被光圈照到才露出的內容",
      },
      { name: "children", type: "ReactNode", description: "上層的封面內容" },
      { name: "radius", type: "number", defaultValue: "150", description: "光圈半徑（px）" },
      {
        name: "softness",
        type: "number",
        defaultValue: "0.55",
        description: "邊緣柔化程度，0 為硬邊、1 極柔",
      },
      {
        name: "ease",
        type: "number",
        defaultValue: "0.16",
        description: "光圈跟隨的緩動，越小越拖曳",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/effects/spotlight-reveal",
      license: "MIT",
    },
  },
  {
    slug: "fluid-cursor",
    name: "流體游標",
    nameEn: "Fluid Cursor",
    category: "effects",
    description:
      "一顆貼著游標跑的圓點，後面拖著慢半拍的模糊光暈，滑到連結或按鈕上會放大；預設用 difference 混合模式把底下畫面反相。只在滑鼠裝置啟用。",
    dependencies: [],
    props: [
      { name: "size", type: "number", defaultValue: "18", description: "圓點直徑（px）" },
      {
        name: "color",
        type: "string",
        defaultValue: '"white"',
        description: "圓點顏色；搭配 blend 時白色是乾淨的反相",
      },
      {
        name: "blend",
        type: "boolean",
        defaultValue: "true",
        description: "用 mix-blend-mode: difference 反相下層畫面",
      },
      {
        name: "trail",
        type: "boolean",
        defaultValue: "true",
        description: "是否拖一團慢半拍的光暈",
      },
      {
        name: "containerRef",
        type: "RefObject<HTMLElement | null>",
        description: "限定在某個容器內（容器要是 relative）；不傳則作用於整頁",
      },
      {
        name: "interactiveSelector",
        type: "string",
        defaultValue: '"a, button, [role=\'button\'], [data-cursor]"',
        description: "滑過會放大的元素選擇器",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/effects/fluid-cursor",
      license: "MIT",
    },
  },
  {
    slug: "image-trail",
    name: "圖片拖尾",
    nameEn: "Image Trail",
    category: "effects",
    description:
      "游標在區域內移動時，一張張圖片沿著軌跡依序浮現又淡出，並朝移動方向微微傾斜；開啟減少動態時改成一排靜態小圖。",
    dependencies: [],
    props: [
      { name: "images", type: "string[]", description: "依序循環使用的圖片網址" },
      {
        name: "threshold",
        type: "number",
        defaultValue: "64",
        description: "兩張圖之間至少要移動的距離（px）",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "750",
        description: "每張圖的生命週期（毫秒）",
      },
      {
        name: "max",
        type: "number",
        defaultValue: "12",
        description: "同時存活的圖片上限（DOM 物件池大小）",
      },
      { name: "size", type: "number", defaultValue: "180", description: "每張圖的邊長（px）" },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/effects/image-trail",
      license: "MIT",
    },
  },
  {
    slug: "beam-draw",
    name: "光束描繪",
    nameEn: "Beam Draw",
    category: "effects",
    description:
      "一組發光曲線隨著捲動進度從左往右畫出來，往回捲會倒著收回去，適合當章節之間的視覺串接。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "paths",
        type: "string[]",
        description: "SVG path 的 d 字串（畫布為 1000×400），不傳則用預設光束",
      },
      { name: "strokeWidth", type: "number", defaultValue: "2", description: "線寬" },
      {
        name: "container",
        type: "RefObject<HTMLElement | null>",
        description: "監聽捲動的容器，不傳則監聽整個視窗",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/effects/beam-draw",
      license: "MIT",
    },
  },
  {
    slug: "gravity",
    name: "重力場",
    nameEn: "Gravity",
    category: "effects",
    description:
      "用 matter-js 跑真實剛體物理：任何 DOM 元素包進 MatterBody 就會掉落、碰撞、堆疊，還能用滑鼠抓起來甩。離開畫面或切換分頁自動暫停。",
    dependencies: ["matter-js"],
    props: [
      {
        name: "gravity",
        type: "{ x: number; y: number }",
        defaultValue: "{ x: 0, y: 1 }",
        description: "重力向量，y: 1 往下掉、{0,0} 漂浮",
      },
      {
        name: "autoStart",
        type: "boolean",
        defaultValue: "true",
        description: "掛載後立刻開始模擬",
      },
      {
        name: "addTopWall",
        type: "boolean",
        defaultValue: "true",
        description: "補上頂部牆面，避免物體被甩出去",
      },
      {
        name: "restitution",
        type: "number",
        defaultValue: "0.4",
        description: "彈性係數 0–1",
      },
      {
        name: "x / y（MatterBody）",
        type: "number | string",
        defaultValue: '"50%" / "0%"',
        description: "初始位置，可用百分比或 px",
      },
      {
        name: "bodyType（MatterBody）",
        type: '"rectangle" | "circle"',
        defaultValue: '"rectangle"',
        description: "碰撞形狀",
      },
      {
        name: "isDraggable（MatterBody）",
        type: "boolean",
        defaultValue: "true",
        description: "是否可以用滑鼠抓取",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/visualizations/gravity",
      license: "MIT",
    },
  },
  {
    slug: "scroll-timeline",
    name: "捲動時間軸",
    nameEn: "Scroll Timeline",
    category: "effects",
    description:
      "左側一條軌道隨著捲動進度長出來，每個節點的內容依序淡入上移，適合沿革、產品路線圖或案例流程。",
    dependencies: ["framer-motion"],
    props: [
      {
        name: "data",
        type: "{ title: string; date?: string; content: ReactNode }[]",
        description: "時間軸項目",
      },
      {
        name: "container",
        type: "RefObject<HTMLElement | null>",
        description: "監聽捲動的容器，不傳則監聽整個視窗",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/visualizations/scroll-timeline",
      license: "MIT",
    },
  },
  {
    slug: "world-map",
    name: "世界地圖",
    nameEn: "World Map",
    category: "effects",
    description:
      "點陣世界地圖上畫出城市之間的弧線航線，光束沿著弧線一段段畫出來並循環，端點還有一圈擴散的漣漪。適合展示服務涵蓋範圍或全球節點。",
    dependencies: ["dotted-map", "framer-motion"],
    props: [
      {
        name: "connections",
        type: "{ start: { lat: number; lng: number; label?: string }; end: {...} }[]",
        description: "要畫的航線，不傳則用一組全球示範航線",
      },
      {
        name: "lineColor",
        type: "string",
        defaultValue: '"var(--primary, oklch(0.205 0 0))"',
        description: "航線與端點的顏色",
      },
      {
        name: "dotColor",
        type: "string",
        description: "陸地點陣的顏色",
      },
      {
        name: "loop",
        type: "boolean",
        defaultValue: "true",
        description: "航線是否循環重畫",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "1.6",
        description: "一條航線畫完的秒數",
      },
    ],
    source: {
      label: "GodUI",
      url: "https://godui.design/docs/components/visualizations/world-map",
      license: "MIT",
    },
  },
];
