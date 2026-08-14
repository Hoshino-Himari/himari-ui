// 一個 route 同時供三種取用方式：
//   /r/registry.json    → 全站 shadcn registry 索引（不含原始碼）
//   /r/<slug>.json      → 單一元件的 registry item（含完整原始碼，shadcn CLI 用這個）
//   /r/<slug>.tsx       → 純文字原始碼，給 curl / AI 直接讀
import { registry, getEntry } from "@/lib/registry";
import {
  buildRegistryIndex,
  buildRegistryItem,
  getComponentCode,
} from "@/lib/registry-item";

export function generateStaticParams() {
  return [
    { slug: "registry.json" },
    ...registry.flatMap((entry) => [
      { slug: `${entry.slug}.json` },
      { slug: `${entry.slug}.tsx` },
    ]),
  ];
}

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

const TEXT_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Access-Control-Allow-Origin": "*",
};

export async function GET(_req: Request, ctx: RouteContext<"/r/[slug]">) {
  const { slug } = await ctx.params;

  if (slug === "registry.json") {
    return new Response(JSON.stringify(buildRegistryIndex(), null, 2), {
      headers: JSON_HEADERS,
    });
  }

  if (slug.endsWith(".tsx")) {
    const code = getComponentCode(slug.slice(0, -".tsx".length));
    if (!code) return new Response("Not found", { status: 404 });
    return new Response(code, { headers: TEXT_HEADERS });
  }

  if (slug.endsWith(".json")) {
    const entry = getEntry(slug.slice(0, -".json".length));
    const item = entry ? buildRegistryItem(entry, true) : null;
    if (!item) return new Response("Not found", { status: 404 });
    return new Response(JSON.stringify(item, null, 2), {
      headers: JSON_HEADERS,
    });
  }

  return new Response("Not found", { status: 404 });
}
