import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DeviceCard from "@/components/tools/DeviceCard";
import CaseStudyCard from "@/components/tools/CaseStudyCard";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, getCaseStudyById, INDUSTRY_LABELS } from "@/data/case-studies";
import { getDeviceById } from "@/data/devices";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ id: cs.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const cs = getCaseStudyById(id);
  if (!cs) return {};
  return buildMetadata({
    title: cs.title,
    description: `${cs.company}の${cs.technology.join("・")}導入事例。${cs.results.productivityGain || cs.results.costReduction || ""}`,
    path: `/tools/case-studies/${id}`,
  });
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cs = getCaseStudyById(id);
  if (!cs) notFound();

  const devices = cs.devices
    .map((did) => getDeviceById(did))
    .filter((d): d is NonNullable<typeof d> => d != null);

  const relatedCases = caseStudies
    .filter((other) => other.id !== cs.id && (other.industry === cs.industry || other.technology.some((t) => cs.technology.includes(t))))
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "導入事例", href: "/tools/case-studies" },
          { name: INDUSTRY_LABELS[cs.industry], href: `/tools/case-studies/industry/${cs.industry}` },
          { name: cs.company, href: `/tools/case-studies/${cs.id}` },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: cs.title,
          description: cs.challenge.slice(0, 155),
          datePublished: cs.publishDate,
          url: `${siteConfig.url}/tools/case-studies/${cs.id}`,
          author: { "@type": "Organization", name: siteConfig.name },
        }}
      />

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <Link
          href={`/tools/case-studies/industry/${cs.industry}`}
          className="text-xs bg-[var(--color-bg)] text-[var(--color-primary)] font-medium px-2 py-1 rounded hover:opacity-80"
        >
          {INDUSTRY_LABELS[cs.industry]}
        </Link>
        <span className="text-xs text-gray-400">{cs.company}</span>
        <span className="text-xs text-gray-400">{cs.publishDate}</span>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-6">{cs.title}</h1>

      {/* 成果サマリー */}
      <div className="bg-green-50 rounded-xl p-5 mb-8">
        <h2 className="font-bold text-green-800 mb-3">導入成果</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cs.results.productivityGain && (
            <div className="bg-white rounded-lg p-3">
              <span className="text-xs text-gray-500">生産性向上</span>
              <p className="font-bold text-green-700">{cs.results.productivityGain}</p>
            </div>
          )}
          {cs.results.costReduction && (
            <div className="bg-white rounded-lg p-3">
              <span className="text-xs text-gray-500">コスト削減</span>
              <p className="font-bold text-blue-700">{cs.results.costReduction}</p>
            </div>
          )}
          {cs.results.qualityImprovement && (
            <div className="bg-white rounded-lg p-3">
              <span className="text-xs text-gray-500">品質改善</span>
              <p className="font-bold text-purple-700">{cs.results.qualityImprovement}</p>
            </div>
          )}
          {cs.results.roiPeriod && (
            <div className="bg-white rounded-lg p-3">
              <span className="text-xs text-gray-500">投資回収期間</span>
              <p className="font-bold text-orange-700">{cs.results.roiPeriod}</p>
            </div>
          )}
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">課題</h2>
        <p className="text-gray-600 leading-relaxed">{cs.challenge}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">ソリューション</h2>
        <p className="text-gray-600 leading-relaxed">{cs.solution}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">使用技術</h2>
        <div className="flex flex-wrap gap-2">
          {cs.technology.map((t) => (
            <Link
              key={t}
              href={`/tools/case-studies/technology/${encodeURIComponent(t)}`}
              className="text-sm bg-[var(--color-bg)] text-[var(--color-primary)] px-3 py-1 rounded-full hover:opacity-80"
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {devices.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3">使用デバイス</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {devices.map((d) => (
              <DeviceCard key={d.id} device={d} />
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3">タグ</h2>
        <div className="flex flex-wrap gap-2">
          {cs.tags.map((tag) => (
            <span key={tag} className="text-sm bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-200">
              #{tag}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-8 bg-gray-50 rounded-xl p-5">
        <h2 className="font-bold text-gray-700 mb-2">出典</h2>
        <p className="text-sm text-gray-500">{cs.sourceName}</p>
        <a
          href={cs.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--color-primary)] hover:underline"
        >
          {cs.sourceUrl}
        </a>
        <p className="text-xs text-gray-400 mt-2">
          ※本事例は公開情報に基づいて構成しています。具体的な数値は参考値であり、実際の導入効果を保証するものではありません。
        </p>
      </section>

      {relatedCases.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">関連事例</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedCases.map((rc) => (
              <CaseStudyCard key={rc.id} cs={rc} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
