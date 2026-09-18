import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

export default async function NoseArtPage() {
  const items = await getItemsByCategory("nose-art");

  return <Gird items={items} />;
}
