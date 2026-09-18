import Link from "next/link";
import Nav from "./Nav";
import Image from "next/image";
export default function AppHeader() {
  return (
    <header className="w-full flex flex-col items-center justify-center gap-8 shadow p-4">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
        <Link className="nav " href="https://artelldor.com/">
          <Image
            src="/icons/home.jpg"
            alt="Home"
            className="min-w-12 w-12 md:w-20 h-12 md:h-20 transition-all duration-200 object-cover justify-self-start rounded"
            width={64}
            height={64}
          />
        </Link>

        <h1 className="text-header text-4xl text-center">My Portfolio</h1>
        <span aria-hidden className="hidden sm:block" />
      </div>
      <Nav />
    </header>
  );
}
