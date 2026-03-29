export function calculateCalorie(values: Record<string, number | string>) {
  const age = Number(values.age);
  const height = Number(values.height);
  const weight = Number(values.weight);
  const gender = values.gender as string;
  const activity = values.activity as string;

  // Mifflin-St Jeor Equation
  let bmr =
    gender === "男性"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMap: Record<string, number> = {
    "低い（座り仕事）": 1.2,
    "普通（軽い運動）": 1.55,
    "高い（激しい運動）": 1.9,
  };
  const factor = activityMap[activity] ?? 1.55;
  const tdee = bmr * factor;

  return {
    bmr: Math.round(bmr).toString(),
    tdee: Math.round(tdee).toString(),
  };
}
