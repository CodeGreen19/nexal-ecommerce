import Image from "next/image";
import Link from "next/link";

export function Logo({ href }: { href?: string }) {
  return (
    <div>
      <Link href={href || "/"}>
        <Image
          height={40}
          width={120}
          alt="main-logo"
          src={"/logo/logo-sized-removebg.png"}
        />
      </Link>
    </div>
  );
}
