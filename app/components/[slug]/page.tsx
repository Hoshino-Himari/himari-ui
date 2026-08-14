import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getEntry, registry } from "@/lib/registry";
import registryCode from "@/lib/registry-code.json";
import { buildAiPrompt } from "@/lib/ai-prompt";
import { SITE_NAME, SITE_URL, shadcnAddCommand } from "@/lib/site";
import { DemoHost } from "@/components/demos";
import { CodeBlock } from "@/components/site/code-block";
import { CopyButton } from "@/components/site/copy-button";
import { PreviewTabs } from "@/components/site/preview-tabs";

const codeMap = registryCode as Record<string, string>;

export function generateStaticParams() {
  return registry.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  const url = `${SITE_URL}/components/${entry.slug}`;
  // 沒有明寫 openGraph 的話會整份沿用 root layout 的，og:title 會停在站名
  return {
    title: entry.name,
    description: entry.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "zh_TW",
      siteName: SITE_NAME,
      title: `${entry.name}（${entry.nameEn}）`,
      description: entry.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.name}（${entry.nameEn}）`,
      description: entry.description,
    },
  };
}

export default async function ComponentPage({
  params,
}: PageProps<"/components/[slug]">) {
  const { slug } = await params;
  const entry = getEntry(slug);
  const code = codeMap[slug];
  if (!entry || !code) notFound();

  const category = getCategory(entry.category);
  const installCmd =
    entry.dependencies.length > 0
      ? `npm install ${entry.dependencies.join(" ")}`
      : null;
  const filename = `components/ui/${entry.slug}.tsx`;
  const shadcnCmd = shadcnAddCommand(entry.slug);
  const aiPrompt = buildAiPrompt(entry, code);

  return (
    <main className="max-w-4xl">
      <p className="text-sm text-ink-faint">
        {category.name} / <span className="font-mono">{entry.nameEn}</span>
      </p>
      <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
          {entry.name}
        </h1>
        <CopyButton text={aiPrompt} label="複製給 AI" />
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-mute">
        {entry.description}
      </p>
      {entry.source && (
        <p className="mt-2 text-xs text-ink-faint">
          {entry.source.license ? (
            <>
              移植自開源專案{" "}
              <a
                href={entry.source.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-2 hover:text-accent-strong"
              >
                {entry.source.label}
              </a>
              （{entry.source.license} 授權），保留原作者授權聲明。
            </>
          ) : (
            <>
              改寫自{" "}
              <a
                href={entry.source.url}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline underline-offset-2 hover:text-accent-strong"
              >
                {entry.source.label}
              </a>
              的設計靈感，程式碼為本站重新實作。
            </>
          )}
        </p>
      )}

      <div className="mt-8">
        <PreviewTabs
          preview={<DemoHost slug={entry.slug} />}
          code={<CodeBlock code={code} filename={filename} />}
        />
      </div>

      <section className="mt-10">
        <h2 className="font-display text-lg font-bold text-ink">安裝</h2>

        <h3 className="mt-4 text-sm font-medium text-ink">
          方式一：一行指令（shadcn CLI）
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-mute">
          相依套件與檔案落點都會自動處理，存成{" "}
          <code className="rounded bg-paper-3 px-1.5 py-0.5 font-mono text-xs text-ink">
            {filename}
          </code>
          。
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-line bg-paper-2 px-3 py-2">
          <code className="min-w-0 flex-1 overflow-x-auto font-mono text-xs text-ink">
            {shadcnCmd}
          </code>
          <CopyButton text={shadcnCmd} label="複製指令" />
        </div>

        <h3 className="mt-6 text-sm font-medium text-ink">
          方式二：手動複製
        </h3>
        <ol className="mt-3 flex flex-col gap-3 text-sm text-ink-mute">
          {installCmd && (
            <li className="flex flex-wrap items-center gap-3">
              <span className="shrink-0">1. 安裝相依套件：</span>
              <span className="inline-flex items-center gap-2 rounded-md border border-line bg-paper-2 px-3 py-1.5 font-mono text-xs text-ink">
                {installCmd}
                <CopyButton text={installCmd} label="複製指令" />
              </span>
            </li>
          )}
          <li>
            {installCmd ? "2." : "1."} 把「程式碼」分頁的內容存成{" "}
            <code className="rounded bg-paper-3 px-1.5 py-0.5 font-mono text-xs text-ink">
              {filename}
            </code>
            ，直接 import 使用。也可以直接抓{" "}
            <a
              href={`${SITE_URL}/r/${entry.slug}.tsx`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-accent underline underline-offset-2 hover:text-accent-strong"
            >
              /r/{entry.slug}.tsx
            </a>
            （純文字原始碼）。
          </li>
        </ol>
      </section>

      {entry.props && entry.props.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-lg font-bold text-ink">Props</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-paper-2 text-xs text-ink-faint">
                  <th className="px-4 py-2.5 font-medium">名稱</th>
                  <th className="px-4 py-2.5 font-medium">型別</th>
                  <th className="px-4 py-2.5 font-medium">預設值</th>
                  <th className="px-4 py-2.5 font-medium">說明</th>
                </tr>
              </thead>
              <tbody>
                {entry.props.map((p) => (
                  <tr key={p.name} className="border-b border-line last:border-0">
                    <td className="px-4 py-2.5 font-mono text-xs text-accent">
                      {p.name}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-ink-mute">
                      {p.type}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-ink-faint">
                      {p.defaultValue ?? "—"}
                    </td>
                    <td className="px-4 py-2.5 text-ink-mute">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
