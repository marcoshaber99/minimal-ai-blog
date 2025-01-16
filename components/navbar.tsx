import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 max-w-4xl py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 hover:text-gray-600"
        >
          My Blog
        </Link>
        <Link href="/create">
          <Button>Create New Post</Button>
        </Link>
      </div>
    </nav>
  );
}
