export type DeviceCategory =
  | "cobot"
  | "industrial-robot"
  | "agv-amr"
  | "edge-ai"
  | "sensor"
  | "vision"
  | "drone";

export type UseCase =
  | "assembly"
  | "welding"
  | "inspection"
  | "logistics"
  | "picking"
  | "agriculture"
  | "security"
  | "cleaning";

export type PriceRange =
  | "under-100man"
  | "100-500man"
  | "500-1000man"
  | "over-1000man";

export type CompanySize = "enterprise" | "midsize" | "small";

export interface PhysicalAIDevice {
  id: string;
  name: string;
  manufacturer: string;
  category: DeviceCategory;
  subcategory: string;
  useCase: UseCase[];
  priceRange: PriceRange;
  estimatedPrice?: string;
  specs: {
    payload?: string;
    reach?: string;
    repeatability?: string;
    weight?: string;
    power?: string;
    connectivity?: string[];
    aiCapability?: string;
    os?: string;
    resolution?: string;
    range?: string;
    speed?: string;
    battery?: string;
    flightTime?: string;
    ip?: string;
    fps?: string;
    interface?: string;
  };
  features: string[];
  targetIndustry: string[];
  companySize: CompanySize[];
  description: string;
  officialUrl: string;
  tags: string[];
  relatedDevices: string[];
  seoKeywords: string[];
}

export const CATEGORY_LABELS: Record<DeviceCategory, string> = {
  cobot: "協働ロボット",
  "industrial-robot": "産業用ロボット",
  "agv-amr": "AGV・AMR（自律搬送ロボット）",
  "edge-ai": "エッジAIデバイス",
  sensor: "センサー",
  vision: "ビジョンシステム",
  drone: "ドローン",
};

export const USECASE_LABELS: Record<UseCase, string> = {
  assembly: "組立",
  welding: "溶接",
  inspection: "検査",
  logistics: "物流・搬送",
  picking: "ピッキング",
  agriculture: "農業",
  security: "セキュリティ・監視",
  cleaning: "清掃",
};

export const PRICE_LABELS: Record<PriceRange, string> = {
  "under-100man": "100万円未満",
  "100-500man": "100〜500万円",
  "500-1000man": "500〜1,000万円",
  "over-1000man": "1,000万円以上",
};

export const COMPANY_SIZE_LABELS: Record<CompanySize, string> = {
  enterprise: "大企業",
  midsize: "中堅企業",
  small: "中小企業",
};
