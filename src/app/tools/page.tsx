import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site-config";
import toolsData from "@/data/tools.json";
import { allDevices } from "@/data/devices";
import { caseStudies } from "@/data/case-studies";

export const metadata = buildMetadata({
  title: "ツール一覧",
  description: `${siteConfig.name}の便利なツール一覧。デバイスデータベース、導入事例、コスト計算ツールなどを無料で提供しています。`,
  path: "/tools",
  ogImage: "/ogp/default-ogp.png",
});

export default function ToolsListPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ name: "ツール", href: "/tools" }]} />
      <h1 className="text-2xl md:text-3xl font-bold mb-8 mt-4">ツール一覧</h1>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">データベース＆ガイド</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/tools/device-database"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
          >
            <div className="text-2xl mb-2">🤖</div>
            <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)]">デバイスデータベース</h3>
            <p className="text-sm text-gray-500 mt-1">{allDevices.length}件のロボット・AIデバイスを検索</p>
          </Link>
          <Link
            href="/tools/case-studies"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
          >
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)]">導入事例データベース</h3>
            <p className="text-sm text-gray-500 mt-1">{caseStudies.length}件の導入事例を検索</p>
          </Link>
          <Link
            href="/tools/introduction-cost"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
          >
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)]">導入コストシミュレーター</h3>
            <p className="text-sm text-gray-500 mt-1">初期費用・ROI・回収期間を計算</p>
          </Link>
          <Link
            href="/tools/sensor-guide"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
          >
            <div className="text-2xl mb-2">📡</div>
            <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)]">センサー選定ガイド</h3>
            <p className="text-sm text-gray-500 mt-1">用途・精度から最適なセンサーを推薦</p>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">計算ツール</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolsData.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
