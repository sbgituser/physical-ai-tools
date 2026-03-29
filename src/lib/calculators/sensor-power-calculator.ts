export function calculateSensorPower(values: Record<string, number | string>) {
  const sensorType = String(values.sensorType || "温度センサー");
  const samplingInterval = Number(values.samplingInterval) || 60;
  const mode = String(values.mode || "間欠稼働");
  const devices = Number(values.devices) || 1;

  // 各センサーの常時稼働時消費電力(mW)とアクティブ時消費電力(mW)
  const sensorSpecs: Record<string, { always: number; active: number; standby: number; latencyMs: string }> = {
    "温度センサー":    { always: 1.0,   active: 2.0,   standby: 0.05,  latencyMs: "< 1ms" },
    "湿度センサー":    { always: 2.0,   active: 3.5,   standby: 0.1,   latencyMs: "< 1ms" },
    "加速度センサー":  { always: 3.5,   active: 5.0,   standby: 0.15,  latencyMs: "< 1ms" },
    "CO2センサー":     { always: 25.0,  active: 100.0, standby: 0.5,   latencyMs: "2~30s" },
    "GPSセンサー":     { always: 50.0,  active: 120.0, standby: 1.0,   latencyMs: "30~60s" },
    "カメラモジュール": { always: 500.0, active: 800.0, standby: 10.0,  latencyMs: "< 1ms" },
  };

  const spec = sensorSpecs[sensorType] || sensorSpecs["温度センサー"];

  // 消費電力計算
  let powerPerDeviceMw: number;
  if (mode === "常時稼働") {
    powerPerDeviceMw = spec.always;
  } else {
    // 間欠稼働: アクティブ時間100ms + スタンバイ
    const activeTimeSec = 0.1;
    const dutyCycle = activeTimeSec / samplingInterval;
    powerPerDeviceMw = spec.active * dutyCycle + spec.standby * (1 - dutyCycle);
  }

  // 月間消費電力量 (kWh)
  const monthlyKwhPerDevice = (powerPerDeviceMw / 1000) * 24 * 30 / 1000;
  const monthlyKwhTotal = monthlyKwhPerDevice * devices;

  // バッテリー持続時間: 2000mAh @ 3.3V = 6600mWh
  const batteryCapacityMwh = 6600;
  const batteryDays = batteryCapacityMwh / (powerPerDeviceMw * 24);

  const fmt = (n: number, digits = 0) =>
    digits > 0 ? n.toFixed(digits) : Math.round(n).toLocaleString("ja-JP");

  return {
    powerPerDevice: powerPerDeviceMw < 10
      ? powerPerDeviceMw.toFixed(2) + " mW"
      : Math.round(powerPerDeviceMw) + " mW",
    monthlyKwh: monthlyKwhTotal < 0.01
      ? (monthlyKwhTotal * 1000).toFixed(3) + " Wh"
      : monthlyKwhTotal.toFixed(3) + " kWh",
    batteryDays: batteryDays > 9999
      ? "> 9,999 日"
      : batteryDays > 365
      ? (batteryDays / 365).toFixed(1) + " 年"
      : Math.round(batteryDays).toLocaleString("ja-JP") + " 日",
    totalMonthlyKwh: (monthlyKwhTotal).toFixed(4),
  };
}
