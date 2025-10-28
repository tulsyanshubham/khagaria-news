"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Hide Navbar on /login and /admin pages
    const hideNavbar = pathname.startsWith("/login") || pathname.startsWith("/admin");

    return (
        <>
            {!hideNavbar && <Navbar />}
            {children}
        </>
    );
}
