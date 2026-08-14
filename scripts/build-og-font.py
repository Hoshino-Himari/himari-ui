"""把 Noto Sans TC 子集化成 OG 分享圖專用的小字型。

next/og（satori）不會自動帶中文字型，不給字型檔中文會全變成豆腐方塊；
但完整的 Noto Sans TC 是 12MB 可變字重，不適合塞進 repo。
這支腳本只留下 assets/og-font-charset.txt 裡實際會用到的字元。

什麼時候要重跑：新增元件後 `npm run registry` 若報「OG 字型缺字」就重跑這支。

用法：
    pip install fonttools brotli
    python scripts/build-og-font.py [完整字型路徑]

沒給路徑時會自動抓 google/fonts 上的 NotoSansTC[wght].ttf。
"""

import sys
import urllib.request
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
CHARSET = ROOT / "assets" / "og-font-charset.txt"
SOURCE_URL = (
    "https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/"
    "NotoSansTC%5Bwght%5D.ttf"
)
WEIGHTS = {400: "assets/og-noto-tc-400.ttf", 700: "assets/og-noto-tc-700.ttf"}


def load_source(path: Path) -> Path:
    if path.exists():
        return path
    print(f"下載來源字型 → {path}")
    path.parent.mkdir(parents=True, exist_ok=True)
    urllib.request.urlretrieve(SOURCE_URL, path)
    return path


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / ".cache" / "NotoSansTC-var.ttf"
    src = load_source(src)

    text = CHARSET.read_text(encoding="utf-8")
    unicodes = {ord(ch) for ch in text}
    print(f"字元集：{len(unicodes)} 個")

    for weight, rel_out in WEIGHTS.items():
        font = TTFont(str(src))
        # 先把可變字重定格在單一字重，再子集化
        instantiateVariableFont(font, {"wght": weight}, inplace=True, updateFontNames=True)

        options = subset.Options()
        options.layout_features = ["*"]
        options.name_IDs = ["*"]
        options.notdef_outline = True
        options.recalc_bounds = True
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=unicodes)
        subsetter.subset(font)

        out = ROOT / rel_out
        out.parent.mkdir(parents=True, exist_ok=True)
        font.save(str(out))
        size_kb = out.stat().st_size / 1024
        print(f"{rel_out}：{size_kb:.0f} KB（{font['maxp'].numGlyphs} glyphs）")


if __name__ == "__main__":
    main()
