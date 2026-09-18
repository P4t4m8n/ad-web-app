"use client";

import { useActionState, useEffect, useState } from "react";
import { createItem } from "@/actions/admin-actions";
import { TCategory } from "@/types/app";
import Modal from "./Modal";

type FormState = { error: string };
const initialState: FormState = { error: "" };

export default function ItemForm({ category }: { category: TCategory }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  // release the object URL once it's no longer shown, to avoid leaking memory
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const [state, formAction, pending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      try {
        await createItem(formData);
        setOpen(false);
        setPreview(null);
        return { error: "" };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Failed to add item",
        };
      }
    },
    initialState,
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-full bg-header px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
      >
        <span className="text-base leading-none">+</span> Add item
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add item">
        <form
          action={formAction}
          key={state.error ? "error" : "ok"}
          className="grid gap-4"
        >
          <input type="hidden" name="category" value={category} />

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Description
            <input
              name="text"
              placeholder="A short description"
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
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-header focus:ring-2 focus:ring-header/20"
              />
            </label>
          </div>

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Material
            <input
              name="material"
              placeholder="e.g. Acrylic on canvas"
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-header focus:ring-2 focus:ring-header/20"
            />
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Technique
            <input
              name="technique"
              placeholder="e.g. Oil painting"
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition-colors focus:border-header focus:ring-2 focus:ring-header/20"
            />
          </label>

          <label className="grid gap-1.5 text-sm font-medium text-zinc-700">
            Image
            <input
              type="file"
              name="image"
              accept="image/*"
              required
              onChange={(e) => {
                const file = e.target.files?.[0];
                setPreview(file ? URL.createObjectURL(file) : null);
              }}
              className="rounded-lg border border-zinc-200 bg-zinc-50 text-sm text-zinc-500 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-200 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-300"
            />
          </label>

          {preview && (
            <div className="relative h-40 w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
              {/* blob: URLs can't go through next/image's optimizer, so a plain <img> is used here */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Selected image preview"
                className="h-full w-full object-contain"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-header py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Uploading..." : "Add item"}
          </button>
          {state.error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {state.error}
            </p>
          )}
        </form>
      </Modal>
    </>
  );
}
