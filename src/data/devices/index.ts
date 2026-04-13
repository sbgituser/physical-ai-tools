import { cobots } from "./cobots";
import { industrialRobots } from "./industrial-robots";
import { agvAmr } from "./agv-amr";
import { edgeAi } from "./edge-ai";
import { sensors } from "./sensors";
import { visionSystems } from "./vision";
import { drones } from "./drones";
import type { PhysicalAIDevice, DeviceCategory, UseCase } from "./types";

export type { PhysicalAIDevice, DeviceCategory, UseCase } from "./types";
export { CATEGORY_LABELS, USECASE_LABELS, PRICE_LABELS, COMPANY_SIZE_LABELS } from "./types";
export type { PriceRange, CompanySize } from "./types";

export const allDevices: PhysicalAIDevice[] = [
  ...cobots,
  ...industrialRobots,
  ...agvAmr,
  ...edgeAi,
  ...sensors,
  ...visionSystems,
  ...drones,
];

export function getDeviceById(id: string): PhysicalAIDevice | undefined {
  return allDevices.find((d) => d.id === id);
}

export function getDevicesByCategory(category: DeviceCategory): PhysicalAIDevice[] {
  return allDevices.filter((d) => d.category === category);
}

export function getDevicesByManufacturer(manufacturer: string): PhysicalAIDevice[] {
  return allDevices.filter((d) => d.manufacturer === manufacturer);
}

export function getDevicesByUseCase(useCase: UseCase): PhysicalAIDevice[] {
  return allDevices.filter((d) => d.useCase.includes(useCase));
}

export function getDevicesByTag(tag: string): PhysicalAIDevice[] {
  return allDevices.filter((d) => d.tags.includes(tag));
}

export function getAllManufacturers(): string[] {
  return [...new Set(allDevices.map((d) => d.manufacturer))].sort();
}

export function getAllTags(): string[] {
  const tagCount = new Map<string, number>();
  for (const d of allDevices) {
    for (const tag of d.tags) {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    }
  }
  return [...tagCount.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
}

export function getAllCategories(): DeviceCategory[] {
  return [...new Set(allDevices.map((d) => d.category))];
}

export function getAllUseCases(): UseCase[] {
  return [...new Set(allDevices.flatMap((d) => d.useCase))];
}
