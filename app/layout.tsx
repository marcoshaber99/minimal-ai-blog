import "./globals.css";
import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import { Footer } from "@/components/footer";
const customFont = localFont({
  src: "../public/fonts/gt-med.otf",
  variable: "--font-custom",
  display: "swap",
});

const customFontRegular = localFont({
  src: "../public/fonts/gt-reg.otf",
  variable: "--font-custom-regular",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${customFont.variable} ${customFontRegular.variable} font-sans antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen  py-8 font-mono">
              <div className="container mx-auto px-4 max-w-4xl">{children}</div>
            </main>{" "}
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
