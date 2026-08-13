/**
 * 產生一張純漸層的 SVG data URI，給需要 `src` 的示範元件當佔位圖用。
 * 站上不放外部圖床連結，示範圖一律自己畫。
 */
export function gradientImage(
  from: string,
  to: string,
  label = "",
  width = 600,
  height = 800,
): string {
  const text = label
    ? `<text x="50%" y="50%" font-family="sans-serif" font-size="${Math.round(
        Math.min(width, height) / 7,
      )}" fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">${label}</text>`
    : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="${width}" height="${height}" fill="url(#g)"/>${text}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** 一組深淺不一的漸層配色，讓多張佔位圖不會長得一樣。 */
export const gradientPairs: [string, string][] = [
  ["#f59e0b", "#b45309"],
  ["#8b5cf6", "#4c1d95"],
  ["#10b981", "#065f46"],
  ["#38bdf8", "#1e3a8a"],
  ["#ec4899", "#831843"],
  ["#f97316", "#7c2d12"],
  ["#22d3ee", "#155e75"],
  ["#a3e635", "#3f6212"],
];
