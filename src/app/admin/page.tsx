"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit3, Newspaper, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
    const router = useRouter();
    const [totalNews, setTotalNews] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTotalNews = async () => {
            try {
                const res = await axios.get("/api/news/count");
                if (res.data.success) {
                    setTotalNews(res.data.total);
                }
            } catch (error) {
                console.error("Error fetching total news count:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTotalNews();
    }, []);

    return (
        <div className="flex flex-col items-center justify-between min-h-screen px-4 py-6 md:py-10 bg-linear-to-br from-background via-muted/30 to-background">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center space-y-1"
            >
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                    Manage and monitor your news content.
                </p>
            </motion.div>

            {/* Total News Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl border-none rounded-2xl">
                    <CardContent className="flex items-center justify-between p-8">
                        {loading ? (
                            <div className="flex items-center justify-center w-full">
                                <Loader2 className="w-10 h-10 animate-spin text-white opacity-80" />
                            </div>
                        ) : (
                            <>
                                <div>
                                    <p className="text-base uppercase tracking-wide opacity-90">
                                        Total News Articles
                                    </p>
                                    <h2 className="text-5xl font-extrabold mt-2">
                                        {totalNews ?? 0}
                                    </h2>
                                </div>
                                <Newspaper className="w-16 h-16 opacity-90" />
                            </>
                        )}
                    </CardContent>
                </Card>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
                {/* Create News */}
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center justify-center rounded-2xl border bg-card dark:bg-muted/40 p-6 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => router.push("/admin/news/add")}
                >
                    <PlusCircle className="w-12 h-12 text-green-600 dark:text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Create News</h3>
                    <Button
                        size="lg"
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-base"
                    >
                        Add New
                    </Button>
                </motion.div>

                {/* Manage News */}
                <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center justify-center rounded-2xl border bg-card dark:bg-muted/40 p-6 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => router.push("/admin/news/manage")}
                >
                    <Edit3 className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Manage News</h3>
                    <Button
                        size="lg"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base"
                    >
                        Open
                    </Button>
                </motion.div>
            </div>

            {/* Footer */}
            <p className="text-xs md:text-sm text-muted-foreground text-center mt-4 opacity-80">
                © {new Date().getFullYear()} News Portal Admin
            </p>
        </div>
    );
}
