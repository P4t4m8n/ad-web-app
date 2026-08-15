import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

export default async function PortraitsPage() {
  const items = await getItemsByCategory("portraits");

  return <Gird items={items} />;
}
