import Nav from "./Nav";
import Image from "next/image";
export default function AppHeader() {
  return (
    <header className="w-full flex flex-col items-center justify-center gap-8 shadow p-4">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Image
          src="/icons/home.jpg"
          alt="Home"
          className="w-16 h-16 transition-all duration-200 object-cover justify-self-start rounded"
          width={64}
          height={64}
        />
        <h1 className="text-header text-4xl text-center">My Portfolio</h1>
        <span aria-hidden className="hidden sm:block" />
      </div>
      <Nav />
    </header>
  );
}
