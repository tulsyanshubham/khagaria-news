"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, Calendar, Share2, ArrowLeft, Clock, Eye, Bookmark, BookmarkCheck, Play, User, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface NewsItem {
    _id: string;
    title: string;
    content: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: string;
    slug: string;
}

interface RelatedNewsItem {
    _id: string;
    title: string;
    slug: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: string;
}

export default function NewsDetailPage() {
    const { slug } = useParams();
    const [news, setNews] = useState<NewsItem | null>(null);
    const [relatedNews, setRelatedNews] = useState<RelatedNewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [hoveredVideo, setHoveredVideo] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (slug) fetchNews();
    }, [slug]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/news/slug/${slug}`);
            setNews(res.data.news);

            // Fetch related news
            const rel = await axios.get(`/api/news?page=1&limit=4`);
            setRelatedNews(rel.data.data || []);

            // Check if bookmarked
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            setIsBookmarked(bookmarks.includes(res.data.news?._id));
        } catch (err) {
            console.error("Error fetching news:", err);
            toast.error("Failed to load news article");
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
            if (navigator.share) {
                await navigator.share(shareData);
                toast.success("Article shared successfully!");
            } else {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("🔗 Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Share failed:", err);
        }
    };

    const toggleBookmark = () => {
        if (!news) return;
        
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        let newBookmarks;
        
        if (isBookmarked) {
            newBookmarks = bookmarks.filter((id: string) => id !== news._id);
            toast.success("Bookmark removed");
        } else {
            newBookmarks = [...bookmarks, news._id];
            toast.success("Article bookmarked");
        }
        
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        setIsBookmarked(!isBookmarked);
    };

    const formatReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="pt-16 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex justify-center items-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground font-medium">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!news) {
        return (
            <div className="pt-16 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex justify-center items-center">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                        <Eye className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Article Not Found</h2>
                    <p className="text-muted-foreground">The news article you're looking for doesn't exist.</p>
                    <Button onClick={() => router.push('/news')} className="mt-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to News
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-16 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/news")}
                        className="group hover:bg-primary/10 hover:text-primary transition-all duration-300 px-4 py-2 rounded-xl"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to All News
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="overflow-hidden border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500">
                                {/* Media Section */}
                                <div 
                                    className="relative w-full aspect-video bg-linear-to-br from-muted/50 to-muted overflow-hidden"
                                    onMouseEnter={() => news.youtubeVideoId && setHoveredVideo(true)}
                                    onMouseLeave={() => setHoveredVideo(false)}
                                >
                                    {news.youtubeVideoId ? (
                                        <div className="w-full h-full bg-black relative">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${news.youtubeVideoId}?rel=0&modestbranding=1`}
                                                title={news.title}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full pointer-events-auto"
                                                frameBorder="0"
                                                loading="lazy"
                                            />
                                            {/* Overlay that disappears on hover */}
                                            <div 
                                                className={`absolute inset-0 bg-linear-to-t from-black/40 to-transparent transition-opacity duration-300 ${
                                                    hoveredVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                                }`}
                                            />
                                            <div className={`absolute top-4 left-4 transition-opacity duration-300 ${
                                                hoveredVideo ? 'opacity-0' : 'opacity-100'
                                            }`}>
                                                <Badge variant="destructive" className="bg-red-600 hover:bg-red-700 px-3 py-1">
                                                    <Play className="w-3 h-3 mr-1" />
                                                    Watch Video
                                                </Badge>
                                            </div>
                                        </div>
                                    ) : news.image ? (
                                        <>
                                            {imageLoading && (
                                                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                                                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                                </div>
                                            )}
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className={`w-full h-full object-cover transition-transform duration-700 ${
                                                    imageLoading ? 'opacity-0' : 'opacity-100'
                                                }`}
                                                onLoad={() => setImageLoading(false)}
                                            />
                                        </>
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-linear-to-br from-muted to-muted/50">
                                            <div className="text-center space-y-3">
                                                <Eye className="w-16 h-16 text-muted-foreground/50 mx-auto" />
                                                <p className="text-muted-foreground/70 text-sm">Featured Image</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Content Section */}
                                <CardContent className="p-8">
                                    {/* Article Header */}
                                    <div className="space-y-6">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 px-3 py-1">
                                                <Calendar className="w-3 h-3 mr-1" />
                                                {getTimeAgo(news.createdAt)}
                                            </Badge>
                                            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-0 px-3 py-1">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {formatReadingTime(news.content)}
                                            </Badge>
                                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-0 px-3 py-1">
                                                <User className="w-3 h-3 mr-1" />
                                                Khagaria News
                                            </Badge>
                                        </div>

                                        <motion.h1
                                            className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {news.title}
                                        </motion.h1>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/50">
                                            <Button
                                                onClick={handleShare}
                                                variant="outline"
                                                size="sm"
                                                className="hover:bg-primary hover:text-white transition-all duration-300 group px-4"
                                            >
                                                <Share2 className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                                Share Article
                                            </Button>
                                            
                                            <Button
                                                onClick={toggleBookmark}
                                                variant="outline"
                                                size="sm"
                                                className={`transition-all duration-300 group px-4 ${
                                                    isBookmarked 
                                                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100' 
                                                        : 'hover:bg-primary hover:text-white'
                                                }`}
                                            >
                                                {isBookmarked ? (
                                                    <BookmarkCheck className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                                ) : (
                                                    <Bookmark className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                                )}
                                                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Article Content */}
                                    <motion.div
                                        className="prose prose-lg dark:prose-invert max-w-none mt-8 leading-relaxed"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <div className="text-foreground/90 text-base md:text-lg">
                                            {news.content.split("\n").map((para, i) => (
                                                <motion.p
                                                    key={i}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 + (i * 0.05) }}
                                                    className="leading-8"
                                                >
                                                    {para}
                                                </motion.p>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Article Footer */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-6 border-t border-border/50 text-sm text-muted-foreground"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Published on {new Date(news.createdAt).toLocaleString("en-IN", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                onClick={handleShare}
                                                variant="ghost"
                                                size="sm"
                                                className="hover:text-primary"
                                            >
                                                <Share2 className="w-4 h-4 mr-1" />
                                                Share
                                            </Button>
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* Sidebar - Related News */}
                    {relatedNews.length > 0 && (
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6 sticky top-24"
                            >
                                <div className="flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-primary" />
                                    <h3 className="text-xl font-bold bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                        Other Top News
                                    </h3>
                                </div>
                                
                                <div className="space-y-4">
                                    {relatedNews.map((item, index) => (
                                        <motion.div
                                            key={item._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 + (index * 0.1) }}
                                        >
                                            <Card 
                                                className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden cursor-pointer hover:border-primary/20"
                                                onClick={() => router.push(`/news/${item.slug}`)}
                                            >
                                                <CardContent className="p-4 space-y-2">
                                                    <h4 className="font-semibold text-sm py-1 leading-tight line-clamp-3 group-hover:text-primary transition-colors">
                                                        {item.title}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Clock className="w-3 h-3" />
                                                        {getTimeAgo(item.createdAt)}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* View All Button */}
                                <Button
                                    onClick={() => router.push('/news')}
                                    variant="outline"
                                    className="w-full border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group"
                                >
                                    View All News
                                    <ArrowLeft className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform rotate-180" />
                                </Button>
                            </motion.div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}