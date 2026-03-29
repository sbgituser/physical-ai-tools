export const siteConfig = {
  name: "フィジカルAI・IoTツール",
  description: "フィジカルAI・IoT・エッジAIの導入コスト計算、電気代シミュレーション、ROI分析ツール集",
  domain: "physical-ai-tools.kuras-plus.com",
  url: "https://physical-ai-tools.kuras-plus.com",
  theme: "blue" as const,
  amazonTag: "kurasplus-22",
  ga4Id: "",
  ogImage: "/images/og-default.png",
  twitterHandle: "",
  nav: [
    { label: "ツール", href: "/tools" },
    { label: "ブログ", href: "/blog" },
  ],
};

export const themeColors = {
  blue:   { primary: "#2563EB", accent: "#3B82F6", bg: "#EFF6FF" },
  green:  { primary: "#059669", accent: "#10B981", bg: "#ECFDF5" },
  purple: { primary: "#7C3AED", accent: "#8B5CF6", bg: "#F5F3FF" },
  orange: { primary: "#EA580C", accent: "#F97316", bg: "#FFF7ED" },
};
