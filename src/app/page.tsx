import Link from "next/link";
import ToolCard from "@/components/ToolCard";
import BlogCard from "@/components/BlogCard";
import { siteConfig } from "@/data/site-config";
import toolsData from "@/data/tools.json";
import articlesData from "@/data/articles.json";
import { allDevices, CATEGORY_LABELS } from "@/data/devices";
import { caseStudies } from "@/data/case-studies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--color-primary)] text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{siteConfig.name}</h1>
          <p className="text-lg md:text-xl opacity-90">{siteConfig.description}</p>
          <p className="text-sm mt-4 opacity-75">
            産業用ロボット×AI・工場自動化・エッジAI・IoTデバイスの導入を検討中の方へ。コスト計算ツールと最新事例で意思決定をサポートします。
          </p>
        </div>
      </section>

      {/* New Featured Tools */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">データベース＆シミュレーター</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/tools/device-database"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
          >
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors">
              デバイスデータベース
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {allDevices.length}件のロボット・AIデバイスを検索・比較
            </p>
          </Link>
          <Link
            href="/tools/case-studies"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors">
              導入事例データベース
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {caseStudies.length}件の導入事例を業種・技術で検索
            </p>
          </Link>
          <Link
            href="/tools/introduction-cost"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
          >
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors">
              導入コストシミュレーター
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              初期費用・ランニングコスト・ROIを自動計算
            </p>
          </Link>
          <Link
            href="/tools/sensor-guide"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
          >
            <div className="text-3xl mb-3">📡</div>
            <h3 className="font-bold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors">
              センサー選定ガイド
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              用途・環境・精度から最適なセンサーを推薦
            </p>
          </Link>
        </div>
      </section>

      {/* Calculator Tools */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">計算ツール</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolsData.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl font-bold mb-6">最新記事</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articlesData.slice(0, 6).map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
        {articlesData.length > 6 && (
          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="inline-block px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              記事をもっと見る
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
