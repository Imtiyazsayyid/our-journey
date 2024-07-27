import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/context/GlobalProvider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "OurJourney",
  description: "The Journey of Imtiyaz And Aditi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-dark-300 font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Toaster />
          <GlobalProvider>{children}</GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
