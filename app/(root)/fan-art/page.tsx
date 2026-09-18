import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

export default async function FanArtPage() {
  const items = await getItemsByCategory("fan-art");

  return <Gird items={items} />;
}
