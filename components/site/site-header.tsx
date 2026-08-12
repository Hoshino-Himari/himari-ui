import Link from "next/link";

const GITHUB_URL = "https://github.com/Hoshino-Himari/himari-ui";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Himari<span className="text-accent">&nbsp;UI</span>
          </span>
          <span className="hidden text-xs text-ink-faint sm:inline">
            繁體中文元件庫
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-1 text-sm">
          <Link
            href="/components"
            className="rounded-md px-3 py-1.5 text-ink-mute transition-colors duration-(--dur-fast) hover:bg-paper-3 hover:text-ink"
          >
            元件
          </Link>
          <Link
            href="/resources"
            className="rounded-md px-3 py-1.5 text-ink-mute transition-colors duration-(--dur-fast) hover:bg-paper-3 hover:text-ink"
          >
            開源資源
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 原始碼"
            className="ml-1 rounded-md p-2 text-ink-mute transition-colors duration-(--dur-fast) hover:bg-paper-3 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4.5 fill-current" aria-hidden>
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.66.41.36.78 1.05.78 2.12 0 1.54-.01 2.77-.01 3.15 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
