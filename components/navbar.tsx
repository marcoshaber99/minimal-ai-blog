"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import CustomUserButton from "./user-button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { user, isLoaded } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="shadow-sm">
      <div className="container mx-auto max-w-4xl py-4 flex justify-between items-center">
        <Link
          href={user ? "/discover" : "/"}
          className="flex items-center gap-1 sm:gap-2"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <Image
              src="/assets/new-logo.svg"
              alt="Vivlio Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-xl sm:text-2xl transition-colors">
            Vivlio
          </span>
        </Link>

        {isLoaded && (
          <>
            {user ? (
              <CustomUserButton />
            ) : (
              <>
                {/* Hamburger menu for mobile */}
                <div className="md:hidden">
                  <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    {isMenuOpen ? (
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    ) : (
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                  </Button>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center gap-2">
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="sm" className="font-semibold">
                      Log In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      size="sm"
                      className="font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Mobile menu for non-logged-in users */}
      {!user && isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                size="sm"
                className="w-full font-semibold"
              >
                Log In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                size="sm"
                className="w-full font-semibold text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </div>
      )}
    </nav>
  );
}
