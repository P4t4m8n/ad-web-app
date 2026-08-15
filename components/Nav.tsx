"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const items = [
    {
      icon: "/icons/fan.png",
      href: "/fan-art",
      text: "Nose Art",
    },
    {
      icon: "/icons/nose.png",
      href: "/murals",
      text: "Fine Art",
    },
    {
      icon: "/icons/illustration.png",
      href: "/illustration",
      text: "Illustration",
    },
    // {
    //   icon: "/icons/portraits.png",
    //   href: "/portraits",
    //   text: "Portraits",
    // },
    // {
    //   icon: "/icons/portraits.png",
    //   href: "/portraits",
    //   text: "Portraits",
    // },
  ];

  return (
    <nav className="w-full flex items-center justify-center ">
      <ul className="flex w-full items-center content-center justify-center gap-4 flex-wrap">
        <li className="relative group">
          <Link className="nav relative" href="https://artelldor.com/">
            <Image
              src="/icons/home.jpg"
              alt=""
              className="w-20 h-20 transition-all duration-200 object-cover 
                  "
              width={64}
              height={64}
            />
          </Link>
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-abrilFatface
                            text-white md:text-shadow-[0px_0px_3px_black] group-hover:text-black
                             text-center whitespace-nowrap pointer-events-none"
          >
            Home
          </span>
        </li>
        {items.map((item) => (
          <li key={item.href} className="relative group ">
            <Link className=" relative  " href={item.href}>
              <Image
                src={item.icon}
                alt=""
                className={`w-20 h-20 transition-all duration-200 object-cover ${
                  pathname === item.href ? "" : "filter"
                }`}
                width={256}
                height={256}
              />
            </Link>
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-abrilFatface
                            text-white text-sm md:text-shadow-[0px_0px_3px_black] group-hover:text-black
                             text-center whitespace-nowrap pointer-events-none"
            >
              {item.text}
            </span>
          </li>
        ))}
        <li key="admin" className="relative group ">
          <Link className=" relative  " href="/admin">
            <Image
              src="/icons/admin.png"
              alt=""
              className={`w-20 h-20 transition-all duration-200 object-cover ${
                pathname === "/admin" ? "" : "filter"
              }`}
              width={256}
              height={256}
            />
          </Link>
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-abrilFatface
                            text-white text-sm md:text-shadow-[0px_0px_3px_black] group-hover:text-black
                             text-center whitespace-nowrap pointer-events-none"
          >
            Admin
          </span>
        </li>
      </ul>
    </nav>
  );
}
