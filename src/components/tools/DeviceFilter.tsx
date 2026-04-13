"use client";

import { useState, useMemo } from "react";
import type { PhysicalAIDevice, DeviceCategory, UseCase, PriceRange } from "@/data/devices/types";
import { CATEGORY_LABELS, USECASE_LABELS, PRICE_LABELS } from "@/data/devices/types";
import DeviceCard from "./DeviceCard";

interface DeviceFilterProps {
  devices: PhysicalAIDevice[];
  initialCategory?: DeviceCategory;
  initialUseCase?: UseCase;
}

export default function DeviceFilter({ devices, initialCategory, initialUseCase }: DeviceFilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<DeviceCategory | "">(initialCategory || "");
  const [useCase, setUseCase] = useState<UseCase | "">(initialUseCase || "");
  const [priceRange, setPriceRange] = useState<PriceRange | "">("");

  const filtered = useMemo(() => {
    return devices.filter((d) => {
      if (category && d.category !== category) return false;
      if (useCase && !d.useCase.includes(useCase)) return false;
      if (priceRange && d.priceRange !== priceRange) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          d.name.toLowerCase().includes(q) ||
          d.manufacturer.toLowerCase().includes(q) ||
          d.tags.some((t) => t.includes(q)) ||
          d.description.includes(q)
        );
      }
      return true;
    });
  }, [devices, category, useCase, priceRange, search]);

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">キーワード検索</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="名前・メーカー・タグ..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">カテゴリ</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as DeviceCategory | "")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="">すべて</option>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">用途</label>
            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value as UseCase | "")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="">すべて</option>
              {Object.entries(USECASE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">価格帯</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as PriceRange | "")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="">すべて</option>
              {Object.entries(PRICE_LABELS).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">{filtered.length}件のデバイスが見つかりました</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-12">条件に一致するデバイスが見つかりませんでした。</p>
      )}
    </div>
  );
}
