import type { ComponentEntry } from "./types";

export const inputs: ComponentEntry[] = [
  {
    slug: "floating-label-input",
    name: "浮動標籤輸入框",
    nameEn: "Floating Label Input",
    category: "inputs",
    description:
      "標籤平常待在輸入框內，focus 或有值時縮小浮到上緣；傳入 error 會切換成錯誤狀態並顯示錯誤訊息。",
    dependencies: [],
    props: [
      { name: "label", type: "string", description: "浮動標籤文字" },
      { name: "error", type: "string", description: "錯誤訊息（有值時顯示錯誤狀態）" },
    ],
  },
  {
    slug: "glow-input",
    name: "發光聚焦輸入框",
    nameEn: "Glow Input",
    category: "inputs",
    description: "focus 時邊框亮起並向外擴散柔和光暈的輸入框，光暈顏色可調，適合暗色介面的搜尋或訂閱欄位。",
    dependencies: [],
    props: [
      {
        name: "glowColor",
        type: "string",
        defaultValue: '"#6366f1"',
        description: "光暈顏色",
      },
    ],
  },
  {
    slug: "otp-input",
    name: "OTP 驗證碼輸入",
    nameEn: "OTP Input",
    category: "inputs",
    description:
      "n 格單字元的驗證碼輸入框：輸入後自動跳下一格、Backspace 回上一格、支援整串貼上，全部填滿時觸發 onComplete。",
    dependencies: [],
    props: [
      { name: "length", type: "number", defaultValue: "6", description: "驗證碼位數" },
      {
        name: "onComplete",
        type: "(code: string) => void",
        description: "全部填滿時的回呼，參數為完整驗證碼",
      },
      {
        name: "onChange",
        type: "(code: string) => void",
        description: "任一格變動時的回呼，參數為目前輸入的字串",
      },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "停用整組輸入" },
    ],
  },
  {
    slug: "animated-switch",
    name: "動畫開關",
    nameEn: "Animated Switch",
    category: "inputs",
    description:
      '無障礙的 role="switch" 開關，滑塊帶彈性過渡動畫，受控（checked）與非受控（defaultChecked）皆可使用。',
    dependencies: [],
    props: [
      { name: "checked", type: "boolean", description: "受控模式的開關狀態" },
      {
        name: "defaultChecked",
        type: "boolean",
        defaultValue: "false",
        description: "非受控模式的初始狀態",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        description: "狀態切換時的回呼",
      },
      {
        name: "onColor",
        type: "string",
        defaultValue: '"#10b981"',
        description: "開啟時的底色",
      },
      { name: "disabled", type: "boolean", defaultValue: "false", description: "停用開關" },
    ],
  },
  {
    slug: "animated-slider",
    name: "動畫滑桿",
    nameEn: "Animated Slider",
    category: "inputs",
    description:
      "軌道有已填色段的 range slider，拖曳或鍵盤操作時上方浮出目前數值的氣泡，保留原生滑桿的完整無障礙行為。",
    dependencies: [],
    props: [
      { name: "min", type: "number", defaultValue: "0", description: "最小值" },
      { name: "max", type: "number", defaultValue: "100", description: "最大值" },
      { name: "step", type: "number", defaultValue: "1", description: "步進值" },
      { name: "value", type: "number", description: "受控模式的目前值" },
      { name: "defaultValue", type: "number", defaultValue: "50", description: "非受控模式的初始值" },
      {
        name: "onValueChange",
        type: "(value: number) => void",
        description: "值變動時的回呼",
      },
      {
        name: "fillColor",
        type: "string",
        defaultValue: '"#6366f1"',
        description: "已填色段與滑塊的顏色",
      },
      {
        name: "trackColor",
        type: "string",
        defaultValue: '"#d4d4d8"',
        description: "未填色軌道的顏色",
      },
      {
        name: "formatValue",
        type: "(value: number) => string",
        description: "氣泡文字的格式化函式",
      },
    ],
  },
];
