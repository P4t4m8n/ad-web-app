import Link from "next/link";

export default function Nav() {

  const items = [
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
      icon: "/icons/fine-art.png",
      href: "/fine-art",
      text: "Fine Art",
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
    <nav className="w-full  ">
      <ul className="flex w-full items-center justify-between">
        <li className="relative group hidden md:block">
          <Link className="nav " href="https://artelldor.com/">
            <span
              className=" font-abrilFatface
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
              <span
                className=" font-abrilFatface
              text-black lg:text-lg  group-hover:text-black
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
