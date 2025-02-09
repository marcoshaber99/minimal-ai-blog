import { Navbar } from "@/components/navbar";
import type React from "react";
import { Footer } from "@/components/footer";
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-4xl px-4">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
