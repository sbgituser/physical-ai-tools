export const siteConfig = {
  name: "フィジカルAI・産業用ロボット導入ガイド",
  description: "フィジカルAI・産業用ロボット・エッジAIの導入コスト計算、ROI分析、工場自動化シミュレーションツール集。製造業・物流のAI活用事例も紹介",
  domain: "physical-ai-tools.kuras-plus.com",
  url: "https://physical-ai-tools.kuras-plus.com",
  theme: "blue" as const,
  amazonTag: "kurasplus-22",
  ga4Id: "G-V0FWX12Z87",
  ogImage: "/images/og-default.png",
  twitterHandle: "",
  nav: [
    { label: "ツール", href: "/tools" },
    { label: "デバイスDB", href: "/tools/device-database" },
    { label: "導入事例", href: "/tools/case-studies" },
    { label: "ブログ", href: "/blog" },
  ],
};

export const themeColors = {
  blue:   { primary: "#2563EB", accent: "#3B82F6", bg: "#EFF6FF" },
  green:  { primary: "#059669", accent: "#10B981", bg: "#ECFDF5" },
  purple: { primary: "#7C3AED", accent: "#8B5CF6", bg: "#F5F3FF" },
  orange: { primary: "#EA580C", accent: "#F97316", bg: "#FFF7ED" },
};
