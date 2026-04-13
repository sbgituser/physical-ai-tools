import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import DeviceCard from "@/components/tools/DeviceCard";
import { buildMetadata } from "@/lib/seo";
import { allDevices, getDevicesByManufacturer, getAllManufacturers } from "@/data/devices";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllManufacturers().map((m) => ({ manufacturer: m }));
}

export async function generateMetadata({ params }: { params: Promise<{ manufacturer: string }> }): Promise<Metadata> {
  const { manufacturer } = await params;
  const decoded = decodeURIComponent(manufacturer);
  return buildMetadata({
    title: `${decoded}の製品一覧｜デバイスデータベース`,
    description: `${decoded}が製造する産業用ロボット・AIデバイスの一覧。スペック・価格帯で比較できます。`,
    path: `/tools/device-database/manufacturer/${manufacturer}`,
  });
}

export default async function ManufacturerPage({ params }: { params: Promise<{ manufacturer: string }> }) {
  const { manufacturer } = await params;
  const decoded = decodeURIComponent(manufacturer);
  const devices = getDevicesByManufacturer(decoded);
  if (devices.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "デバイスDB", href: "/tools/device-database" },
          { name: decoded, href: `/tools/device-database/manufacturer/${manufacturer}` },
        ]}
      />
      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">{decoded}の製品一覧</h1>
      <p className="text-gray-500 mb-6">{devices.length}件の製品を収録しています。</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((d) => (
          <DeviceCard key={d.id} device={d} />
        ))}
      </div>
    </div>
  );
}
