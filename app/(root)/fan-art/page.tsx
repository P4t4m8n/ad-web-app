import Gird from "@/components/Gird";
import { getItemsByCategory } from "@/utils/items.server";

// avoid hitting the DB during the build's static generation step
export const dynamic = "force-dynamic";

export default async function FanArtPage() {
  const items = await getItemsByCategory("fan-art");

  return (
    <section>
      <Gird items={items} />
    </section>
  );
}
