import Link from "next/link";
import { CATEGORIES } from "@/types/app";
import LogoutButton from "../../../components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-8 grid gap-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <nav className="flex gap-4 flex-wrap">
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/admin/dashboard/${category}`}
              className="underline capitalize"
            >
              {category.replace("-", " ")}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </div>
      {children}
    </div>
  );
}
