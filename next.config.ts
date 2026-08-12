import type { NextConfig } from "next";

// Chrome Origin Trial：HTML-in-Canvas（drawElementImage）
// 讓 WebGL 畫布分類的 8 個 CanvasUI 元件在訪客的 Chrome 上直接生效，
// 綁定 https://himari-ui.vercel.app，效期至 2026-10-20（Chrome 148–154 試用期）。
// 到期後效果自動回到降級模式，demo 的偵測提示會接手說明。
const HTML_IN_CANVAS_ORIGIN_TRIAL_TOKEN =
  "AmY6o5clMKE+R/HMkAciZNbmXG48ltkxFoNmtQ5j+df3VkhDIQtiP1SyZOrLmdvGzZj1PQsQXoRvQMmuLMLobwcAAABaeyJvcmlnaW4iOiJodHRwczovL2hpbWFyaS11aS52ZXJjZWwuYXBwOjQ0MyIsImZlYXR1cmUiOiJIVE1MSW5DYW52YXMiLCJleHBpcnkiOjE3OTI0NTQ0MDB9";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Origin-Trial", value: HTML_IN_CANVAS_ORIGIN_TRIAL_TOKEN },
        ],
      },
    ];
  },
};

export default nextConfig;
