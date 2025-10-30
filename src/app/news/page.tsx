// page.tsx
"use client";

import { useEffect, useMemo } from "react";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, Newspaper, NotebookText } from "lucide-react";
import { debounce } from "lodash";
import NewsCards from "@/components/NewsCards";
import {
    newsAtom,
    setNewsAtom,
    filteredNewsAtom,
    loadingAtom,
    pageAtom,
    searchAtom,
    totalPagesAtom,
    totalItemsAtom,
    updatePaginationCacheAtom,
    getFromCacheAtom,
    generateCacheKey,
    type NewsItem
} from "../stores/newsStore";

export default function NewsPage() {
    const [newsState] = useAtom(newsAtom);
    const [filtered] = useAtom(filteredNewsAtom);
    const [loading] = useAtom(loadingAtom);
    const [page] = useAtom(pageAtom);
    const [search] = useAtom(searchAtom);
    const [total] = useAtom(totalPagesAtom);
    const [totalItems] = useAtom(totalItemsAtom);

    const setNews = useSetAtom(setNewsAtom);
    const updateCache = useSetAtom(updatePaginationCacheAtom);
    const [getFromCache] = useAtom(getFromCacheAtom);

    const limit = 6;

    useEffect(() => {
        fetchNews();
    }, [page, search]);

    const fetchNews = async (query = search) => {
        const cacheKey = generateCacheKey(page, query, limit);
        const cached = getFromCache(cacheKey);

        if (cached) {
            // Use cached data
            setNews({
                news: cached.data,
                filtered: cached.data,
                total: cached.totalPages,
                totalItems: cached.totalItems,
                loading: false
            });
            return;
        }

        // Fetch from API if not in cache
        setNews({ loading: true });
        try {
            const url = query
                ? `/api/news/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
                : `/api/news?page=${page}&limit=${limit}`;
            const res = await axios.get(url);
            const newsData = res.data.data || [];

            // Update cache
            updateCache({
                key: cacheKey,
                data: newsData,
                totalPages: res.data.totalPages || 0,
                totalItems: res.data.totalItems || 0,
            });

            // Update state
            setNews({
                news: newsData,
                filtered: newsData,
                total: res.data.totalPages || 0,
                totalItems: res.data.totalItems || 0,
                loading: false
            });
        } catch (err) {
            console.error(err);
            setNews({ loading: false });
        }
    };

    const debouncedSearch = useMemo(
        () => debounce((val: string) => {
            setNews({ page: 1, search: val });
        }, 800),
        []
    );

    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNews({ search: val });
        debouncedSearch(val);
    };

    const handleReset = () => {
        setNews({ search: "", page: 1 });
    };

    const handlePageChange = (newPage: number) => {
        setNews({ page: newPage });
    };

    return (
        <div className="pt-16 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <Newspaper className="w-6 h-6 text-primary" />
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                    Latest News
                                </h1>
                            </div>
                            <p className="text-lg text-muted-foreground max-w-2xl">
                                Stay updated with the latest stories, technology breakthroughs, and trending updates.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Badge variant="secondary" className="px-3 py-1 text-sm">
                                    {totalItems} Total Articles
                                </Badge>
                                {search && (
                                    <Badge variant="outline" className="px-3 py-1 text-sm">
                                        Searching: "{search}"
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {/* Search Section */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                            <div className="relative w-full lg:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    type="text"
                                    placeholder="Search news articles..."
                                    value={search}
                                    onChange={handleSearch}
                                    className="pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-border/50 focus:border-primary transition-all duration-300"
                                />
                            </div>
                            {search && (
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                    className="whitespace-nowrap"
                                >
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Content Section */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex justify-center items-center h-96"
                        >
                            <div className="text-center space-y-4">
                                <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
                                <p className="text-muted-foreground font-medium">Loading articles...</p>
                            </div>
                        </motion.div>
                    ) : filtered.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="max-w-md mx-auto space-y-4">
                                <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                                    <Newspaper className="w-10 h-10 text-muted-foreground" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground">
                                    {search ? "No results found" : "No articles available"}
                                </h3>
                                <p className="text-muted-foreground">
                                    {search
                                        ? `No articles found for "${search}". Try different keywords.`
                                        : "Check back later for new updates and stories."
                                    }
                                </p>
                                {search && (
                                    <Button onClick={handleReset} variant="outline" className="mt-4">
                                        Clear Search
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Results Info */}
                            <div className="flex justify-between items-center mb-8">
                                <p className="text-sm text-muted-foreground">
                                    Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                                    {search && ` for "${search}"`}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <NotebookText className="w-4 h-4" />
                                    Page {page} of {total}
                                </div>
                            </div>

                            {/* News Grid */}
                            <NewsCards data={filtered} />

                            {/* Pagination */}
                            {total > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border/50"
                                >
                                    <p className="text-sm text-muted-foreground">
                                        Showing page {page} of {total}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={page === 1}
                                            onClick={() => {
                                                handlePageChange(Math.max(1, page - 1));
                                                setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 100);
                                            }}
                                            className="flex items-center gap-2 disabled:opacity-50 transition-all duration-200"
                                        >
                                            ← Previous
                                        </Button>

                                        <div className="flex items-center gap-1 mx-4">
                                            {Array.from({ length: Math.min(5, total) }, (_, i) => {
                                                const pageNum = i + 1;
                                                return (
                                                    <Button
                                                        key={pageNum}
                                                        variant={page === pageNum ? "default" : "outline"}
                                                        size="sm"
                                                        onClick={() => {
                                                            handlePageChange(pageNum);
                                                            setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 100);
                                                        }}
                                                        className={`w-8 h-8 p-0 text-xs transition-all duration-200 ${page === pageNum
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'hover:bg-muted'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </Button>
                                                );
                                            })}
                                            {total > 5 && (
                                                <span className="text-sm text-muted-foreground mx-1">...</span>
                                            )}
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={page === total}
                                            onClick={() => {
                                                handlePageChange(Math.min(total, page + 1));
                                                setTimeout(() => scrollTo({ top: 0, behavior: 'smooth' }), 100);
                                            }}
                                            className="flex items-center gap-2 disabled:opacity-50 transition-all duration-200"
                                        >
                                            Next →
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}