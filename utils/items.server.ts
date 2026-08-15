import { ObjectId } from "mongodb";
import { getDb } from "@/utils/mongodb.server";
import { TItem, TCategory } from "@/types/app";

const COLLECTION = "items";

type TItemDocument = {
  _id: ObjectId;
  category: TCategory;
  text: string;
  imgUrl: string;
  imgPublicId: string;
  createdAt: Date;
};

const toItem = (doc: TItemDocument): TItem => {
  return {
    id: doc._id.toString(),
    text: doc.text,
    imgPath: doc.imgUrl,
    imgId: doc.imgPublicId,
    category: doc.category,
  };
};

export const getItemsByCategory = async (
  category: TCategory,
): Promise<TItem[]> => {
  const db = await getDb();
  const docs = await db
    .collection<TItemDocument>(COLLECTION)
    .find({ category })
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map(toItem);
};

export const insertItem = async (data: {
  category: TCategory;
  text: string;
  imgUrl: string;
  imgPublicId: string;
}): Promise<TItem> => {
  const db = await getDb();
  const doc: TItemDocument = {
    _id: new ObjectId(),
    ...data,
    createdAt: new Date(),
  };
  await db.collection<TItemDocument>(COLLECTION).insertOne(doc);
  return toItem(doc);
};

export const updateItemById = async (
  id: string,
  data: Partial<Pick<TItemDocument, "text" | "imgUrl" | "imgPublicId">>,
): Promise<void> => {
  const db = await getDb();
  await db
    .collection<TItemDocument>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: data });
};

export const getItemById = async (
  id: string,
): Promise<TItemDocument | null> => {
  const db = await getDb();
  return db.collection<TItemDocument>(COLLECTION).findOne({
    _id: new ObjectId(id),
  });
};

export const deleteItemById = async (
  id: string,
): Promise<TItemDocument | null> => {
  const db = await getDb();
  return db
    .collection<TItemDocument>(COLLECTION)
    .findOneAndDelete({ _id: new ObjectId(id) });
};
