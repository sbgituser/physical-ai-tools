"use client";

import { useState } from "react";
import Link from "next/link";

interface SensorRecommendation {
  type: string;
  description: string;
  pros: string[];
  cons: string[];
  deviceIds: string[];
  priceRange: string;
}

const MEASUREMENTS = [
  { id: "distance", label: "距離測定" },
  { id: "object-detection", label: "物体検出" },
  { id: "temperature", label: "温度測定" },
  { id: "force", label: "力・トルク測定" },
  { id: "image", label: "画像・外観" },
  { id: "vibration", label: "振動・加速度" },
  { id: "position", label: "位置・変位" },
] as const;

const ENVIRONMENTS = [
  { id: "indoor", label: "屋内（工場）" },
  { id: "outdoor", label: "屋外" },
  { id: "cleanroom", label: "クリーンルーム" },
  { id: "high-temp", label: "高温環境" },
  { id: "waterproof", label: "防水が必要" },
] as const;

const ACCURACY = [
  { id: "high", label: "高精度（μmオーダー）" },
  { id: "standard", label: "標準精度（mmオーダー）" },
  { id: "rough", label: "ラフ（cmオーダー）" },
] as const;

type MeasurementType = (typeof MEASUREMENTS)[number]["id"];
type EnvironmentType = (typeof ENVIRONMENTS)[number]["id"];
type AccuracyType = (typeof ACCURACY)[number]["id"];

function getRecommendations(measurement: MeasurementType, environment: EnvironmentType, accuracy: AccuracyType): SensorRecommendation[] {
  const recs: SensorRecommendation[] = [];

  if (measurement === "distance") {
    if (accuracy === "high") {
      recs.push({
        type: "レーザー変位センサー",
        description: "レーザー光を使ったμmオーダーの超高精度距離測定。インライン検査に最適。",
        pros: ["μm精度", "非接触", "高速応答"],
        cons: ["測定距離が短い（〜1m程度）", "コストが高め"],
        deviceIds: ["keyence-il-series"],
        priceRange: "10万円〜",
      });
    }
    recs.push({
      type: "2D LiDARセンサー",
      description: "レーザーで周囲の距離を2Dスキャン。AGV/AMRのナビゲーション用途に広く使用。",
      pros: ["広い検出範囲", "SLAM対応", "高速スキャン"],
      cons: ["2D（平面）のみ", "価格が高め"],
      deviceIds: ["sick-tim781", "hokuyo-ust-30lx"],
      priceRange: "20万円〜",
    });
    if (accuracy !== "high") {
      recs.push({
        type: "3D LiDARセンサー",
        description: "周囲の3D形状をリアルタイムに取得。自動運転やロボットの環境認識に。",
        pros: ["3D環境認識", "360°スキャン", "自動運転実績豊富"],
        cons: ["コストが高い", "データ処理負荷が大きい"],
        deviceIds: ["velodyne-puck", "livox-mid-360"],
        priceRange: "10万円〜50万円",
      });
    }
    recs.push({
      type: "超音波センサー",
      description: "超音波の反射で距離を測定。低コストで液面検出や近接検知に最適。",
      pros: ["低コスト", "透明物体も検出", "色に依存しない"],
      cons: ["精度がやや低い", "検出範囲が限定的"],
      deviceIds: [],
      priceRange: "数千円〜",
    });
  }

  if (measurement === "object-detection") {
    recs.push({
      type: "光電センサー",
      description: "光の遮断・反射で物体の有無を検出。製造ラインの基本的なセンシングに。",
      pros: ["低コスト", "高速応答", "簡単設置"],
      cons: ["有無判定のみ", "形状認識不可"],
      deviceIds: ["banner-qs18"],
      priceRange: "1万円〜",
    });
    recs.push({
      type: "安全レーザースキャナー",
      description: "安全認証付きのレーザースキャナー。AGVの安全装置や人の侵入検知に必須。",
      pros: ["安全認証SIL2/PLd", "エリア監視", "人検知"],
      cons: ["コストが高い", "安全用途専用"],
      deviceIds: ["sick-microscan3", "keyence-sz-v"],
      priceRange: "30万円〜",
    });
    recs.push({
      type: "3D ToFセンサー",
      description: "Time-of-Flight方式で物体の3D位置・形状を検出。パレタイジングの箱検出に最適。",
      pros: ["3D検出", "リアルタイム", "物体の位置・形状認識"],
      cons: ["解像度がやや低い", "外乱光の影響あり"],
      deviceIds: ["ifm-o3d302"],
      priceRange: "20万円〜",
    });
  }

  if (measurement === "temperature") {
    recs.push({
      type: "温度調節器（熱電対/Pt100）",
      description: "接触式の高精度温度測定。工場の温度制御に必須のデバイス。",
      pros: ["高精度", "低コスト", "PID制御対応"],
      cons: ["接触式", "応答速度がやや遅い"],
      deviceIds: ["omron-e5cc"],
      priceRange: "1万円〜",
    });
    recs.push({
      type: "サーモグラフィカメラ",
      description: "非接触で広範囲の温度分布を可視化。設備の過熱検知や予知保全に。",
      pros: ["非接触", "面で温度分布を取得", "予知保全に最適"],
      cons: ["高コスト", "放射率の影響あり"],
      deviceIds: ["flir-a70"],
      priceRange: "60万円〜",
    });
  }

  if (measurement === "force") {
    recs.push({
      type: "6軸力覚センサー",
      description: "3軸の力と3軸のトルクを同時計測。ロボットの力制御に不可欠。",
      pros: ["6自由度計測", "ロボット制御に最適", "高精度"],
      cons: ["高コスト", "キャリブレーション必要"],
      deviceIds: ["ati-ft-sensor", "onrobot-hex-e"],
      priceRange: "40万円〜",
    });
  }

  if (measurement === "image") {
    recs.push({
      type: "AI画像処理システム",
      description: "カメラ＋AIによる高度な外観検査。傷、汚れ、欠品などを自動検出。",
      pros: ["AI検査", "ノーコード設定", "高検出精度"],
      cons: ["コストが高い", "学習データが必要"],
      deviceIds: ["keyence-cv-x", "cognex-insight-2800"],
      priceRange: "100万円〜",
    });
    recs.push({
      type: "AI画像判別センサー",
      description: "ディープラーニング内蔵のコンパクトな画像センサー。低コストでAI検査を開始。",
      pros: ["低コスト", "コンパクト", "簡単学習"],
      cons: ["処理能力に限界", "複雑な検査は困難"],
      deviceIds: ["keyence-iv3"],
      priceRange: "30万円〜",
    });
    recs.push({
      type: "深度カメラ",
      description: "RGB＋深度情報を取得。ピッキングや物体認識に。低コストで3D認識。",
      pros: ["低コスト", "RGB+深度", "ロボット連携容易"],
      cons: ["精度は3Dスキャナーに劣る", "屋外不向き"],
      deviceIds: ["orbbec-femto-bolt", "intel-realsense-d455"],
      priceRange: "5万円〜",
    });
  }

  if (measurement === "vibration") {
    recs.push({
      type: "IMU/加速度センサー",
      description: "加速度・角速度を計測。ロボットの姿勢推定や機械の振動監視に。",
      pros: ["超低消費電力", "小型", "低コスト"],
      cons: ["ドリフトあり", "精度に限界"],
      deviceIds: ["imu-bosch-bmi270"],
      priceRange: "数百円〜（チップ）",
    });
  }

  if (measurement === "position") {
    recs.push({
      type: "レーザー変位センサー",
      description: "非接触でμmオーダーの変位を計測。部品の厚み・段差測定に。",
      pros: ["超高精度", "非接触", "高速"],
      cons: ["測定範囲が限定的"],
      deviceIds: ["keyence-il-series"],
      priceRange: "10万円〜",
    });
    recs.push({
      type: "3Dスキャナー",
      description: "物体の3D形状を高精度に計測。ビンピッキングや品質検査に。",
      pros: ["高精度3D", "金属光沢面対応", "ロボット連携"],
      cons: ["高コスト", "計測時間がかかる"],
      deviceIds: ["photoneo-phoxi-3d"],
      priceRange: "150万円〜",
    });
  }

  return recs;
}

export default function SensorGuideWizard() {
  const [measurement, setMeasurement] = useState<MeasurementType | "">("");
  const [environment, setEnvironment] = useState<EnvironmentType>("indoor");
  const [accuracy, setAccuracy] = useState<AccuracyType>("standard");

  const recommendations = measurement ? getRecommendations(measurement, environment, accuracy) : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-bold text-gray-700 mb-4">条件を選択</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">測定対象</label>
            <select
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value as MeasurementType)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="">選択してください</option>
              {MEASUREMENTS.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">使用環境</label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value as EnvironmentType)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              {ENVIRONMENTS.map((env) => (
                <option key={env.id} value={env.id}>{env.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">精度要求</label>
            <select
              value={accuracy}
              onChange={(e) => setAccuracy(e.target.value as AccuracyType)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              {ACCURACY.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold">推奨センサータイプ（{recommendations.length}件）</h2>
          {recommendations.map((rec, i) => (
            <div key={rec.type} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[var(--color-bg)] text-[var(--color-primary)] text-xs font-bold px-2 py-1 rounded">
                  #{i + 1}
                </span>
                <h3 className="font-bold text-gray-800">{rec.type}</h3>
                <span className="text-xs text-gray-400 ml-auto">{rec.priceRange}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs font-medium text-green-700 mb-1">メリット</p>
                  <ul className="text-sm text-gray-600 space-y-0.5">
                    {rec.pros.map((p) => (
                      <li key={p}>+ {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-red-700 mb-1">デメリット</p>
                  <ul className="text-sm text-gray-600 space-y-0.5">
                    {rec.cons.map((c) => (
                      <li key={c}>- {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {rec.deviceIds.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {rec.deviceIds.map((did) => (
                    <Link
                      key={did}
                      href={`/tools/device-database/${did}`}
                      className="text-xs bg-[var(--color-bg)] text-[var(--color-primary)] px-2 py-1 rounded hover:opacity-80"
                    >
                      製品を見る →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {measurement === "" && (
        <p className="text-center text-gray-400 py-8">測定対象を選択すると、推奨センサータイプが表示されます。</p>
      )}
    </div>
  );
}
