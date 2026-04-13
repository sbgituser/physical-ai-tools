import Breadcrumb from "@/components/Breadcrumb";
import SensorGuideWizard from "@/components/tools/SensorGuideWizard";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";

export const metadata = buildMetadata({
  title: "センサー選定ガイド",
  description:
    "用途（距離測定、物体検出、温度、画像など）と環境条件を選ぶだけで最適なセンサータイプを推薦。各タイプのメリット・デメリットと製品リンク付き。",
  path: "/tools/sensor-guide",
});

export default function SensorGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "センサー選定ガイド", href: "/tools/sensor-guide" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "センサー選定ガイド",
          description: "用途と環境条件から最適なセンサータイプを推薦するガイドツール",
          url: `${siteConfig.url}/tools/sensor-guide`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
        }}
      />

      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">センサー選定ガイド</h1>
      <p className="text-gray-500 mb-6">
        測定対象・使用環境・精度要求を選ぶだけで、最適なセンサータイプを推薦します。
        各タイプのメリット・デメリットの比較と、デバイスデータベースの該当製品へのリンクも表示します。
      </p>

      <SensorGuideWizard />
    </div>
  );
}
