export function calculateCloudVsEdge(values: Record<string, number | string>) {
  const inferences = Number(values.inferences) || 0;
  const apiCostPer = Number(values.apiCostPer) || 0;
  const edgeInitial = Number(values.edgeInitial) || 0;
  const edgeElectricity = Number(values.edgeElectricity) || 0;

  const cloudMonthly = inferences * apiCostPer;
  const edgeMonthly = edgeElectricity;

  const monthlySaving = cloudMonthly - edgeMonthly;
  const breakEvenMonths =
    monthlySaving > 0 ? Math.ceil(edgeInitial / monthlySaving) : 0;

  const cloudTotal3y = cloudMonthly * 36;
  const edgeTotal3y = edgeInitial + edgeMonthly * 36;
  const saving3y = cloudTotal3y - edgeTotal3y;

  const fmt = (n: number) => Math.round(n).toLocaleString("ja-JP");

  return {
    cloudMonthly: fmt(cloudMonthly),
    edgeMonthly: fmt(edgeMonthly),
    breakEvenMonths: breakEvenMonths > 0 ? String(breakEvenMonths) : "—",
    cloudTotal3y: fmt(cloudTotal3y),
    edgeTotal3y: fmt(edgeTotal3y),
    saving3y: fmt(saving3y),
  };
}
