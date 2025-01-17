import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <nav className="shadow-sm">
      <div className="container mx-auto px-4 max-w-4xl py-4 flex justify-between items-center ">
        <Link href="/" className="text-xl font-bold">
          My Blog
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
