export type CategoryId =
  | "buttons"
  | "cards"
  | "text"
  | "backgrounds"
  | "loaders"
  | "inputs"
  | "navigation"
  | "effects"
  | "display"
  | "canvas"
  | "overlays"
  | "layout";

export type Category = {
  id: CategoryId;
  /** 繁體中文分類名 */
  name: string;
  nameEn: string;
  /** 一句話說明這個分類收什麼 */
  description: string;
};

export type PropDoc = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export type SourceRef = {
  /** 開源出處或靈感來源名稱，例如 "MagicUI" */
  label: string;
  url: string;
  /** 原專案授權（如 "MIT"）。有填代表程式碼為照搬移植；沒填代表僅為靈感改寫 */
  license?: string;
};

export type ComponentEntry = {
  /** 網址 slug，同時也是 components/ui/<slug>.tsx 的檔名 */
  slug: string;
  /** 繁體中文元件名 */
  name: string;
  nameEn: string;
  category: CategoryId;
  /** 一到兩句繁中描述：元件做什麼、適合用在哪 */
  description: string;
  /** react / react-dom 以外需要 npm install 的套件 */
  dependencies: string[];
  /** 額外搜尋關鍵字。多數元件靠 lib/search.ts 的同義詞表就夠了，這裡只補特例 */
  tags?: string[];
  props?: PropDoc[];
  /** 改寫自哪個開源專案（會顯示出處連結） */
  source?: SourceRef;
};
