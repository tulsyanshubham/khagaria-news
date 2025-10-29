"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit2, Trash2, ChevronLeft, ChevronRight, X, LogOut, Plus, FileText, Calendar, Play } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NewsItem {
    _id: string;
    title: string;
    slug: string;
    content: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: string;
}

export default function ManageNewsPage() {
    const router = useRouter();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; item: NewsItem | null }>({
        isOpen: false,
        item: null
    });
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

    const limit = 6;

    useEffect(() => {
        fetchNews();
    }, [page]);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/news?page=${page}&limit=${limit}`);
            console.log(res.data.totalItems);
            setNews(res.data.data || []);
            if (res.data.total && res.data.limit) {
                setTotalPages(Math.ceil(res.data.total / res.data.limit));
            } else if (res.data.totalPages) {
                setTotal(res.data.totalItems || 0);
                setTotalPages(res.data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            toast.error("Failed to load news articles");
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (item: NewsItem) => {
        setDeleteModal({ isOpen: true, item });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ isOpen: false, item: null });
    };

    const handleDelete = async () => {
        if (!deleteModal.item) return;

        const item = deleteModal.item;
        setDeleting(item._id);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Authentication required");
                return;
            }

            await axios.delete(`/api/news/${item._id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            toast.success("Article deleted successfully");
            setNews((prev) => prev.filter((n) => n._id !== item._id));

            if (news.length === 1 && page > 1) {
                setPage(page - 1);
            }
        } catch (error: any) {
            console.error("Error deleting article:", error);
            if (error.response?.status === 401) {
                toast.error("Unauthorized - Please login again");
            } else if (error.response?.status === 404) {
                toast.error("Article not found");
            } else {
                toast.error("Failed to delete article");
            }
        } finally {
            closeDeleteModal();
            setDeleting(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.replace("/login");
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex justify-center items-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground font-medium">Loading articles...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <FileText className="w-6 h-6 text-primary" />
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                    News Management
                                </h1>
                            </div>
                            <p className="text-lg text-muted-foreground max-w-2xl">
                                Manage your news articles with ease. Create, edit, and publish content seamlessly.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <Badge variant="secondary" className="px-3 py-1 text-sm">
                                    {total} Total Articles
                                </Badge>
                                <Badge variant="outline" className="px-3 py-1 text-sm">
                                    Page {page} of {totalPages}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link href="/admin/news/create" className="sm:w-auto w-full">
                                <Button className="w-full sm:w-auto bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                                    Create Article
                                </Button>
                            </Link>
                            <Button 
                                onClick={handleLogout} 
                                variant="outline" 
                                className="w-full sm:w-auto border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/50 transition-colors"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Articles Grid */}
                {news.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="max-w-md mx-auto space-y-4">
                            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                                <FileText className="w-10 h-10 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold text-foreground">No articles found</h3>
                            <p className="text-muted-foreground">
                                Get started by creating your first news article.
                            </p>
                            <Link href="/admin/news/create">
                                <Button className="mt-4 bg-primary hover:bg-primary/90">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Your First Article
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                            <AnimatePresence>
                                {news.map((item, index) => (
                                    <motion.div
                                        key={item._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        layout
                                    >
                                        <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                                            {/* Image/Video Section */}
                                            <div 
                                                className="relative aspect-video bg-linear-to-br from-muted/50 to-muted overflow-hidden"
                                                onMouseEnter={() => item.youtubeVideoId && setHoveredVideo(item._id)}
                                                onMouseLeave={() => setHoveredVideo(null)}
                                            >
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : item.youtubeVideoId ? (
                                                    <div className="w-full h-full bg-black relative">
                                                        <iframe
                                                            src={`https://www.youtube.com/embed/${item.youtubeVideoId}?rel=0&modestbranding=1`}
                                                            title={item.title}
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                            className="w-full h-full pointer-events-auto"
                                                            frameBorder="0"
                                                            loading="lazy"
                                                        />
                                                        {/* Overlay that disappears on hover to allow video interaction */}
                                                        <div 
                                                            className={`absolute inset-0 bg-linear-to-t from-black/30 to-transparent transition-opacity duration-300 ${
                                                                hoveredVideo === item._id ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                                            }`}
                                                        />
                                                        <div className={`absolute top-3 left-3 transition-opacity duration-300 ${
                                                            hoveredVideo === item._id ? 'opacity-0' : 'opacity-100'
                                                        }`}>
                                                            <Badge variant="destructive" className="bg-red-600 hover:bg-red-700">
                                                                <Play className="w-3 h-3 mr-1" />
                                                                YouTube
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center h-full bg-linear-to-br from-muted to-muted/50">
                                                        <FileText className="w-12 h-12 text-muted-foreground/50" />
                                                    </div>
                                                )}
                                                {/* Hover overlay for non-video content */}
                                                {!item.youtubeVideoId && (
                                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                )}
                                            </div>

                                            {/* Content Section */}
                                            <CardContent className="p-6 flex flex-col flex-grow space-y-4">
                                                <div className="flex-grow space-y-3">
                                                    <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                                        {item.content}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <Link href={`/admin/news/edit/${item._id}`}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-9 px-3 border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                                                            >
                                                                <Edit2 className="w-3 h-3 mr-1" />
                                                                Edit
                                                            </Button>
                                                        </Link>

                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() => openDeleteModal(item)}
                                                            className="h-9 px-3 transition-all duration-200"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50"
                            >
                                <p className="text-sm text-muted-foreground">
                                    Showing {news.length} of {total} articles
                                </p>
                                
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={page === 1}
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        className="flex items-center gap-2 disabled:opacity-50 transition-all duration-200"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </Button>

                                    <div className="flex items-center gap-1 mx-4">
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            const pageNum = i + 1;
                                            return (
                                                <Button
                                                    key={pageNum}
                                                    variant={page === pageNum ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setPage(pageNum)}
                                                    className={`w-8 h-8 p-0 text-xs transition-all duration-200 ${
                                                        page === pageNum 
                                                            ? 'bg-primary text-primary-foreground' 
                                                            : 'hover:bg-muted'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </Button>
                                            );
                                        })}
                                        {totalPages > 5 && (
                                            <span className="text-sm text-muted-foreground mx-1">...</span>
                                        )}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={page === totalPages}
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        className="flex items-center gap-2 disabled:opacity-50 transition-all duration-200"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {deleteModal.isOpen && deleteModal.item && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-background rounded-2xl shadow-2xl max-w-md w-full border border-border/50 overflow-hidden"
                            >
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">Delete Article</h3>
                                            <p className="text-sm text-muted-foreground">This action cannot be undone</p>
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground">
                                        Are you sure you want to delete <strong className="text-foreground">"{deleteModal.item.title}"</strong>?
                                    </p>

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            variant="outline"
                                            onClick={closeDeleteModal}
                                            disabled={deleting !== null}
                                            className="flex-1 transition-all duration-200"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={handleDelete}
                                            disabled={deleting !== null}
                                            className="flex-1 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-200"
                                        >
                                            {deleting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                "Delete Article"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}