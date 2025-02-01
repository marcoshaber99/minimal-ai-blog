import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  user: User | null;
}

export function Hero({ user }: HeroProps) {
  return (
    <div className="relative">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[300px] w-[400px] rounded-full bg-gradient-to-br from-orange-400 via-green-200 to-blue-500 opacity-20 blur-[100px]" />
      </div>

      <div className="container relative">
        {/* Announcement banner */}
        <div className="mx-auto mb-8 sm:mb-12 flex max-w-fit items-center gap-x-2 rounded-full border border-foreground/10 bg-muted/50 px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm backdrop-blur transition-all hover:border-purple-500 hover:bg-muted/50 dark:border-foreground/20 dark:hover:border-purple-500 dark:bg-muted/60">
          <p className="text-xs sm:text-sm font-semibold">
            Vivlio 1.0 is now released! 🎉
          </p>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-bold text-4xl tracking-tight sm:text-6xl">
            Don&apos;t Memorize,{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500 animated-underline">
                Understand
              </span>
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A developer-focused, educational blog platform designed to help you
            grasp complex concepts and share knowledge effectively.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            {user ? (
              <Link href="/discover">
                <Button
                  size="lg"
                  className="gap-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Start Reading
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="gap-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
