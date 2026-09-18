import Link from "next/link";
import { CATEGORIES } from "@/types/app";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">CMS Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Pick a category to add, edit, or remove items.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              href={`/admin/dashboard/${category}`}
              className="group flex h-full flex-col justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="capitalize text-lg font-semibold text-zinc-900">
                {category.replace("-", " ")}
              </span>
              <span className="text-sm font-medium text-header transition-transform group-hover:translate-x-1">
                Manage &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
