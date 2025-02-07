import { Navbar } from "@/components/navbar";
import type React from "react";
import { Footer } from "@/components/footer";
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-8">
        <div className="container mx-auto max-w-4xl px-4">{children}</div>
        <Footer />
      </main>
    </>
  );
}
