export function calculateBmi(values: Record<string, number | string>) {
  const height = Number(values.height) / 100;
  const weight = Number(values.weight);
  const bmi = height > 0 ? weight / (height * height) : 0;
  const standardWeight = height > 0 ? 22 * height * height : 0;

  let category = "";
  if (bmi < 18.5) category = "低体重";
  else if (bmi < 25) category = "普通体重";
  else if (bmi < 30) category = "肥満（1度）";
  else category = "肥満（2度以上）";

  return {
    bmi: bmi.toFixed(1),
    category,
    standardWeight: standardWeight.toFixed(1),
  };
}
