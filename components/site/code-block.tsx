import { codeToHtml } from "shiki";
import { CopyButton } from "./copy-button";

type Props = {
  code: string;
  lang?: string;
  /** 顯示在區塊右上角的檔名 */
  filename?: string;
};

export async function CodeBlock({ code, lang = "tsx", filename }: Props) {
  const html = await codeToHtml(code.trimEnd(), {
    lang,
    theme: "vitesse-dark",
    colorReplacements: { "#121212": "transparent" },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper-2">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2">
        <span className="truncate font-mono text-xs text-ink-faint">
          {filename ?? lang}
        </span>
        <CopyButton text={code.trimEnd()} />
      </div>
      <div
        className="max-h-[560px] overflow-auto p-4 text-[13px] leading-relaxed [&_pre]:bg-transparent! [&_pre]:outline-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
