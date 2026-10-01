import locations from "./costa-rica-locations.json";

// IGN, División Territorial Administrativa 2026. Ver UBICACIONES.md.
export const locationProvinces = locations.map(province => province.name);
export function getCantons(province: string): string[] {
  return locations.find(item => item.name === province)?.cantons.map(canton => canton.name) ?? [];
}
export function getDistricts(province: string, canton: string): string[] {
  return locations.find(item => item.name === province)?.cantons.find(item => item.name === canton)?.districts.map(district => district.name) ?? [];
}
export function isValidLocation(province: string, canton: string, district: string): boolean {
  return getDistricts(province, canton).includes(district);
}
