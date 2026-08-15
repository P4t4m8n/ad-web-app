"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { updateItem, deleteItem } from "@/actions/admin-actions";
import { TItem } from "@/types/app";

type FormState = { error: string };
const initialState: FormState = { error: "" };

export default function ItemRow({ item }: { item: TItem }) {
  const [editing, setEditing] = useState(false);

  const [updateState, updateAction, updatePending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      try {
        await updateItem(formData);
        setEditing(false);
        return { error: "" };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Failed to save item",
        };
      }
    },
    initialState,
  );

  const [deleteState, deleteAction, deletePending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      try {
        await deleteItem(formData);
        return { error: "" };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Failed to delete item",
        };
      }
    },
    initialState,
  );

  return (
    <li className="border p-4 rounded grid gap-2">
      <Image
        src={item.imgPath}
        alt={item.text}
        width={300}
        height={0}
        style={{ width: "100%", height: "auto" }}
      />

      {editing ? (
        <form action={updateAction} className="grid gap-2">
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="category" value={item.category} />
          <input
            name="text"
            defaultValue={item.text}
            required
            className="border p-2 rounded"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border p-2 rounded"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={updatePending}
              className="bg-mainOrange-700 text-mainWhite-0 hover:bg-mainOrange-800 rounded-base p-2 font-bold"
            >
              {updatePending ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
          {updateState.error && (
            <p className="text-red-600 text-sm">{updateState.error}</p>
          )}
        </form>
      ) : (
        <>
          <p>{item.text}</p>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="underline"
            >
              Edit
            </button>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="category" value={item.category} />
              <button
                type="submit"
                disabled={deletePending}
                className="text-red-600 underline"
              >
                {deletePending ? "Deleting..." : "Delete"}
              </button>
            </form>
          </div>
          {deleteState.error && (
            <p className="text-red-600 text-sm">{deleteState.error}</p>
          )}
        </>
      )}
    </li>
  );
}
