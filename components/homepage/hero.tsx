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
    <div className="relative w-full">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[400px] rounded-full bg-gradient-to-br from-emerald-600 via-green-300 to-emerald-800 opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Announcement banner */}
        <div className="mx-auto mb-8 sm:mb-12 flex max-w-fit items-center gap-x-2 rounded-full border border-foreground/10 bg-muted/50 px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm backdrop-blur transition-all hover:border-emerald-500 hover:bg-muted/50 dark:border-foreground/20 dark:hover:border-emerald-500 dark:bg-muted/60">
          <p className="text-xs sm:text-sm font-semibold">
            Vivlio 1.0 is now released! 🎉
          </p>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
            Write{" "}
            <span className="relative">
              <span className="relative z-10">technical blogs</span>
              <span className="absolute inset-0 bg-green-200/60 dark:bg-emerald-500/30 -rotate-[0.2deg] rounded-lg" />
            </span>{" "}
            that developers love
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
                  className="gap-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                >
                  Start Reading
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="gap-2 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
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
