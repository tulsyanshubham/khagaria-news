"use client";
import { cn } from "@/lib/utils";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react"; 
import { usePathname } from "next/navigation"; // Add this back

export default function Navbar() {
    const pathname = usePathname(); // Use usePathname hook instead
    const [isScrolled, setIsScrolled] = useState(false); 

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); 

    const navItems = [
        { name: "Home", href: "/" },
        { name: "All News", href: "/news" },
    ];

    return (
        <nav 
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-200", 
                isScrolled 
                    ? "border-b border-white/10 backdrop-blur-md bg-linear-gradient-to-r from-primary/10 via-background/60 to-primary/10 shadow-lg" 
                    : "bg-transparent p-2" 
            )}
        >
            <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-4">

                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold text-primary hover:text-primary/80 transition-colors"
                >
                    <Newspaper className="w-6 h-6" />
                    <span>Khagaria News 18</span>
                </Link>

                {/* Navigation Links */}
                <div className="flex gap-6">
                    {navItems.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative text-lg font-medium transition-colors duration-300 hover:text-primary",
                                    active ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                {item.name}
                                {/* Animated underline */}
                                <span
                                    className={cn(
                                        "absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-primary transition-all duration-300",
                                        active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                                    )}
                                ></span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}