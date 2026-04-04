import Breadcrumb from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";

export const metadata = buildMetadata({
  title: "プライバシーポリシー",
  description: `${siteConfig.name}のプライバシーポリシー。個人情報の取り扱いについて説明します。`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ name: "プライバシーポリシー", href: "/privacy" }]} />
      <h1 className="text-2xl md:text-3xl font-bold mb-8 mt-4">プライバシーポリシー</h1>
      <div className="prose prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">個人情報の取得について</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイト（{siteConfig.name}）では、お問い合わせの際に氏名やメールアドレス等の個人情報をご入力いただく場合がございます。取得した個人情報は、お問い合わせへの回答や必要な情報提供のために利用し、それ以外の目的では利用いたしません。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">アクセス解析ツールについて</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトでは、Googleによるアクセス解析ツール「Google アナリティクス」を使用しています。Google アナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            この機能はCookieを無効にすることで収集を拒否することが可能です。お使いのブラウザの設定をご確認ください。Google アナリティクスの利用規約に関しては、Google アナリティクスのサイトをご参照ください。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">Amazonアソシエイトについて</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">免責事項</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。情報の正確性には万全を期していますが、法令の改正等により情報が古くなっている場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mt-8 mb-3">プライバシーポリシーの変更</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直し改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
        </section>
      </div>
    </div>
  );
}
