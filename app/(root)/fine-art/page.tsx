import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

export default async function FineArtPage() {
  const items = await getItemsByCategory("fine-art");

  return <Gird items={items} />;
}
