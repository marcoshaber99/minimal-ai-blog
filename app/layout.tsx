import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Footer } from "@/components/footer";
import type React from "react"; // Added import for React

export const metadata: Metadata = {
  title: {
    template: "%s - Vivlio",
    absolute: "Vivlio",
  },
  description:
    "Vivlio is an open-source platform for developers to write articles, take part in discussions, and share their knowledge with the world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen py-8 sm:py-8 md:py-12">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                {children}
              </div>
            </main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
