"use client";

import { useState, useCallback } from "react";
import { trackToolUse } from "@/lib/analytics";
import { calculateIotElectricity } from "@/lib/calculators/iot-electricity";
import { calculateEdgeAiRoi } from "@/lib/calculators/edge-ai-roi";
import { calculateCloudVsEdge } from "@/lib/calculators/cloud-vs-edge";
import { calculateSensorPower } from "@/lib/calculators/sensor-power-calculator";
import { calculateAiInferenceCost } from "@/lib/calculators/ai-inference-cost-calculator";

const calculators: Record<string, (values: Record<string, number | string>) => Record<string, string | number>> = {
  "iot-electricity-calculator": calculateIotElectricity,
  "edge-ai-roi-calculator": calculateEdgeAiRoi,
  "cloud-vs-edge-calculator": calculateCloudVsEdge,
  "sensor-power-calculator": calculateSensorPower,
  "ai-inference-cost-calculator": calculateAiInferenceCost,
};

interface ToolInput {
  id: string;
  label: string;
  type: "number" | "select";
  unit?: string;
  default: number | string;
  options?: string[];
}

interface ToolOutput {
  id: string;
  label: string;
  unit?: string;
}

interface CalculatorProps {
  slug: string;
  inputs: ToolInput[];
  outputs: ToolOutput[];
}

export default function Calculator({ slug, inputs, outputs }: CalculatorProps) {
  const initialValues = Object.fromEntries(inputs.map((i) => [i.id, i.default]));
  const [values, setValues] = useState<Record<string, number | string>>(initialValues);

  const calculate = calculators[slug];

  const handleChange = useCallback(
    (id: string, value: string) => {
      const input = inputs.find((i) => i.id === id);
      const parsed = input?.type === "number" ? parseFloat(value) || 0 : value;
      const newValues = { ...values, [id]: parsed };
      setValues(newValues);
      trackToolUse(slug, newValues);
    },
    [values, inputs, slug]
  );

  if (!calculate) {
    return <p className="text-gray-500">このツールの計算ロジックは未実装です。</p>;
  }

  const results = calculate(values);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="space-y-4 mb-6">
        {inputs.map((input) => (
          <div key={input.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {input.label}
              {input.unit && <span className="text-gray-400 ml-1">（{input.unit}）</span>}
            </label>
            {input.type === "select" ? (
              <select
                value={values[input.id] as string}
                onChange={(e) => handleChange(input.id, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                {input.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type="number"
                value={values[input.id] as number}
                onChange={(e) => handleChange(input.id, e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            )}
          </div>
        ))}
      </div>

      <div className="bg-[var(--color-bg)] rounded-lg p-4 space-y-3">
        <h3 className="font-bold text-gray-700 text-sm">計算結果</h3>
        {outputs.map((output) => (
          <div key={output.id} className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">{output.label}</span>
            <span className="font-bold text-[var(--color-primary)] text-lg">
              {results[output.id]}
              {output.unit && <span className="text-sm font-normal ml-1">{output.unit}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
