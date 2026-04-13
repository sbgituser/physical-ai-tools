import type { CostPreset } from "@/data/cost-params";

export interface CostInput {
  preset: CostPreset;
  deviceCount: number;
  deviceUnitCost: number;
  hourlyWage: number;
  workerCount: number;
  workHoursPerDay: number;
  workDaysPerMonth: number;
  isNewLine: boolean;
}

export interface CostResult {
  // 初期費用内訳
  deviceTotal: number;
  peripheralCost: number;
  sierCost: number;
  safetyCost: number;
  trainingCost: number;
  installationExtra: number;
  totalInitial: number;

  // 年間ランニングコスト
  maintenanceYearly: number;
  powerYearly: number;
  consumablesYearly: number;
  totalRunningYearly: number;

  // 年間削減効果
  laborSavingYearly: number;
  qualitySavingYearly: number;
  uptimeSavingYearly: number;
  totalSavingYearly: number;

  // ROI
  netSavingYearly: number;
  roiPercent: number;
  paybackMonths: number;
}

export function calculateIntroductionCost(input: CostInput): CostResult {
  const { preset, deviceCount, deviceUnitCost, hourlyWage, workerCount, workHoursPerDay, workDaysPerMonth, isNewLine } = input;

  // 初期費用
  const deviceTotal = deviceUnitCost * deviceCount;
  const peripheralCost = Math.round(deviceTotal * preset.peripheralRatio);
  const sierCost = Math.round(deviceTotal * preset.sierRatio);
  const safetyCost = Math.round(deviceTotal * preset.safetyRatio);
  const trainingCost = preset.trainingCost;
  const installationExtra = isNewLine ? Math.round(deviceTotal * 0.2) : 0;
  const totalInitial = deviceTotal + peripheralCost + sierCost + safetyCost + trainingCost + installationExtra;

  // 年間ランニングコスト
  const maintenanceYearly = Math.round(deviceTotal * preset.maintenanceYearlyRatio);
  const powerYearly = preset.powerMonthly * deviceCount * 12;
  const consumablesYearly = preset.consumablesMonthly * deviceCount * 12;
  const totalRunningYearly = maintenanceYearly + powerYearly + consumablesYearly;

  // 現在の人件費（年間）
  const currentLaborYearly = hourlyWage * workerCount * workHoursPerDay * workDaysPerMonth * 12;

  // 年間削減効果
  const laborSavingYearly = Math.round(currentLaborYearly * preset.laborReductionRate);
  const qualitySavingYearly = Math.round(currentLaborYearly * preset.qualityGainRate);
  const uptimeSavingYearly = Math.round(currentLaborYearly * preset.uptimeGainRate);
  const totalSavingYearly = laborSavingYearly + qualitySavingYearly + uptimeSavingYearly;

  // ROI
  const netSavingYearly = totalSavingYearly - totalRunningYearly;
  const roiPercent = totalInitial > 0 ? Math.round((netSavingYearly / totalInitial) * 100) : 0;
  const paybackMonths = netSavingYearly > 0 ? Math.round((totalInitial / netSavingYearly) * 12) : 999;

  return {
    deviceTotal,
    peripheralCost,
    sierCost,
    safetyCost,
    trainingCost,
    installationExtra,
    totalInitial,
    maintenanceYearly,
    powerYearly,
    consumablesYearly,
    totalRunningYearly,
    laborSavingYearly,
    qualitySavingYearly,
    uptimeSavingYearly,
    totalSavingYearly,
    netSavingYearly,
    roiPercent,
    paybackMonths,
  };
}
