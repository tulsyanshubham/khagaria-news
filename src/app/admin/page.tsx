"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Edit2, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

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
            // Get token from localStorage
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Authentication required");
                return;
            }

            // Call delete endpoint
            await axios.delete(`/api/news/${item.slug}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            toast.success("Article deleted successfully");
            
            // Remove from frontend array
            setNews((prev) => prev.filter((n) => n._id !== item._id));
            
            // If this was the last item on the page and not page 1, go to previous page
            if (news.length === 1 && page > 1) {
                setPage(page - 1);
            }
            
            closeDeleteModal();
        } catch (error: any) {
            console.error("Error deleting article:", error);
            if (error.response?.status === 401) {
                toast.error("Unauthorized - Please login again");
            } else if (error.response?.status === 404) {
                toast.error("Article not found");
                setNews((prev) => prev.filter((n) => n._id !== item._id));
            } else {
                toast.error("Failed to delete article");
            }
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground px-6 py-10">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-between items-center mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold">Manage News Articles ({total})</h1>
                        <p className="text-muted-foreground">
                            View, edit, or delete existing news articles.
                        </p>
                    </div>
                    <Link href="/admin/news/create">
                        <Button className="bg-primary text-white hover:bg-primary/90">
                            + Create New Article
                        </Button>
                    </Link>
                </motion.div>

                {/* Grid */}
                {news.length === 0 ? (
                    <p className="text-center text-muted-foreground mt-20">
                        No articles found.
                    </p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {news.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className="overflow-hidden bg-card dark:bg-muted/60 hover:shadow-lg transition-all duration-300 flex flex-col">
                                        {/* Image */}
                                        <div className="aspect-video bg-muted overflow-hidden">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : item.youtubeVideoId ? (
                                                <iframe
                                                    className="w-full h-full"
                                                    src={`https://www.youtube.com/embed/${item.youtubeVideoId}`}
                                                    title={item.title}
                                                    allowFullScreen
                                                ></iframe>
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <CardContent className="p-4 flex flex-col justify-between grow">
                                            <div>
                                                <h2 className="font-semibold text-lg line-clamp-2">{item.title}</h2>
                                                <p className="text-sm text-muted-foreground line-clamp-3 mt-1">
                                                    {item.content}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center mt-4">
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                    })}
                                                </p>

                                                <div className="flex gap-2">
                                                    <Link href={`/admin/news/edit/${item.slug}`}>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="hover:bg-primary/10"
                                                        >
                                                            <Edit2 className="w-4 h-4 mr-1" /> Edit
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => openDeleteModal(item)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center gap-4 mt-10">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                            >
                                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                Page {page} of {totalPages}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            >
                                Next <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </>
                )}

                {/* Delete Confirmation Modal */}
                {deleteModal.isOpen && deleteModal.item && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-background rounded-lg shadow-xl max-w-md w-full p-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-destructive">Delete Article</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={closeDeleteModal}
                                    disabled={deleting !== null}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            
                            <p className="text-muted-foreground mb-6">
                                Are you sure you want to delete <strong>"{deleteModal.item.title}"</strong>? 
                                This action cannot be undone.
                            </p>
                            
                            <div className="flex gap-3 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={closeDeleteModal}
                                    disabled={deleting !== null}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                    disabled={deleting !== null}
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
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}