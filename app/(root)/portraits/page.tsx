import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

// avoid hitting the DB during the build's static generation step
export const dynamic = "force-dynamic";

export default async function PortraitsPage() {
  const items = await getItemsByCategory("portraits");

  return <Gird items={items} />;
}
