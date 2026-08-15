"use client";

import { useActionState } from "react";
import { createItem } from "@/actions/admin-actions";
import { TCategory } from "@/types/app";

type FormState = { error: string };
const initialState: FormState = { error: "" };

export default function ItemForm({ category }: { category: TCategory }) {
  const [state, formAction, pending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      try {
        await createItem(formData);
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
    <form
      action={formAction}
      key={state.error ? "error" : "ok"}
      className="grid gap-2 max-w-sm border-b pb-6"
    >
      <input type="hidden" name="category" value={category} />
      <input
        name="text"
        placeholder="Description"
        required
        className="border p-2 rounded"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={pending}
        className="bg-mainOrange-700 text-mainWhite-0 hover:bg-mainOrange-800 rounded-base p-2 font-bold"
      >
        {pending ? "Uploading..." : "Add item"}
      </button>
      {state.error && <p className="text-red-600 text-sm">{state.error}</p>}
    </form>
  );
}
