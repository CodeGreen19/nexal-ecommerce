import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <div>
      <Link href={"/"}>
        <Image
          height={90}
          width={90}
          alt="main-logo"
          src={"/logo/logo-sized-removebg.png"}
        />
      </Link>
    </div>
  );
}
