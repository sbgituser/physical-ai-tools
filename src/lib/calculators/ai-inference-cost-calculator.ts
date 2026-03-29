export function calculateAiInferenceCost(values: Record<string, number | string>) {
  const modelSize = String(values.modelSize || "小型モデル(<100Mパラメータ)");
  const requestsPerDay = Number(values.requestsPerDay) || 1000;
  const device = String(values.device || "クラウドGPU");

  // モデルサイズ別のクラウドAPI単価 (円/推論)
  const cloudCostPerInference: Record<string, number> = {
    "小型モデル(<100Mパラメータ)": 0.1,
    "中型モデル(100M〜1Bパラメータ)": 0.5,
    "大型モデル(>1Bパラメータ)":    2.0,
  };

  // デバイス別のレイテンシ目安 (ms)
  const latencyTable: Record<string, Record<string, string>> = {
    "クラウドGPU": {
      "小型モデル(<100Mパラメータ)":    "50〜150 ms",
      "中型モデル(100M〜1Bパラメータ)": "100〜300 ms",
      "大型モデル(>1Bパラメータ)":       "300〜1,000 ms",
    },
    "エッジGPU(Jetson Orin Nano)": {
      "小型モデル(<100Mパラメータ)":    "5〜20 ms",
      "中型モデル(100M〜1Bパラメータ)": "20〜80 ms",
      "大型モデル(>1Bパラメータ)":       "100〜400 ms",
    },
    "Raspberry Pi": {
      "小型モデル(<100Mパラメータ)":    "200〜600 ms",
      "中型モデル(100M〜1Bパラメータ)": "1,000〜5,000 ms",
      "大型モデル(>1Bパラメータ)":       "10,000 ms 以上",
    },
  };

  // デバイス別の月額コスト計算
  const monthlyRequests = requestsPerDay * 30;
  let monthlyCost: number;
  let costNote: string;

  if (device === "クラウドGPU") {
    const unitCost = cloudCostPerInference[modelSize] ?? 0.5;
    monthlyCost = monthlyRequests * unitCost;
    costNote = `API単価: ${unitCost}円/回`;
  } else if (device === "エッジGPU(Jetson Orin Nano)") {
    // Jetson Orin Nano: 10W消費、電力単価31円/kWh
    // 初期費用は別途。ランニングコストは電気代のみ
    const electricityMonthlyCost = (10 / 1000) * 24 * 30 * 31;
    monthlyCost = electricityMonthlyCost;
    costNote = `電気代のみ(初期費用除く): 約${Math.round(electricityMonthlyCost)}円`;
  } else {
    // Raspberry Pi: 5W消費、電力単価31円/kWh
    const electricityMonthlyCost = (5 / 1000) * 24 * 30 * 31;
    monthlyCost = electricityMonthlyCost;
    costNote = `電気代のみ(初期費用除く): 約${Math.round(electricityMonthlyCost)}円`;
  }

  const yearlyCost = monthlyCost * 12;
  const latencyMs = (latencyTable[device] ?? latencyTable["クラウドGPU"])[modelSize] ?? "—";

  const fmt = (n: number) => Math.round(n).toLocaleString("ja-JP");

  return {
    monthlyCost: fmt(monthlyCost),
    yearlyCost: fmt(yearlyCost),
    latencyMs,
    costPer1000: device === "クラウドGPU"
      ? fmt(monthlyCost / (monthlyRequests / 1000)) + " 円/千回"
      : "電気代固定",
  };
}
