import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      <main className="w-full h-full bg-linear-to-b ">{children}</main>
      <AppFooter />
    </>
  );
}
