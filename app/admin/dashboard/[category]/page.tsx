import { notFound } from "next/navigation";
import { CATEGORIES, TCategory } from "@/types/app";
import { getItemsByCategory } from "@/utils/items.server";
import ItemForm from "../../../../components/ItemForm";
import ItemRow from "../../../../components/ItemRow";

export default async function CategoryDashboardPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!CATEGORIES.includes(category as TCategory)) {
    notFound();
  }

  const validCategory = category as TCategory;
  const items = await getItemsByCategory(validCategory);

  return (
    <div className="grid gap-8">
      <h1 className="text-xl font-bold capitalize">
        {validCategory.replace("-", " ")}
      </h1>

      <ItemForm category={validCategory} />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}
