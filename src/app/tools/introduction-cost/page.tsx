import Breadcrumb from "@/components/Breadcrumb";
import IntroductionCostCalculator from "@/components/tools/IntroductionCostCalculator";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";

export const metadata = buildMetadata({
  title: "ロボット・AI導入コストシミュレーター",
  description:
    "産業用ロボット・協働ロボット・AGV/AMR・エッジAIの導入総コスト（本体＋周辺機器＋SIer費用＋保守）とROI・投資回収期間を自動計算。",
  path: "/tools/introduction-cost",
});

export default function IntroductionCostPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "導入コストシミュレーター", href: "/tools/introduction-cost" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ロボット・AI導入コストシミュレーター",
          description: "産業用ロボット・AIの導入総コストとROI・投資回収期間を自動計算",
          url: `${siteConfig.url}/tools/introduction-cost`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
        }}
      />

      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">ロボット・AI導入コストシミュレーター</h1>
      <p className="text-gray-500 mb-6">
        デバイスカテゴリ・台数・現在の人件費を入力すると、初期費用の内訳（本体/周辺機器/SIer費用/安全対策/教育費）、
        年間ランニングコスト、年間削減効果、ROI（投資利益率）、投資回収期間を自動計算します。
      </p>

      <IntroductionCostCalculator />

      <section className="mt-10 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold mb-3">活用できる補助金</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-gray-700">ものづくり補助金</h3>
            <p className="text-sm text-gray-600">
              中小企業・小規模事業者の設備投資を支援。ロボット・AI導入も対象。補助率1/2〜2/3、上限1,250万円〜4,000万円。
            </p>
            <a href="https://portal.monodukuri-hojo.jp/" target="_blank" rel="noopener noreferrer"
              className="text-sm text-[var(--color-primary)] hover:underline">
              公式サイトで詳細を確認 →
            </a>
          </div>
          <div>
            <h3 className="font-bold text-gray-700">事業再構築補助金</h3>
            <p className="text-sm text-gray-600">
              事業再構築に取り組む中小企業を支援。自動化による業態転換・新分野展開が対象。
            </p>
            <a href="https://jigyou-saikouchiku.go.jp/" target="_blank" rel="noopener noreferrer"
              className="text-sm text-[var(--color-primary)] hover:underline">
              公式サイトで詳細を確認 →
            </a>
          </div>
          <p className="text-xs text-gray-400">
            ※補助金の内容・条件は変更される場合があります。最新情報は各公式サイトでご確認ください。個別の申請アドバイスは行っておりません。
          </p>
        </div>
      </section>
    </div>
  );
}
