import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CaseStudyCard from "@/components/tools/CaseStudyCard";
import { buildMetadata } from "@/lib/seo";
import { getCaseStudiesByIndustry, getAllIndustries, INDUSTRY_LABELS } from "@/data/case-studies";
import type { Industry } from "@/data/case-studies";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllIndustries().map((i) => ({ industry: i }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry } = await params;
  const label = INDUSTRY_LABELS[industry as Industry];
  if (!label) return {};
  return buildMetadata({
    title: `${label}のAI・ロボット導入事例`,
    description: `${label}業界における産業用ロボット・AI導入事例の一覧。課題・ソリューション・効果を紹介。`,
    path: `/tools/case-studies/industry/${industry}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const label = INDUSTRY_LABELS[industry as Industry];
  if (!label) notFound();

  const cases = getCaseStudiesByIndustry(industry as Industry);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "導入事例", href: "/tools/case-studies" },
          { name: label, href: `/tools/case-studies/industry/${industry}` },
        ]}
      />
      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">{label}のAI・ロボット導入事例</h1>
      <p className="text-gray-500 mb-6">{cases.length}件の導入事例を収録しています。</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((cs) => (
          <CaseStudyCard key={cs.id} cs={cs} />
        ))}
      </div>
    </div>
  );
}
