import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <nav className="shadow-sm">
      <div className="container mx-auto px-4 max-w-4xl py-4 flex justify-between items-center ">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/logo-light-theme.svg"
            alt="Blog Logo"
            width={32}
            height={32}
            className="w-8 h-8 dark:hidden"
            priority
          />
          <Image
            src="/assets/logo-dark-theme.svg"
            alt="Blog Logo"
            width={32}
            height={32}
            className="w-8 h-8 hidden dark:block"
            priority
          />
          <span className="text-xl font-black font-mono">Minds</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
