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
};
