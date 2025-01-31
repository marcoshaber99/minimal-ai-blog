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
      <div className="absolute inset-0 -z-10 h-full w-full ">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[300px] w-[300px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      <div className="container relative">
        {/* Announcement banner */}
        <div className="mx-auto mb-12 flex max-w-fit items-center gap-x-2 rounded-full border bg-background px-7 py-2 shadow-md backdrop-blur transition-all hover:border-foreground/20 hover:bg-muted">
          <p className="text-sm font-semibold">
            Vivlio 1.0 is now released! 🎉
          </p>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-bold text-4xl tracking-tight sm:text-6xl">
            Don&apos;t Memorize,{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-600">
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
                <Button size="lg" className="gap-2 text-white">
                  Start Reading
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <Button size="lg" className="gap-2 text-white">
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
