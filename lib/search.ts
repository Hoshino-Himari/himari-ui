// 側欄與 ⌘K 命令面板共用的搜尋層。
//
// 原本側欄只比對 name / nameEn / slug，description 與分類名完全沒進索引，
// 所以搜「模糊」找不到毛玻璃、搜「滑鼠」找不到聚光燈。這裡把索引補齊，
// 再加一層同義詞展開，讓中英文與口語說法都能命中，不必逐一手填 126 筆 tags。
import type { ComponentEntry } from "./registry/types";
import { categories } from "./registry";

/** 同一組內的詞互為同義詞：查其中一個，整組都會被拿去比對。 */
const SYNONYM_GROUPS: string[][] = [
  ["玻璃", "毛玻璃", "玻璃擬態", "glass", "frost", "霧面"],
  ["模糊", "blur", "backdrop"],
  ["3D", "立體", "傾斜", "tilt", "perspective", "透視"],
  ["滾動", "捲動", "scroll", "捲軸"],
  ["粒子", "particle", "顆粒"],
  ["發光", "光暈", "glow", "聚光", "spotlight", "霓虹", "neon"],
  ["漸層", "gradient", "漸變"],
  ["打字", "typewriter", "逐字", "typing"],
  ["載入", "讀取", "loading", "loader", "spinner", "轉圈", "骨架", "skeleton"],
  ["動畫", "動效", "animation", "animated", "motion"],
  ["游標", "滑鼠", "cursor", "mouse", "鼠標"],
  ["視差", "parallax"],
  ["磁吸", "magnetic", "吸附"],
  ["地球", "globe", "地圖", "map", "世界", "world"],
  ["對話框", "dialog", "modal", "彈窗", "浮層", "overlay"],
  ["抽屜", "drawer", "側邊欄"],
  ["提示", "tooltip", "toast", "通知", "訊息"],
  ["表單", "form", "input", "輸入", "欄位"],
  ["開關", "switch", "toggle", "切換"],
  ["滑桿", "slider", "拉桿"],
  ["分頁", "tab", "頁籤", "標籤頁"],
  ["進度", "progress", "百分比"],
  ["網格", "grid", "格線", "點陣", "dot"],
  ["光束", "beam", "光線", "ray", "射線"],
  ["波浪", "wave", "波紋", "ripple", "漣漪"],
  ["液體", "liquid", "流體", "fluid", "液態"],
  ["故障", "glitch", "雜訊", "noise", "vhs", "復古", "retro"],
  ["終端", "terminal", "命令列", "console", "終端機"],
  ["頭像", "avatar", "大頭貼"],
  ["跑馬燈", "marquee", "輪播", "carousel", "走馬燈"],
  ["星空", "star", "starfield", "流星", "meteor", "宇宙"],
  ["彩帶", "confetti", "慶祝", "禮花"],
  ["解密", "decrypt", "加密", "encrypt", "亂碼", "解碼"],
  ["極光", "aurora", "北極光"],
  ["時間軸", "timeline", "時序"],
  ["步驟", "stepper", "step", "流程"],
  ["卡片", "card"],
  ["按鈕", "button", "鈕"],
  ["文字", "text", "字"],
  ["背景", "background", "底圖"],
  ["導覽", "navigation", "nav", "選單", "menu", "導航"],
  ["數字", "number", "計數", "counter", "滾動數字"],
  ["折射", "refraction", "透鏡", "lens", "放大鏡", "magnify"],
  ["3d地球", "globe"],
];

function expandToken(token: string): string[] {
  const out = new Set<string>([token]);
  for (const group of SYNONYM_GROUPS) {
    const hit = group.some(
      (term) => term === token || term.includes(token) || token.includes(term)
    );
    if (hit) for (const term of group) out.add(term);
  }
  return [...out];
}

type Indexed = {
  entry: ComponentEntry;
  name: string;
  nameEn: string;
  slug: string;
  /** description + 分類名 + tags，全部小寫 */
  extra: string;
};

const categoryNameById = new Map(categories.map((c) => [c.id, c.name]));

function indexOf(entry: ComponentEntry): Indexed {
  return {
    entry,
    name: entry.name.toLowerCase(),
    nameEn: entry.nameEn.toLowerCase(),
    slug: entry.slug.toLowerCase(),
    extra: [
      entry.description,
      categoryNameById.get(entry.category) ?? "",
      ...(entry.tags ?? []),
    ]
      .join(" ")
      .toLowerCase(),
  };
}

const indexCache = new WeakMap<ComponentEntry[], Indexed[]>();

function getIndex(entries: ComponentEntry[]): Indexed[] {
  let idx = indexCache.get(entries);
  if (!idx) {
    idx = entries.map(indexOf);
    indexCache.set(entries, idx);
  }
  return idx;
}

/** 單一關鍵字對單一元件的得分；0 代表沒命中。 */
function scoreKeyword(item: Indexed, kw: string, isOriginal: boolean): number {
  const bonus = isOriginal ? 0 : -18; // 同義詞命中排在原字命中後面
  if (item.slug === kw || item.nameEn === kw) return 100 + bonus;
  if (item.name === kw) return 95 + bonus;
  if (item.name.startsWith(kw)) return 80 + bonus;
  if (item.name.includes(kw)) return 65 + bonus;
  if (item.nameEn.startsWith(kw) || item.slug.startsWith(kw)) return 60 + bonus;
  if (item.nameEn.includes(kw) || item.slug.includes(kw)) return 50 + bonus;
  if (item.extra.includes(kw)) return 30 + bonus;
  return 0;
}

/**
 * 依相關度排序的搜尋結果。空字串回傳原始順序（側欄需要維持分類排序）。
 */
export function searchEntries(
  entries: ComponentEntry[],
  query: string
): ComponentEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return entries;

  const tokens = q.split(/\s+/).filter(Boolean);
  const index = getIndex(entries);
  const scored: { entry: ComponentEntry; score: number }[] = [];

  for (const item of index) {
    let total = 0;
    let matchedAll = true;

    for (const token of tokens) {
      const keywords = expandToken(token);
      let best = 0;
      for (const kw of keywords) {
        const s = scoreKeyword(item, kw, kw === token);
        if (s > best) best = s;
      }
      if (best === 0) {
        matchedAll = false;
        break;
      }
      total += best;
    }

    if (matchedAll) scored.push({ entry: item.entry, score: total });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.entry);
}
