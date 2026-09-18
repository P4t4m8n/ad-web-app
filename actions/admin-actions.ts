"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/utils/admin-session.server";
import { uploadImage, deleteImage } from "@/utils/cloudinary.server";
import {
  insertItem,
  updateItemById,
  deleteItemById,
  getItemById,
} from "@/utils/items.server";
import { AppError } from "@/utils/AppError.server";
import { CATEGORIES, TCategory } from "@/types/app";

const blankToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

const optionalText = z.preprocess(
  blankToUndefined,
  z.string().trim().optional(),
);
const optionalDimension = z.preprocess(
  blankToUndefined,
  z.coerce.number().positive("Must be a positive number").optional(),
);

const itemFieldsSchema = z.object({
  category: z.enum(CATEGORIES),
  text: optionalText,
  width: optionalDimension,
  height: optionalDimension,
  material: optionalText,
  technique: optionalText,
});

const updateFieldsSchema = itemFieldsSchema.extend({
  id: z.string().min(1, "Missing item id"),
});

const deleteFieldsSchema = z.object({
  id: z.string().min(1, "Missing item id"),
  category: z.enum(CATEGORIES),
});

const parseFormData = <T extends z.ZodType>(
  schema: T,
  formData: FormData,
): z.infer<T> => {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    throw AppError.create(
      result.error.issues[0]?.message ?? "Invalid input",
      400,
      true,
    );
  }
  return result.data;
};

const revalidateCategory = (category: TCategory) => {
  revalidatePath(`/admin/dashboard/${category}`);
  revalidatePath(`/${category}`);
};

export const createItem = async (formData: FormData) => {
  await requireAdminSession();

  const { category, text, width, height, material, technique } =
    parseFormData(itemFieldsSchema, formData);
  const file = formData.get("image");

  if (!(file instanceof File) || file.size === 0) {
    throw AppError.create("Image is required", 400, true);
  }

  const uploaded = await uploadImage(file, `ad-portfolio/${category}`);

  await insertItem({
    category,
    text: text ?? "",
    imgUrl: uploaded.url,
    imgPublicId: uploaded.publicId,
    width: width ?? 0,
    height: height ?? 0,
    material: material ?? "",
    technique: technique ?? "",
  });

  revalidateCategory(category);
};

export const updateItem = async (formData: FormData) => {
  await requireAdminSession();

  const { id, category, text, width, height, material, technique } =
    parseFormData(updateFieldsSchema, formData);
  const file = formData.get("image");

  const update: {
    text: string;
    width: number;
    height: number;
    material: string;
    technique: string;
    imgUrl?: string;
    imgPublicId?: string;
  } = {
    text: text ?? "",
    width: width ?? 0,
    height: height ?? 0,
    material: material ?? "",
    technique: technique ?? "",
  };

  if (file instanceof File && file.size > 0) {
    const existing = await getItemById(id);
    const uploaded = await uploadImage(file, `ad-portfolio/${category}`);
    update.imgUrl = uploaded.url;
    update.imgPublicId = uploaded.publicId;

    if (existing) {
      await deleteImage(existing.imgPublicId);
    }
  }

  await updateItemById(id, update);

  revalidateCategory(category);
};

export const deleteItem = async (formData: FormData) => {
  await requireAdminSession();

  const { id, category } = parseFormData(deleteFieldsSchema, formData);

  const deleted = await deleteItemById(id);
  if (deleted) {
    await deleteImage(deleted.imgPublicId);
  }

  revalidateCategory(category);
};
