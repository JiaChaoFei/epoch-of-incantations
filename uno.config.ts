import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [presetUno(), presetAttributify(), presetIcons()],
  theme: {
    colors: {
      // 自定义颜色
      purple: {
        400: "#a78bfa",
        500: "#8b5cf6",
      },
      pink: {
        500: "#ec4899",
        600: "#db2777",
      },
      gray: {
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        800: "#1f2937",
        900: "#111827",
      },
    },
    fontFamily: {
      sans: ["Noto Sans SC", "system-ui", "sans-serif"],
    },
  },
  rules: [
    // 自定义规则
    ["text-shadow", { "text-shadow": "0 2px 4px rgba(0,0,0,0.1)" }],
    ["text-shadow-lg", { "text-shadow": "0 4px 8px rgba(0,0,0,0.12)" }],
  ],
  shortcuts: {
    // 常用组合
    "btn-primary":
      "px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95",
    card: "bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-lg",
    "heading-1":
      "text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent",
    "heading-2": "text-2xl md:text-3xl font-bold text-purple-400",
    "text-body": "text-gray-300 leading-relaxed",
  },
});
