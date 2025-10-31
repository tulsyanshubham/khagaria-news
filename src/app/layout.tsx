"use client";

import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Toaster } from "@/components/ui/sonner"
import ClientLayout from "@/components/ClientLayout";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientLayout>
            {children}
            <Footer />
          </ClientLayout>
          <DarkModeToggle />
        </ThemeProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
