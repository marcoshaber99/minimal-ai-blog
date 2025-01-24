import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CustomUserButton from "./user-button";

import { currentUser } from "@clerk/nextjs/server";

export async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="shadow-sm">
      <div className="container mx-auto px-4 max-w-4xl py-4 flex justify-between items-center ">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo-new-dark.svg"
            alt="Blog Logo"
            width={32}
            height={32}
            className="w-8 h-8"
            priority
          />
          <span className="text-xl font-black font-mono">Vivlio</span>
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/create">
                <Button
                  size="sm"
                  className="font-semibold dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Create Post
                </Button>
              </Link>
              <CustomUserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="default"
                  size="sm"
                  className="font-semibold dark:text-white  dark:hover:bg-blue-700"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
