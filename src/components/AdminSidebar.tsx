"use client";

import { Home, FilePlus2, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const links = [
        { href: "/admin", label: "Dashboard", icon: Home },
        { href: "/admin/news", label: "Manage News", icon: FilePlus2 },
    ];

    return (
        <div className="h-screen w-60 bg-card dark:bg-muted/50 border-r border-border flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-bold text-center py-4 border-b border-border">Admin Panel</h2>
                <nav className="mt-4 space-y-1">
                    {links.map(({ href, label, icon: Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-lg transition-all duration-200 ${pathname === href
                                    ? "bg-primary text-white"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>

            <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-muted/40 transition-all duration-200"
            >
                <LogOut className="w-5 h-5" />
                Logout
            </button>
        </div>
    );
}
