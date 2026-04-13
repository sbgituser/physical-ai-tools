import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CaseStudyCard from "@/components/tools/CaseStudyCard";
import { buildMetadata } from "@/lib/seo";
import { getCaseStudiesByTechnology, getAllTechnologies } from "@/data/case-studies";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllTechnologies().map((t) => ({ tech: t }));
}

export async function generateMetadata({ params }: { params: Promise<{ tech: string }> }): Promise<Metadata> {
  const { tech } = await params;
  const decoded = decodeURIComponent(tech);
  return buildMetadata({
    title: `「${decoded}」の導入事例`,
    description: `${decoded}技術を活用したAI・ロボット導入事例の一覧。`,
    path: `/tools/case-studies/technology/${tech}`,
  });
}

export default async function TechnologyPage({ params }: { params: Promise<{ tech: string }> }) {
  const { tech } = await params;
  const decoded = decodeURIComponent(tech);
  const cases = getCaseStudiesByTechnology(decoded);
  if (cases.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "導入事例", href: "/tools/case-studies" },
          { name: decoded, href: `/tools/case-studies/technology/${tech}` },
        ]}
      />
      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">「{decoded}」の導入事例</h1>
      <p className="text-gray-500 mb-6">{cases.length}件の導入事例が見つかりました。</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cases.map((cs) => (
          <CaseStudyCard key={cs.id} cs={cs} />
        ))}
      </div>
    </div>
  );
}
