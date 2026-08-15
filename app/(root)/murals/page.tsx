import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

export default async function MuralsPage() {
  const items = await getItemsByCategory("murals");

  return <Gird items={items} />;
}
