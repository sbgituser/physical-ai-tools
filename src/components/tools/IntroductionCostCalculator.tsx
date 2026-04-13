"use client";

import { useState, useMemo } from "react";
import { costPresets } from "@/data/cost-params";
import { calculateIntroductionCost } from "@/lib/cost-calc";

const fmt = (n: number) => Math.round(n).toLocaleString("ja-JP");

export default function IntroductionCostCalculator() {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [deviceCount, setDeviceCount] = useState(1);
  const [deviceUnitCost, setDeviceUnitCost] = useState(3000000);
  const [hourlyWage, setHourlyWage] = useState(1500);
  const [workerCount, setWorkerCount] = useState(2);
  const [workHoursPerDay, setWorkHoursPerDay] = useState(8);
  const [workDaysPerMonth, setWorkDaysPerMonth] = useState(22);
  const [isNewLine, setIsNewLine] = useState(false);

  const preset = costPresets[categoryIdx];

  const result = useMemo(
    () =>
      calculateIntroductionCost({
        preset,
        deviceCount,
        deviceUnitCost,
        hourlyWage,
        workerCount,
        workHoursPerDay,
        workDaysPerMonth,
        isNewLine,
      }),
    [preset, deviceCount, deviceUnitCost, hourlyWage, workerCount, workHoursPerDay, workDaysPerMonth, isNewLine]
  );

  return (
    <div className="space-y-6">
      {/* 入力 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4">導入条件を入力</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">デバイスカテゴリ</label>
            <select
              value={categoryIdx}
              onChange={(e) => setCategoryIdx(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              {costPresets.map((p, i) => (
                <option key={p.category} value={i}>{p.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">導入台数</label>
            <input type="number" value={deviceCount} min={1} onChange={(e) => setDeviceCount(Number(e.target.value) || 1)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">デバイス単価（円）</label>
            <input type="number" value={deviceUnitCost} onChange={(e) => setDeviceUnitCost(Number(e.target.value) || 0)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
            <span className="text-xs text-gray-400">目安: {fmt(preset.deviceCostMin)}〜{fmt(preset.deviceCostMax)}円</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">設置環境</label>
            <select value={isNewLine ? "new" : "existing"} onChange={(e) => setIsNewLine(e.target.value === "new")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]">
              <option value="existing">既存ライン改修</option>
              <option value="new">新規ライン構築</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <p className="text-sm font-medium text-gray-600 mb-2">現在の人件費（削減対象工程）</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">時給（円）</label>
            <input type="number" value={hourlyWage} onChange={(e) => setHourlyWage(Number(e.target.value) || 0)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">作業者数（人）</label>
            <input type="number" value={workerCount} min={1} onChange={(e) => setWorkerCount(Number(e.target.value) || 1)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">1日の稼働時間</label>
            <input type="number" value={workHoursPerDay} onChange={(e) => setWorkHoursPerDay(Number(e.target.value) || 0)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">月間稼働日数</label>
            <input type="number" value={workDaysPerMonth} onChange={(e) => setWorkDaysPerMonth(Number(e.target.value) || 0)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
        </div>
      </div>

      {/* 結果：初期費用 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4">初期費用の内訳</h2>
        <div className="space-y-2">
          {[
            ["デバイス本体", result.deviceTotal],
            ["周辺機器・治具", result.peripheralCost],
            ["SIer（システムインテグレーション）費用", result.sierCost],
            ["安全対策費用", result.safetyCost],
            ["教育・研修費", result.trainingCost],
            ...(result.installationExtra > 0 ? [["新規ライン構築追加費用" as string, result.installationExtra] as [string, number]] : []),
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <span className="text-sm text-gray-600">{label as string}</span>
              <span className="text-sm font-medium">{fmt(value as number)}円</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200">
            <span className="font-bold text-gray-800">初期費用合計</span>
            <span className="font-bold text-lg text-[var(--color-primary)]">{fmt(result.totalInitial)}円</span>
          </div>
        </div>
      </div>

      {/* 結果：ランニングコスト */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4">年間ランニングコスト</h2>
        <div className="space-y-2">
          {[
            ["保守・メンテナンス", result.maintenanceYearly],
            ["電力コスト", result.powerYearly],
            ["消耗品", result.consumablesYearly],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <span className="text-sm text-gray-600">{label as string}</span>
              <span className="text-sm font-medium">{fmt(value as number)}円/年</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200">
            <span className="font-bold text-gray-800">年間ランニングコスト合計</span>
            <span className="font-bold text-lg text-orange-600">{fmt(result.totalRunningYearly)}円/年</span>
          </div>
        </div>
      </div>

      {/* 結果：削減効果 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4">年間削減効果（見込み）</h2>
        <div className="space-y-2">
          {[
            ["人件費削減", result.laborSavingYearly],
            ["品質向上効果", result.qualitySavingYearly],
            ["稼働率向上効果", result.uptimeSavingYearly],
          ].map(([label, value]) => (
            <div key={label as string} className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <span className="text-sm text-gray-600">{label as string}</span>
              <span className="text-sm font-medium text-green-600">+{fmt(value as number)}円/年</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200">
            <span className="font-bold text-gray-800">年間削減効果合計</span>
            <span className="font-bold text-lg text-green-600">+{fmt(result.totalSavingYearly)}円/年</span>
          </div>
        </div>
      </div>

      {/* ROIサマリー */}
      <div className="bg-[var(--color-bg)] rounded-xl p-6">
        <h2 className="font-bold text-gray-700 mb-4">ROI分析結果</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">年間純削減額</p>
            <p className={`text-2xl font-bold ${result.netSavingYearly >= 0 ? "text-green-600" : "text-red-600"}`}>
              {result.netSavingYearly >= 0 ? "+" : ""}{fmt(result.netSavingYearly)}円
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">ROI（年間）</p>
            <p className={`text-2xl font-bold ${result.roiPercent >= 0 ? "text-[var(--color-primary)]" : "text-red-600"}`}>
              {result.roiPercent}%
            </p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">投資回収期間</p>
            <p className="text-2xl font-bold text-[var(--color-primary)]">
              {result.paybackMonths >= 999 ? "—" : `${result.paybackMonths}ヶ月`}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          ※本シミュレーションは概算です。実際の導入効果は環境・用途・メーカーにより異なります。
          補助金（ものづくり補助金、事業再構築補助金等）の活用により、実質的な初期費用を削減できる場合があります。
        </p>
      </div>
    </div>
  );
}
