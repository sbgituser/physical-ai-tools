import type { PhysicalAIDevice } from "@/data/devices/types";

export default function DeviceSpecs({ device }: { device: PhysicalAIDevice }) {
  const specs = device.specs;
  const rows: [string, string][] = [];

  if (specs.payload) rows.push(["可搬重量", specs.payload]);
  if (specs.reach) rows.push(["リーチ", specs.reach]);
  if (specs.repeatability) rows.push(["繰り返し精度", specs.repeatability]);
  if (specs.weight) rows.push(["本体重量", specs.weight]);
  if (specs.power) rows.push(["消費電力", specs.power]);
  if (specs.speed) rows.push(["速度", specs.speed]);
  if (specs.range) rows.push(["検出距離/範囲", specs.range]);
  if (specs.resolution) rows.push(["分解能/解像度", specs.resolution]);
  if (specs.battery) rows.push(["バッテリー", specs.battery]);
  if (specs.flightTime) rows.push(["飛行時間", specs.flightTime]);
  if (specs.fps) rows.push(["フレームレート", specs.fps]);
  if (specs.ip) rows.push(["保護等級", specs.ip]);
  if (specs.connectivity) rows.push(["接続方式", specs.connectivity.join(", ")]);
  if (specs.aiCapability) rows.push(["AI機能", specs.aiCapability]);
  if (specs.os) rows.push(["OS/コントローラー", specs.os]);
  if (specs.interface) rows.push(["インターフェース", specs.interface]);

  if (rows.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <h2 className="text-lg font-bold p-4 border-b border-gray-100">主要スペック</h2>
      <table className="w-full">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="px-4 py-2.5 text-sm font-medium text-gray-600 w-1/3">{label}</td>
              <td className="px-4 py-2.5 text-sm text-gray-800">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
