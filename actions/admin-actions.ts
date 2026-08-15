"use server";

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

const parseCategory = (value: FormDataEntryValue | null): TCategory => {
  if (typeof value !== "string" || !CATEGORIES.includes(value as TCategory)) {
    throw AppError.create("Invalid category", 400, true);
  }

  return value as TCategory;
};

const revalidateCategory = (category: TCategory) => {
  revalidatePath(`/admin/dashboard/${category}`);
  revalidatePath(`/${category}`);
};

export const createItem = async (formData: FormData) => {
  await requireAdminSession();

  const category = parseCategory(formData.get("category"));
  const text = String(formData.get("text") ?? "").trim();
  const file = formData.get("image");

  if (!text) {
    throw AppError.create("Text is required", 400, true);
  }
  if (!(file instanceof File) || file.size === 0) {
    throw AppError.create("Image is required", 400, true);
  }

  const uploaded = await uploadImage(file, `ad-portfolio/${category}`);

  await insertItem({
    category,
    text,
    imgUrl: uploaded.url,
    imgPublicId: uploaded.publicId,
  });

  revalidateCategory(category);
};

export const updateItem = async (formData: FormData) => {
  await requireAdminSession();

  const id = String(formData.get("id") ?? "");
  const category = parseCategory(formData.get("category"));
  const text = String(formData.get("text") ?? "").trim();
  const file = formData.get("image");

  if (!id) {
    throw AppError.create("Missing item id", 400, true);
  }
  if (!text) {
    throw AppError.create("Text is required", 400, true);
  }

  const update: { text: string; imgUrl?: string; imgPublicId?: string } = {
    text,
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

  const id = String(formData.get("id") ?? "");
  const category = parseCategory(formData.get("category"));

  if (!id) {
    throw AppError.create("Missing item id", 400, true);
  }

  const deleted = await deleteItemById(id);
  if (deleted) {
    await deleteImage(deleted.imgPublicId);
  }

  revalidateCategory(category);
};
