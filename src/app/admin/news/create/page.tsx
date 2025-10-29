"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, Upload, Image as ImageIcon, Video, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function CreateNewsPage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [youtubeVideoId, setYoutubeVideoId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please upload a valid image file");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImage(base64);
                setPreview(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const extractYouTubeId = (url: string) => {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : url;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !content || (!image && !youtubeVideoId)) {
            toast.error("Please fill all required fields including either an image or YouTube video.");
            return;
        }

        setLoading(true);

        const payload = {
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            content,
            image,
            youtubeVideoId: youtubeVideoId ? extractYouTubeId(youtubeVideoId) : "",
        };

        try {
            const res = await fetch("/api/news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("News created successfully!");
                router.push("/admin");
            } else {
                toast.error(data?.message || "Failed to create news.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const clearImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleReset = () => {
        setTitle("");
        setSlug("");
        setContent("");
        setImage(null);
        setPreview(null);
        setYoutubeVideoId("");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-muted/30 to-background py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Card className="rounded-xl sm:rounded-2xl shadow-lg border-0 sm:border">
                        <CardContent className="p-4 sm:p-6 md:p-8">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                                        Create News Article
                                    </h1>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Share your latest story with the world
                                    </p>
                                </div>
                                <Link href="/admin">
                                    <Button
                                        variant="outline"
                                        className="flex items-center gap-2 text-sm w-full sm:w-auto"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span className="sm:hidden">Go Back</span>
                                        <span className="hidden sm:inline">Back</span>
                                    </Button>
                                </Link>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Image Upload Section */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium">
                                        Featured Image
                                    </label>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-medium">
                                            Featured Image
                                        </label>
                                        <div className="border-2 border-dashed rounded-xl sm:rounded-2xl overflow-hidden transition-colors hover:border-primary/50 relative">
                                            {/* Delete Button - Only shows when there's a preview */}
                                            {preview && (
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={clearImage}
                                                    className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700 text-white shadow-lg"
                                                >
                                                    <Trash2 />
                                                </Button>
                                            )}

                                            <label className="block cursor-pointer">
                                                {preview ? (
                                                    <div className="relative group">
                                                        <img
                                                            src={preview}
                                                            alt="Uploaded preview"
                                                            className="w-full aspect-video object-cover"
                                                        />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <div className="text-white text-center">
                                                                <Upload className="w-8 h-8 mx-auto mb-2" />
                                                                <p className="text-sm">Click to change image</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 text-muted-foreground transition-colors hover:text-foreground">
                                                        <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4" />
                                                        <p className="text-sm sm:text-base font-medium mb-1">Upload featured image</p>
                                                        <p className="text-xs sm:text-sm text-center text-muted-foreground">
                                                            Click to browse or drag and drop
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-2">
                                                            PNG, JPG, WEBP up to 5MB
                                                        </p>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Slug + YouTube Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">
                                            Custom Slug
                                            <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="auto-generated-from-title"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            className="text-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Leave empty for auto-generation
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Video className="w-4 h-4" />
                                            YouTube Video
                                            <span className="text-muted-foreground font-normal">(optional)</span>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="YouTube URL or Video ID"
                                            value={youtubeVideoId}
                                            onChange={(e) => setYoutubeVideoId(e.target.value)}
                                            className="text-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Provide URL or just the video ID
                                        </p>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        News Title <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="Enter compelling news title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="text-base sm:text-lg py-2"
                                    />
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">
                                        Content <span className="text-red-500">*</span>
                                    </label>
                                    <Textarea
                                        placeholder="Write your engaging news content here. You can include details, quotes, and important information..."
                                        rows={6}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        className="resize-vertical min-h-[120px] text-sm"
                                    />
                                </div>

                                {/* Requirements Note */}
                                <div className="bg-muted/50 rounded-lg p-3 sm:p-4">
                                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                                        Requirements
                                    </h4>
                                    <ul className="text-xs text-muted-foreground space-y-1">
                                        <li>• Title and content are required</li>
                                        <li>• Either image or YouTube video is required</li>
                                        <li>• Image will be used as thumbnail if both provided</li>
                                    </ul>
                                </div>

                                {/* Submit Button */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleReset}
                                        disabled={loading}
                                        className="flex-1"
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                                                <span>Publishing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                                <span>Publish News</span>
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}