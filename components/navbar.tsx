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
          <span className="text-xl font-black font-mono">Vivlio</span>
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <CustomUserButton />
          ) : (
            <>
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  Log In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-primary hover:bg-primary/90"
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
