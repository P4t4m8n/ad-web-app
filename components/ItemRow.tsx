"use client";

import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import { updateItem, deleteItem } from "@/actions/admin-actions";
import { formatItemDetails, TItem } from "@/types/app";
import Modal from "./Modal";

type FormState = { error: string };
const initialState: FormState = { error: "" };

export default function ItemRow({ item }: { item: TItem }) {
  const [editing, setEditing] = useState(false);
  // defaults to the existing image; swaps to a local preview once a new file is picked
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const [updateState, updateAction, updatePending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      try {
        await updateItem(formData);
        setEditing(false);
        setPreview(null);
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
    <li className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full bg-zinc-50">
        <Image src={item.imgPath} alt={item.text} fill className="object-cover" />
      </div>

      <div className="grid gap-3 p-4">
        <p className="truncate text-sm text-zinc-700">{formatItemDetails(item)}</p>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-md px-2 py-1 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-header"
          >
            Edit
          </button>
          <form action={deleteAction}>
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="category" value={item.category} />
            <button
              type="submit"
              disabled={deletePending}
              className="rounded-md px-2 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
            >
              {deletePending ? "Deleting..." : "Delete"}
            </button>
          </form>
        </div>
        {deleteState.error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {deleteState.error}
          </p>
        )}
      </div>

      <Modal
        open={editing}
        onClose={() => {
          setEditing(false);
          setPreview(null);
        }}
        title="Edit item"
      >
        <form action={updateAction} className="grid gap-4">
          <input type="hidden" name="id" value={item.id} />
          <input type="hidden" name="category" value={item.category} />

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Description
            <input
              name="text"
              defaultValue={item.text}
              required
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-header focus:ring-2 focus:ring-header/20"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
              Width (cm)
              <input
                type="number"
                name="width"
                min="0"
                step="0.1"
                defaultValue={item.width || undefined}
                required
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-header focus:ring-2 focus:ring-header/20"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
              Height (cm)
              <input
                type="number"
                name="height"
                min="0"
                step="0.1"
                defaultValue={item.height || undefined}
                required
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-header focus:ring-2 focus:ring-header/20"
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Material
            <input
              name="material"
              defaultValue={item.material}
              required
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-header focus:ring-2 focus:ring-header/20"
            />
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Technique
            <input
              name="technique"
              defaultValue={item.technique}
              required
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-header focus:ring-2 focus:ring-header/20"
            />
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Image
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
              className="rounded-lg border border-zinc-200 bg-zinc-50 text-sm text-zinc-500 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-200 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-300"
            />
          </label>

          <div className="relative h-40 w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
            {preview ? (
              // blob: URLs can't go through next/image's optimizer, so a plain <img> is used here
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Selected image preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <Image src={item.imgPath} alt={item.text} fill className="object-contain" />
            )}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={updatePending}
              className="flex-1 rounded-lg bg-header py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {updatePending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setPreview(null);
              }}
              className="rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-50"
            >
              Cancel
            </button>
          </div>
          {updateState.error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {updateState.error}
            </p>
          )}
        </form>
      </Modal>
    </li>
  );
}
