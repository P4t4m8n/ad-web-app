import Link from "next/link";
import { CATEGORIES } from "@/types/app";

export default function DashboardPage() {
  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-bold">CMS Dashboard</h1>
      <p>Pick a category to add, edit, or remove items.</p>
      <ul className="grid gap-2">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              className="underline capitalize"
              href={`/admin/dashboard/${category}`}
            >
              {category.replace("-", " ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
