import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";

export const metadata = buildMetadata({
  title: "免責事項",
  description: `${siteConfig.name}の免責事項。当サイトのツールや情報の利用に関する注意事項を説明します。`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ name: "免責事項", href: "/disclaimer" }]} />
      <h1 className="text-2xl md:text-3xl font-bold mb-8 mt-4">免責事項</h1>
      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">当サイトの情報について</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイト（{siteConfig.name}）に掲載されている情報は、可能な限り正確な情報を提供するよう努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていたり、間違っている場合がございますので、あらかじめご了承ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">計算ツールの結果について</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトで提供する各種計算ツール（電気代シミュレーター、ROI計算機、コスト比較ツール等）の計算結果は参考値です。実際の費用やROIは、使用環境・電力契約・デバイスの仕様等により大きく異なる場合があります。重要な投資判断の際は、専門家にご相談ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">損害等の責任について</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねます。また、当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報やサービスについて一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">掲載商品について</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトでは、Amazonアソシエイト・プログラムを利用して商品を紹介しています。商品の価格・在庫状況は変動するため、購入時にAmazon.co.jpにてご確認ください。商品の購入に関するトラブルについて、当サイトは一切の責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">著作権について</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトのコンテンツ（文章・画像・デザイン等）の著作権は当サイト運営者に帰属します。無断転載・複製を禁じます。引用の際は、出典元として当サイトのURLを明記してください。
          </p>
        </section>
      </div>
    </div>
  );
}
