"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/types/app";
import LogoutButton from "../../../components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-header" />
            <span className="font-semibold text-zinc-900">Portfolio CMS</span>
          </Link>

          <nav className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((category) => {
              const href = `/admin/dashboard/${category}`;
              const active = pathname === href;
              return (
                <Link
                  key={category}
                  href={href}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                    active
                      ? "bg-header text-white"
                      : "text-zinc-600 hover:bg-zinc-100"
                  }`}
                >
                  {category.replace("-", " ")}
                </Link>
              );
            })}
          </nav>

          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
