import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import DeviceFilter from "@/components/tools/DeviceFilter";
import { buildMetadata } from "@/lib/seo";
import { allDevices, getDevicesByCategory, getAllCategories, CATEGORY_LABELS } from "@/data/devices";
import type { DeviceCategory } from "@/data/devices";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as DeviceCategory];
  if (!label) return {};
  return buildMetadata({
    title: `${label}一覧｜デバイスデータベース`,
    description: `${label}の製品一覧。スペック・価格帯・用途で比較できます。`,
    path: `/tools/device-database/category/${category}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = category as DeviceCategory;
  const label = CATEGORY_LABELS[cat];
  if (!label) notFound();

  const devices = getDevicesByCategory(cat);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "デバイスDB", href: "/tools/device-database" },
          { name: label, href: `/tools/device-database/category/${category}` },
        ]}
      />
      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">{label}一覧</h1>
      <p className="text-gray-500 mb-6">{devices.length}件の{label}を収録しています。</p>
      <DeviceFilter devices={devices} initialCategory={cat} />
    </div>
  );
}
