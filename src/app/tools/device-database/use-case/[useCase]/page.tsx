import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import DeviceFilter from "@/components/tools/DeviceFilter";
import { buildMetadata } from "@/lib/seo";
import { getDevicesByUseCase, getAllUseCases, USECASE_LABELS } from "@/data/devices";
import type { UseCase } from "@/data/devices";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllUseCases().map((uc) => ({ useCase: uc }));
}

export async function generateMetadata({ params }: { params: Promise<{ useCase: string }> }): Promise<Metadata> {
  const { useCase } = await params;
  const label = USECASE_LABELS[useCase as UseCase];
  if (!label) return {};
  return buildMetadata({
    title: `${label}向けデバイス一覧｜デバイスデータベース`,
    description: `${label}用途に対応する産業用ロボット・AIデバイスの一覧。スペック・価格帯で比較。`,
    path: `/tools/device-database/use-case/${useCase}`,
  });
}

export default async function UseCasePage({ params }: { params: Promise<{ useCase: string }> }) {
  const { useCase } = await params;
  const uc = useCase as UseCase;
  const label = USECASE_LABELS[uc];
  if (!label) notFound();

  const devices = getDevicesByUseCase(uc);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { name: "ツール", href: "/tools" },
          { name: "デバイスDB", href: "/tools/device-database" },
          { name: `${label}向け`, href: `/tools/device-database/use-case/${useCase}` },
        ]}
      />
      <h1 className="text-2xl md:text-3xl font-bold mt-4 mb-2">{label}向けデバイス一覧</h1>
      <p className="text-gray-500 mb-6">{devices.length}件のデバイスが{label}用途に対応しています。</p>
      <DeviceFilter devices={devices} initialUseCase={uc} />
    </div>
  );
}
