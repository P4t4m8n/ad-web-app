"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const items = [
    {
      icon: "/icons/illustration.png",
      href: "/illustration",
      text: "illustration",
    },
    {
      icon: "/icons/fan.png",
      href: "/fan-art",
      text: "Fan Art",
    },
    {
      icon: "/icons/nose.png",
      href: "/nose-art",
      text: "Nose Art",
    },

    {
      icon: "/icons/portraits.png",
      href: "/portraits",
      text: "Portraits",
    },
    // {
    //   icon: "/icons/portraits.png",
    //   href: "/portraits",
    //   text: "Portraits",
    // },
  ];

  return (
    <nav className="w-full flex items-center justify-center ">
      <ul className="flex w-full items-center content-center justify-center gap-32 flex-wrap">
        <li className="relative group">
          <Link className="nav relative" href="https://artelldor.com/">
            {/* <Image
              src="/icons/home.jpg"
              alt=""
              className="w-20 h-20 transition-all duration-200 object-cover 
                  "
              width={64}
              height={64}
            /> */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-abrilFatface
            text-black   group-hover:text-header 
            text-center whitespace-nowrap "
            >
              Home
            </span>
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.href} className="relative group ">
            <Link className=" relative  " href={item.href}>
              {/* <Image
                src={item.icon}
                alt=""
                className={`w-20 h-20 transition-all duration-200 object-cover ${
                  pathname === item.href ? "" : "filter"
                }`}
                width={256}
                height={256}
              /> */}
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-abrilFatface
              text-black text-lg  group-hover:text-black
              text-center whitespace-nowrap "
              >
                {item.text}
              </span>
            </Link>
          </li>
        ))}
      
      </ul>
    </nav>
  );
}
