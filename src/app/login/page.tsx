"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.replace("/admin");
        }
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);

            toast.success("Login successful",{
                description: "Redirecting to dashboard...",
                duration: 2000,
            });
            router.push("/admin");
        } catch (error: any) {
            toast.error("Login failed", {
                description:
                    error?.response?.data?.message || "Invalid username or password",
                duration: 2500,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-background via-muted to-background">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-card dark:bg-muted/50 p-8 rounded-2xl shadow-lg"
            >
                <div className="flex flex-col items-center mb-6">
                    <Lock className="w-10 h-10 text-primary mb-2" />
                    <h1 className="text-2xl font-semibold">Admin Login</h1>
                    <p className="text-sm text-muted-foreground">Sign in to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Login"}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
}
