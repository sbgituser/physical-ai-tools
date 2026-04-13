import Link from "next/link";
import type { PhysicalAIDevice } from "@/data/devices/types";
import { CATEGORY_LABELS, PRICE_LABELS } from "@/data/devices/types";

const CATEGORY_EMOJI: Record<string, string> = {
  cobot: "🤖",
  "industrial-robot": "🏭",
  "agv-amr": "🚗",
  "edge-ai": "🧠",
  sensor: "📡",
  vision: "👁",
  drone: "🛸",
};

export default function DeviceCard({ device }: { device: PhysicalAIDevice }) {
  return (
    <Link
      href={`/tools/device-database/${device.id}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-bg)] flex items-center justify-center text-xl flex-shrink-0">
          {CATEGORY_EMOJI[device.category] || "🔧"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[var(--color-primary)] font-medium">
              {CATEGORY_LABELS[device.category]}
            </span>
            <span className="text-xs text-gray-400">{device.manufacturer}</span>
          </div>
          <h3 className="font-bold text-gray-800 mt-0.5 group-hover:text-[var(--color-primary)] transition-colors truncate">
            {device.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{device.description.slice(0, 100)}...</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {device.estimatedPrice && (
              <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded">
                {device.estimatedPrice}
              </span>
            )}
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {PRICE_LABELS[device.priceRange]}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
