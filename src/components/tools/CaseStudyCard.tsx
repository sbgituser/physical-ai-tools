import Link from "next/link";
import type { CaseStudy } from "@/data/case-studies";
import { INDUSTRY_LABELS } from "@/data/case-studies";

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/tools/case-studies/${cs.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-[var(--color-primary)] font-medium">
          {INDUSTRY_LABELS[cs.industry]}
        </span>
        <span className="text-xs text-gray-400">{cs.company}</span>
      </div>
      <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
        {cs.title}
      </h3>
      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cs.challenge.slice(0, 100)}...</p>
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {cs.results.productivityGain && (
          <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">{cs.results.productivityGain}</span>
        )}
        {cs.results.costReduction && (
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{cs.results.costReduction}</span>
        )}
        {cs.results.roiPeriod && (
          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">{cs.results.roiPeriod}</span>
        )}
      </div>
    </Link>
  );
}
