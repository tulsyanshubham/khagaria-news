import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News Portal",
  description: "Stay updated with the latest stories and announcements.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
