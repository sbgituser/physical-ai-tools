import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import DeviceCard from "@/components/tools/DeviceCard";
import { buildMetadata } from "@/lib/seo";
import { getDevicesByTag, getAllTags } from "@/data/devices";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return buildMetadata({
    title: `「${decoded}」のデバイス一覧｜デバイスデータベース`,
    description: `「${decoded}」タグが付いた産業用ロボット・AIデバイスの一覧。`,
    path: `/tools/device-database/tag/${tag}`,
  });
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const devices = getDevicesByTag(decoded);
  if (devices.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "デバイスDB", href: "/tools/device-database" },
          { name: `#${decoded}`, href: `/tools/device-database/tag/${tag}` },
        ]}
      />
      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">「{decoded}」のデバイス一覧</h1>
      <p className="text-gray-500 mb-6">{devices.length}件のデバイスが見つかりました。</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((d) => (
          <DeviceCard key={d.id} device={d} />
        ))}
      </div>
    </div>
  );
}
