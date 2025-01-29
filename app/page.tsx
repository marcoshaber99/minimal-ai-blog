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
      <section className="relative py-10 md:py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-8 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-custom tracking-tight">
                Don&apos;t Memorize,{" "}
                <span className="block mt-3 dark:text-[#ffcf0f] text-[#5b5bfe] italic">
                  Understand.
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                A developer-focused, educational blog platform.
              </p>
              <div className="flex gap-4">
                {user ? (
                  <Link href="/discover">
                    <Button
                      size="lg"
                      className="bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
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
            <div className="hidden sm:block relative w-full">
              <Image
                src="/assets/new-logo.svg"
                alt="Logo"
                width={330}
                height={330}
                className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[330px] h-auto ml-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
