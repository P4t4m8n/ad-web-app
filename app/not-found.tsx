import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="">
      <Image src="/imgs/notFound.svg" alt="404" width={500} height={500} />
      <h1 className="text-mainGray-800">It looks like you got lost</h1>
      <Link href="/">Return to Home</Link>
    </div>
  );
}
