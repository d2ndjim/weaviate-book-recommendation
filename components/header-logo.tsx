import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center flex lg:flex">
        <Image src="/weaviate.png" alt="Logo" width={50} height={50} />
        <p className="font-bold text-[#020817] text-2xl ml-2.5">Bookly</p>
      </div>
    </Link>
  );
};
