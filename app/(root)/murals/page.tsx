import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

// avoid hitting the DB during the build's static generation step
export const dynamic = "force-dynamic";

export default async function MuralsPage() {
  const items = await getItemsByCategory("murals");

  return <Gird items={items} />;
}
