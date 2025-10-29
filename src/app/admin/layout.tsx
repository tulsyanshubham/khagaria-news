"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.replace("/login");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.post("/api/auth/verify", { token });
                if (res.data.valid) {
                    setIsAuthorized(true);
                } else {
                    toast.error("Session expired. Please log in again.");
                    localStorage.removeItem("token");
                    router.replace("/login");
                }
            } catch (err) {
                toast.error("Session expired. Please log in again.");
                localStorage.removeItem("token");
                router.replace("/login");
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-16 h-16 animate-spin text-muted-foreground" />
            </div>
        );
    }

    if (!isAuthorized) return null;

    return (
        <div className="min-h-screen flex bg-background text-foreground">
            {/* Sidebar / Navbar can go here */}
            <main className="flex-1">{children}</main>
        </div>
    );
}
