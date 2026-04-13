import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import DeviceSpecs from "@/components/tools/DeviceSpecs";
import DeviceCard from "@/components/tools/DeviceCard";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { allDevices, getDeviceById, CATEGORY_LABELS, USECASE_LABELS, PRICE_LABELS, COMPANY_SIZE_LABELS } from "@/data/devices";
import { siteConfig } from "@/data/site-config";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return allDevices.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const device = getDeviceById(id);
  if (!device) return {};
  return buildMetadata({
    title: `${device.name}｜${CATEGORY_LABELS[device.category]}`,
    description: device.description.slice(0, 155),
    path: `/tools/device-database/${id}`,
  });
}

export default async function DeviceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const device = getDeviceById(id);
  if (!device) notFound();

  const relatedDevices = device.relatedDevices
    .map((rid) => getDeviceById(rid))
    .filter((d): d is NonNullable<typeof d> => d != null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "デバイスDB", href: "/tools/device-database" },
          { name: CATEGORY_LABELS[device.category], href: `/tools/device-database/category/${device.category}` },
          { name: device.name, href: `/tools/device-database/${device.id}` },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: device.name,
          description: device.description,
          brand: { "@type": "Brand", name: device.manufacturer },
          category: CATEGORY_LABELS[device.category],
          url: `${siteConfig.url}/tools/device-database/${device.id}`,
        }}
      />

      <div className="mt-4 mb-2 flex items-center gap-2 flex-wrap">
        <Link
          href={`/tools/device-database/category/${device.category}`}
          className="text-xs bg-[var(--color-bg)] text-[var(--color-primary)] font-medium px-2 py-1 rounded hover:opacity-80"
        >
          {CATEGORY_LABELS[device.category]}
        </Link>
        <Link
          href={`/tools/device-database/manufacturer/${encodeURIComponent(device.manufacturer)}`}
          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:opacity-80"
        >
          {device.manufacturer}
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-2">{device.name}</h1>

      {device.estimatedPrice && (
        <p className="text-lg font-bold text-orange-600 mb-4">
          参考価格: {device.estimatedPrice}
          <span className="text-xs font-normal text-gray-400 ml-2">（{PRICE_LABELS[device.priceRange]}）</span>
        </p>
      )}

      <p className="text-gray-600 mb-6 leading-relaxed">{device.description}</p>

      <DeviceSpecs device={device} />

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3">特徴</h2>
        <div className="flex flex-wrap gap-2">
          {device.features.map((f) => (
            <span key={f} className="text-sm bg-[var(--color-bg)] text-[var(--color-primary)] px-3 py-1 rounded-full">
              {f}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3">対応用途</h2>
        <div className="flex flex-wrap gap-2">
          {device.useCase.map((uc) => (
            <Link
              key={uc}
              href={`/tools/device-database/use-case/${uc}`}
              className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full hover:bg-green-100 transition-colors"
            >
              {USECASE_LABELS[uc]}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3">対象業界</h2>
        <div className="flex flex-wrap gap-2">
          {device.targetIndustry.map((ind) => (
            <span key={ind} className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {ind}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3">対象企業規模</h2>
        <div className="flex flex-wrap gap-2">
          {device.companySize.map((cs) => (
            <span key={cs} className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
              {COMPANY_SIZE_LABELS[cs]}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-bold mb-3">タグ</h2>
        <div className="flex flex-wrap gap-2">
          {device.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tools/device-database/tag/${encodeURIComponent(tag)}`}
              className="text-sm bg-gray-50 text-gray-600 px-3 py-1 rounded-full border border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <a
          href={device.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[var(--color-primary)] text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          メーカー公式サイトで詳細を見る →
        </a>
      </section>

      {relatedDevices.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">関連デバイス</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedDevices.map((rd) => (
              <DeviceCard key={rd.id} device={rd} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
