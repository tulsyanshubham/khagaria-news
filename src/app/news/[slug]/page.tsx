"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Loader2, Calendar, Share2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: string;
    slug: string;
}

export default function NewsDetailPage() {
    const { slug } = useParams();
    const [news, setNews] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) fetchNews();
    }, [slug]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/news/${slug}`);
            setNews(res.data.news);

            // fetch related news
            const rel = await axios.get(`/api/news?page=1&limit=3`);
        } catch (err) {
            console.error("Error fetching news:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (!news) return;
        const shareData = {
            title: news.title,
            text: news.content.slice(0, 100) + "...",
            url: window.location.href,
        };
        try {
            if (navigator.share) await navigator.share(shareData);
            else {
                await navigator.clipboard.writeText(window.location.href);
                alert("🔗 Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Share failed:", err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader2 className="animate-spin w-16 h-16 text-primary" />
            </div>
        );
    }

    if (!news) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-muted-foreground text-lg">News not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-background via-muted to-background text-foreground transition-colors duration-300 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 hover:text-primary"
                    onClick={() => (window.location.href = "/news")}
                >
                    <ArrowLeft className="w-4 h-4" /> Back to News
                </Button>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="overflow-hidden shadow-xl border-0 bg-card/80 dark:bg-muted/60 backdrop-blur-md py-2">
                        {/* Image / Video (16:9 responsive) */}
                        <div className="relative w-full aspect-video rounded-t-lg overflow-hidden bg-muted">
                            {news.youtubeVideoId ? (
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src={`https://www.youtube.com/embed/${news.youtubeVideoId}`}
                                    title={news.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : news.image ? (
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm italic bg-muted">
                                    Image not available
                                </div>
                            )}
                        </div>


                        {/* Content */}
                        <CardContent className="p-8">
                            <motion.h1
                                className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-blue-500 bg-clip-text text-transparent leading-snug"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {news.title}
                            </motion.h1>

                            <div className="flex items-center justify-between text-sm text-muted-foreground mt-3 border-b border-border pb-3">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(news.createdAt).toLocaleString("hi-IN", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleShare}
                                    className="hover:bg-primary hover:text-white transition"
                                >
                                    <Share2 className="w-4 h-4 mr-1" /> Share
                                </Button>
                            </div>

                            <motion.div
                                className="prose dark:prose-invert max-w-none mt-6 text-base md:text-lg leading-relaxed text-foreground/90"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {news.content.split("\n").map((para, i) => (
                                    <p key={i} className="mb-4">
                                        {para}
                                    </p>
                                ))}
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
