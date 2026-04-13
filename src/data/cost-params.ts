export interface CostPreset {
  category: string;
  label: string;
  deviceCostMin: number;
  deviceCostMax: number;
  peripheralRatio: number;    // 周辺機器費用率（本体に対する比率）
  sierRatio: number;          // SIer費用率
  safetyRatio: number;        // 安全対策費用率
  trainingCost: number;       // 教育費（固定）
  maintenanceYearlyRatio: number; // 年間保守費率
  powerMonthly: number;       // 月間電力コスト
  consumablesMonthly: number; // 月間消耗品コスト
  laborReductionRate: number; // 人件費削減率の目安
  qualityGainRate: number;    // 品質向上効果率
  uptimeGainRate: number;     // 稼働率向上効果率
}

export const costPresets: CostPreset[] = [
  {
    category: "cobot",
    label: "協働ロボット",
    deviceCostMin: 2000000,
    deviceCostMax: 5000000,
    peripheralRatio: 0.3,
    sierRatio: 0.4,
    safetyRatio: 0.05,
    trainingCost: 300000,
    maintenanceYearlyRatio: 0.05,
    powerMonthly: 3000,
    consumablesMonthly: 5000,
    laborReductionRate: 0.5,
    qualityGainRate: 0.1,
    uptimeGainRate: 0.15,
  },
  {
    category: "industrial-robot",
    label: "産業用ロボット",
    deviceCostMin: 5000000,
    deviceCostMax: 15000000,
    peripheralRatio: 0.5,
    sierRatio: 0.5,
    safetyRatio: 0.15,
    trainingCost: 500000,
    maintenanceYearlyRatio: 0.05,
    powerMonthly: 10000,
    consumablesMonthly: 10000,
    laborReductionRate: 0.7,
    qualityGainRate: 0.15,
    uptimeGainRate: 0.2,
  },
  {
    category: "agv-amr",
    label: "AGV / AMR",
    deviceCostMin: 2000000,
    deviceCostMax: 10000000,
    peripheralRatio: 0.2,
    sierRatio: 0.3,
    safetyRatio: 0.1,
    trainingCost: 200000,
    maintenanceYearlyRatio: 0.08,
    powerMonthly: 2000,
    consumablesMonthly: 3000,
    laborReductionRate: 0.4,
    qualityGainRate: 0.05,
    uptimeGainRate: 0.1,
  },
  {
    category: "edge-ai",
    label: "エッジAI検査システム",
    deviceCostMin: 100000,
    deviceCostMax: 3000000,
    peripheralRatio: 0.5,
    sierRatio: 0.6,
    safetyRatio: 0.0,
    trainingCost: 200000,
    maintenanceYearlyRatio: 0.1,
    powerMonthly: 1000,
    consumablesMonthly: 0,
    laborReductionRate: 0.6,
    qualityGainRate: 0.2,
    uptimeGainRate: 0.05,
  },
  {
    category: "vision",
    label: "ビジョン検査システム",
    deviceCostMin: 500000,
    deviceCostMax: 5000000,
    peripheralRatio: 0.4,
    sierRatio: 0.5,
    safetyRatio: 0.0,
    trainingCost: 300000,
    maintenanceYearlyRatio: 0.08,
    powerMonthly: 2000,
    consumablesMonthly: 1000,
    laborReductionRate: 0.5,
    qualityGainRate: 0.25,
    uptimeGainRate: 0.1,
  },
];
