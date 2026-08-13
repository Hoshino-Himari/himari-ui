import type { Category, ComponentEntry, CategoryId } from "./types";
import { buttons } from "./buttons";
import { cards } from "./cards";
import { text } from "./text";
import { backgrounds } from "./backgrounds";
import { loaders } from "./loaders";
import { inputs } from "./inputs";
import { navigation } from "./navigation";
import { effects } from "./effects";
import { display } from "./display";
import { canvas } from "./canvas";
import { overlays } from "./overlays";

export type { Category, ComponentEntry, CategoryId, PropDoc, SourceRef } from "./types";

export const categories: Category[] = [
  { id: "buttons", name: "按鈕", nameEn: "Buttons", description: "帶動效與質感的按鈕：摺疊進度、微光、磁吸、液態玻璃。" },
  { id: "cards", name: "卡片", nameEn: "Cards", description: "聚光燈、3D 傾斜、玻璃擬態等有互動回饋的卡片。" },
  { id: "text", name: "文字特效", nameEn: "Text Effects", description: "打字機、解碼、漸層流動、數字滾動等文字動畫。" },
  { id: "backgrounds", name: "背景特效", nameEn: "Backgrounds", description: "極光、粒子、流星、網格光束等全版背景。" },
  { id: "loaders", name: "載入動畫", nameEn: "Loaders", description: "骨架屏、旋轉環、進度條等載入狀態元件。" },
  { id: "inputs", name: "輸入與表單", nameEn: "Inputs & Forms", description: "浮動標籤、發光聚焦、OTP、開關、滑桿。" },
  { id: "navigation", name: "導覽", nameEn: "Navigation", description: "macOS Dock、浮動導覽列、動畫分頁籤與麵包屑。" },
  { id: "effects", name: "互動特效", nameEn: "Effects", description: "3D 地球、跑馬燈、光束邊框、彩帶等點睛特效。" },
  { id: "display", name: "展示區塊", nameEn: "Display", description: "動畫清單、便當格局、終端機、頭像圈等內容展示元件。" },
  { id: "canvas", name: "WebGL 畫布", nameEn: "Canvas / WebGL", description: "液體模擬、玻璃折射、故障藝術等跑在真實 HTML 上的 WebGL 特效。" },
  { id: "overlays", name: "浮層", nameEn: "Overlays", description: "動態島、變形對話框、Toast、抽屜等浮出介面元件。" },
];

export const registry: ComponentEntry[] = [
  ...buttons,
  ...cards,
  ...text,
  ...backgrounds,
  ...loaders,
  ...inputs,
  ...navigation,
  ...effects,
  ...display,
  ...canvas,
  ...overlays,
];

export function getEntry(slug: string): ComponentEntry | undefined {
  return registry.find((e) => e.slug === slug);
}

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id)!;
}

export function entriesByCategory(id: CategoryId): ComponentEntry[] {
  return registry.filter((e) => e.category === id);
}
