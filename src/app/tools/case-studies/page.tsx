import Breadcrumb from "@/components/Breadcrumb";
import CaseStudyCard from "@/components/tools/CaseStudyCard";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, INDUSTRY_LABELS, getAllTechnologies } from "@/data/case-studies";
import { siteConfig } from "@/data/site-config";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "フィジカルAI 導入事例データベース",
  description:
    "産業用ロボット・協働ロボット・AGV/AMR・エッジAIの導入事例を業種×技術で検索。トヨタ、日産などの大企業から中小企業まで、公開情報に基づく導入事例を収録。",
  path: "/tools/case-studies",
});

export default function CaseStudiesPage() {
  const industries = Object.entries(INDUSTRY_LABELS);
  const technologies = getAllTechnologies();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "導入事例", href: "/tools/case-studies" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "フィジカルAI 導入事例データベース",
          url: `${siteConfig.url}/tools/case-studies`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
        }}
      />

      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">フィジカルAI 導入事例データベース</h1>
      <p className="text-gray-500 mb-6">
        産業用ロボット・協働ロボット・AGV/AMR・エッジAIの導入事例を{caseStudies.length}件収録。
        すべて公開情報に基づく事例です。
      </p>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">業種別で探す</h2>
        <div className="flex flex-wrap gap-2">
          {industries.map(([key, label]) => (
            <Link
              key={key}
              href={`/tools/case-studies/industry/${key}`}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">技術別で探す</h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Link
              key={tech}
              href={`/tools/case-studies/technology/${encodeURIComponent(tech)}`}
              className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              {tech}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-4">すべての事例</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
      </section>
    </div>
  );
}
