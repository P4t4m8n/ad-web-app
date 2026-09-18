import { notFound } from "next/navigation";
import { CATEGORIES, TCategory } from "@/types/app";
import { getItemsByCategory } from "@/utils/items.server";
import ItemForm from "../../../../components/ItemForm";
import ItemRow from "../../../../components/ItemRow";

export default async function CategoryDashboardPage({
  params,
}: {
  params: Promise<{ category: TCategory }>;
}) {
  const { category } = await params;

  // Category must be valid
  if (!CATEGORIES.includes(category as TCategory)) {
    notFound();
  }

  const items = await getItemsByCategory(category);

  return (
    <div className="grid gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold capitalize text-zinc-900">
          {category.replace("-", " ")}
        </h1>
        <ItemForm category={category} />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
