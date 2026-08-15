import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

// avoid hitting the DB during the build's static generation step
export const dynamic = "force-dynamic";

export default async function IllustrationPage() {
  const items = await getItemsByCategory("illustration");

  return <Gird items={items} />;
}
