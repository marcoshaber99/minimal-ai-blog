"use client";

import { SignIn } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
export default function SignInPage() {
  const { theme } = useTheme();

  return (
    <main className="flex h-screen w-screen items-center justify-center p-3">
      <SignIn appearance={{ baseTheme: theme === "dark" ? dark : undefined }} />
    </main>
  );
}
