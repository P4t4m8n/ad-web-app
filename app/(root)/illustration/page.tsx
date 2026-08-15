import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

export default async function IllustrationPage() {
  const items = await getItemsByCategory("illustration");

  return <Gird items={items} />;
}
