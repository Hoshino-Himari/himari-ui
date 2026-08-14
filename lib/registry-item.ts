// 把站內 registry 條目轉成 shadcn CLI 認得的 registry-item 格式，
// 讓任何人用 `npx shadcn@latest add <本站網址>/r/<slug>.json` 一行裝進自己的專案。
//
// 欄位形狀比對自實際運作中的 shadcn registry（https://godui.design/r/shimmer-button.json）：
// $schema / name / type / title / description / dependencies / registryDependencies /
// files[{ path, content, type, target }]，另有選用的 cssVars 與 css。
//
// 本站元件不需要 cssVars / css：app/globals.css 沒有任何 @keyframes，
// 需要動畫的元件都在自己的 .tsx 裡自帶 @keyframes，單檔即可運作。
import type { ComponentEntry } from "./registry/types";
import { registry } from "./registry";
import registryCode from "./registry-code.json";
import { SITE_URL } from "./site";

const codeMap = registryCode as Record<string, string>;

export type RegistryFile = {
  path: string;
  content?: string;
  type: "registry:ui";
  target: string;
};

export type RegistryItem = {
  $schema?: string;
  name: string;
  type: "registry:ui";
  title: string;
  description: string;
  dependencies?: string[];
  files: RegistryFile[];
};

/** 元件在使用者專案裡的落點，也是本站 components/ui 的原始路徑。 */
export function targetPath(slug: string) {
  return `components/ui/${slug}.tsx`;
}

export function getComponentCode(slug: string): string | undefined {
  return codeMap[slug];
}

/**
 * @param withContent 單一元件端點要帶原始碼；registry 索引不帶（否則索引會膨脹到近 900KB）
 */
export function buildRegistryItem(
  entry: ComponentEntry,
  withContent: boolean
): RegistryItem | null {
  const content = codeMap[entry.slug];
  if (!content) return null;

  const file: RegistryFile = {
    path: targetPath(entry.slug),
    type: "registry:ui",
    target: targetPath(entry.slug),
  };
  if (withContent) file.content = content;

  const item: RegistryItem = {
    ...(withContent
      ? { $schema: "https://ui.shadcn.com/schema/registry-item.json" }
      : {}),
    name: entry.slug,
    type: "registry:ui",
    title: entry.name,
    description: entry.description,
    ...(entry.dependencies.length > 0
      ? { dependencies: [...entry.dependencies] }
      : {}),
    files: [file],
  };
  return item;
}

export function buildRegistryIndex() {
  return {
    $schema: "https://ui.shadcn.com/schema/registry.json",
    name: "himari-ui",
    homepage: SITE_URL,
    items: registry
      .map((entry) => buildRegistryItem(entry, false))
      .filter((item): item is RegistryItem => item !== null),
  };
}
