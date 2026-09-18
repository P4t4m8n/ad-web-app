export const CATEGORIES = [
  "fan-art",
  "murals",
  "illustration",
  "portraits",
] as const;

export type TCategory = (typeof CATEGORIES)[number];

export type TItem = {
  text: string;
  imgPath: string;
  id: string;
  imgId: string;
  category: TCategory;
  width: number;
  height: number;
  material: string;
  technique: string;
};

// Combines an item's fields into the single caption string used wherever it's displayed.
export const formatItemDetails = (item: TItem): string => {
  const parts: string[] = [];

  if (item.text) parts.push(item.text);
  if (item.width > 0 && item.height > 0) {
    parts.push(`${item.width}×${item.height} cm`);
  }
  if (item.material) parts.push(item.material);
  if (item.technique) parts.push(item.technique);

  return parts.join(" · ");
};
