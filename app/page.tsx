import Link from "next/link";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-serif tracking-tight">
                Don&apos;t imitate,{" "}
                <span className="dark:text-[#ffcf0f] text-[#5b5bfe] italic">
                  understand
                </span>
                .
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                A place to read, write, and deepen your understanding
              </p>
              <div className="flex gap-4">
                {user ? (
                  <Link href="/discover">
                    <Button
                      size="lg"
                      className="font-semibold bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      Start Reading
                    </Button>
                  </Link>
                ) : (
                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      className="font-semibold bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    >
                      Get Started
                    </Button>
                  </SignInButton>
                )}
              </div>
            </div>
            <div className="hidden md:block relative w-full">
              <Image
                src="/assets/new-logo.svg"
                alt="Illustration"
                width={350}
                height={350}
                className="ml-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
