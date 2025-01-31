import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CustomUserButton from "./user-button";

import { currentUser } from "@clerk/nextjs/server";

export async function Navbar() {
  const user = await currentUser();

  return (
    <nav className="shadow-sm">
      <div className="container mx-auto px-4 max-w-4xl py-4 flex justify-between items-center ">
        <Link
          href={user ? "/discover" : "/"}
          className="flex items-center gap-1"
        >
          <Image
            src="/assets/new-logo.svg"
            alt="Vivlio Logo"
            width={40}
            height={40}
            priority
          />

          <span className="font-bold text-2xl  transition-colors">Vivlio</span>
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <>
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
        </div>
      </div>
    </nav>
  );
}
