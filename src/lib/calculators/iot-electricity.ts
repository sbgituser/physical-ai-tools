export function calculateIotElectricity(values: Record<string, number | string>) {
  const watt = Number(values.watt) || 0;
  const hours = Number(values.hours) || 0;
  const devices = Number(values.devices) || 0;
  const rate = Number(values.rate) || 0;

  const monthlyKwh = (watt * hours * 30 * devices) / 1000;
  const monthlyCost = monthlyKwh * rate;
  const yearlyCost = monthlyCost * 12;
  const tenYearCost = yearlyCost * 10;

  const fmt = (n: number) => Math.round(n).toLocaleString("ja-JP");

  return {
    monthlyKwh: monthlyKwh.toFixed(1),
    monthlyCost: fmt(monthlyCost),
    yearlyCost: fmt(yearlyCost),
    tenYearCost: fmt(tenYearCost),
  };
}
