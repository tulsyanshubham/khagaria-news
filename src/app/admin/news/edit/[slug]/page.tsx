"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import NewsForm, { NewsFormData } from "@/components/NewsForm";
import { Loader2 } from "lucide-react";

// This should match the structure of your News model
type NewsPost = {
    _id: string;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    youtubeVideoId: string;
    createdAt: string;
};

export default function EditNewsPage() {
    const router = useRouter();
    const { slug } = useParams();

    const [post, setPost] = useState<NewsPost | null>(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            setPageLoading(true);
            try {
                const res = await fetch(`/api/news/slug/${slug}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    // ✅ CORRECTION HERE: Changed data.post to data.news
                    // This matches your API response: { success: true, news: post }
                    setPost(data.news);
                } else {
                    toast.error("Failed to fetch news article.");
                    router.push("/admin");
                }
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while fetching data.");
            } finally {
                setPageLoading(false);
            }
        };

        fetchPost();
    }, [slug, router]);

    const handleUpdateSubmit = async (payload: NewsFormData) => {
        setIsSubmitting(true);
        try {
            // The payload from NewsForm is { title, slug, content, ... }
            // Your PUT API correctly interprets payload.slug as 'newSlug'
            // let { ..., slug : newSlug } = body;
            // This logic is already correct.
            const res = await fetch(`/api/news/${post?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("News updated successfully!");
                router.push("/admin");
            } else {
                toast.error(data?.message || "Failed to update news.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>News article not found.</p>
            </div>
        );
    }

    return (
        <NewsForm
            // Pass the fetched post data as initialData
            initialData={{
                title: post.title,
                slug: post.slug,
                content: post.content,
                image: post.image,
                youtubeVideoId: post.youtubeVideoId,
            }}
            onFormSubmit={handleUpdateSubmit}
            isSubmitting={isSubmitting}
            pageTitle="Edit News Article"
            pageDescription="Update your existing story"
            submitButtonText="Update News"
        />
    );
}