"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, Search, Newspaper } from "lucide-react";
import { debounce } from "lodash";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: string;
    slug: string;
}

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<NewsItem[]>([]);
    const [total, setTotal] = useState(0);
    const limit = 6;

    useEffect(() => {
        fetchNews();
    }, [page]);

    useEffect(() => {
        fetchNews(search);
    }, [page, search]);


    const fetchNews = async (query = "") => {
        setLoading(true);
        try {
            const url = query
                ? `/api/news/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
                : `/api/news?page=${page}&limit=${limit}`;
            const res = await axios.get(url);
            setNews(res.data.data || []);
            console.log("hello")
            setFiltered(res.data.data || []);
            setPage(res.data.page || 1);
            setTotal(res.data.totalPages || 0);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useMemo(
        () => debounce((val: string) => fetchNews(val), 800),
        [] // <-- no dependencies so it's stable
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearch(val);
        setPage(1);
        debouncedSearch(val);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-background to-muted text-foreground p-6 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
                    <div className="flex items-center gap-2">
                        <Newspaper className="w-6 h-6 text-primary" />
                        <h1 className="text-2xl md:text-3xl font-bold">Latest News</h1>
                    </div>
                    <div className="flex gap-2 w-full md:w-1/3">
                        <Input
                            type="text"
                            placeholder="Search news..."
                            value={search}
                            onChange={handleSearch}
                            className="dark:bg-muted bg-white"
                        />
                    </div>
                </div>

                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center items-center h-[50vh]">
                        <Loader2 className="animate-spin w-8 h-8 text-primary" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex justify-center items-center h-[50vh]">
                        <p className="text-gray-500 text-lg">No news available.</p>
                    </div>
                ) : (
                    <>
                        {/* Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className="overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card dark:bg-muted/60">
                                        {/* 🖼️ Image or Video */}
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        ) : item.youtubeVideoId ? (
                                            <iframe
                                                className="w-full h-48"
                                                src={`https://www.youtube.com/embed/${item.youtubeVideoId}`}
                                                title={item.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <div className="w-full h-48 bg-muted flex items-center justify-center text-gray-500 text-sm italic">
                                                Image not available
                                            </div>
                                        )}

                                        {/* 📰 Card Content */}
                                        <CardContent className="p-4 flex flex-col gap-2">
                                            <h2 className="font-semibold text-lg line-clamp-2">{item.title}</h2>
                                            <p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p>
                                            <p className="text-xs text-right text-muted-foreground mt-2">
                                                {new Date(item.createdAt).toLocaleString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                            <Button
                                                variant="link"
                                                className="text-primary font-medium w-fit mt-1 p-0"
                                                onClick={() => (window.location.href = `/news/${item.slug}`)}
                                            >
                                                Read More →
                                            </Button>
                                        </CardContent>
                                    </Card>

                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-8 gap-4">
                            <Button
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                ← Prev
                            </Button>
                            <span className="text-sm text-muted-foreground flex items-center">
                                Page {page} of {total || 1}
                            </span>
                            <Button
                                variant="outline"
                                disabled={page === total}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Next →
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
