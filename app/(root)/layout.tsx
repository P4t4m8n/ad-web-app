import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-[url('/icons/home.jpg')] bg-cover bg-center bg-fixed bg-no-repeat">
      {/* lightens the photo background so text stays readable on top of it */}
      <div className="absolute inset-0 bg-white/85" />
      <div className="relative flex min-h-screen flex-col">
        <AppHeader />
        <main className="w-full h-full flex-1 bg-linear-to-b ">
          {children}
        </main>
        <AppFooter />
      </div>
    </div>
  );
}
