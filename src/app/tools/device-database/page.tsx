import Breadcrumb from "@/components/Breadcrumb";
import DeviceFilter from "@/components/tools/DeviceFilter";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { allDevices, CATEGORY_LABELS } from "@/data/devices";
import { siteConfig } from "@/data/site-config";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "産業用ロボット・AIデバイス データベース",
  description:
    "産業用ロボット、協働ロボット、AGV/AMR、エッジAIデバイス、センサー、ビジョンシステム、ドローンを網羅したデータベース。用途×価格帯×メーカーで検索・比較できます。",
  path: "/tools/device-database",
});

export default function DeviceDatabasePage() {
  const categories = Object.entries(CATEGORY_LABELS);
  const manufacturers = [...new Set(allDevices.map((d) => d.manufacturer))].sort();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "デバイスデータベース", href: "/tools/device-database" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "産業用ロボット・AIデバイス データベース",
          description: "産業用ロボット、協働ロボット、エッジAI、センサーなどを網羅したデータベース",
          url: `${siteConfig.url}/tools/device-database`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
        }}
      />

      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">
        産業用ロボット・AIデバイス データベース
      </h1>
      <p className="text-gray-500 mb-6">
        産業用ロボット・協働ロボット・AGV/AMR・エッジAIデバイス・センサー・ビジョンシステム・ドローンを網羅。
        用途×価格帯×メーカーで検索・比較できます。全{allDevices.length}デバイス収録。
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
        {categories.map(([key, label]) => (
          <Link
            key={key}
            href={`/tools/device-database/category/${key}`}
            className="bg-white rounded-lg border border-gray-100 p-3 text-center hover:border-[var(--color-primary)] hover:shadow-sm transition-all"
          >
            <span className="text-xs text-gray-600">{label}</span>
          </Link>
        ))}
      </div>

      <DeviceFilter devices={allDevices} />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">メーカー別で探す</h2>
        <div className="flex flex-wrap gap-2">
          {manufacturers.map((m) => (
            <Link
              key={m}
              href={`/tools/device-database/manufacturer/${encodeURIComponent(m)}`}
              className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {m}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
