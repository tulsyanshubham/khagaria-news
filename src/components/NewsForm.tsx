"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Loader2,
    ArrowLeft,
    Upload,
    Image as ImageIcon,
    Video,
    Trash2,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// Define the shape of the news data
export interface NewsFormData {
    title: string;
    slug: string;
    content: string;
    image: string | null;
    youtubeVideoId: string;
}

// Define the props for the form component
interface NewsFormProps {
    initialData?: Partial<NewsFormData>;
    onFormSubmit: (payload: NewsFormData) => Promise<void>;
    isSubmitting: boolean;
    pageTitle: string;
    pageDescription: string;
    submitButtonText: string;
}

export default function NewsForm({
    initialData = {},
    onFormSubmit,
    isSubmitting,
    pageTitle,
    pageDescription,
    submitButtonText,
}: NewsFormProps) {
    const [title, setTitle] = useState(initialData.title || "");
    const [slug, setSlug] = useState(initialData.slug || "");
    const [content, setContent] = useState(initialData.content || "");
    // The 'image' prop might be a URL from the DB, 'preview' is for the <img src>
    // 'imageToSend' will hold the new base64 string if a new file is uploaded
    const [imageToSend, setImageToSend] = useState<string | null>(null);
    const [preview, setPreview] = useState<string | null>(initialData.image || null);
    const [youtubeVideoId, setYoutubeVideoId] = useState(
        initialData.youtubeVideoId || ""
    );

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }
            if (!file.type.startsWith("image/")) {
                toast.error("Please upload a valid image file");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setImageToSend(base64); // Store the new base64 string
                setPreview(base64); // Update the preview
            };
            reader.readAsDataURL(file);
        }
    };

    const extractYouTubeId = (url: string) => {
        const regex =
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const match = url.match(regex);
        return match ? match[1] : url;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Use preview for validation, as it represents the "current" image state
        if (!title || !content || (!preview && !youtubeVideoId)) {
            toast.error(
                "Please fill all required fields including either an image or YouTube video."
            );
            return;
        }

        const payload: NewsFormData = {
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            content,
            // If a new image was uploaded, send it.
            // If not, and there's a preview, it means the old image is still there (or was cleared).
            // If preview is null, send null. If a new image was sent, send that.
            image: imageToSend
                ? imageToSend
                : preview
                    ? (preview as string)
                    : null,
            youtubeVideoId: youtubeVideoId ? extractYouTubeId(youtubeVideoId) : "",
        };

        // For edit: If no new image was uploaded, we don't want to resend the old URL/base64
        // if it wasn't changed. Let's adjust.
        // image: null -> User cleared it
        // image: base64 -> User uploaded new one
        // image: undefined -> User didn't touch it
        // This is tricky. A simpler way:
        const finalPayload = {
            ...payload,
            // If a new image was uploaded, send it.
            // If preview is null, it means user cleared it, send null.
            // If preview exists and no new image was sent, it's the old image.
            // We'll send the 'preview' value, unless a new image 'imageToSend' exists.
            image: imageToSend ? imageToSend : preview,
        };


        await onFormSubmit(finalPayload);
    };

    const clearImage = () => {
        setImageToSend(null);
        setPreview(null);
        // Clear the file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleReset = () => {
        setTitle(initialData.title || "");
        setSlug(initialData.slug || "");
        setContent(initialData.content || "");
        setImageToSend(null);
        setPreview(initialData.image || null);
        setYoutubeVideoId(initialData.youtubeVideoId || "");
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
                                        {pageTitle}
                                    </h1>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {pageDescription}
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
                                    <div className="border-2 border-dashed rounded-xl sm:rounded-2xl overflow-hidden transition-colors hover:border-primary/50 relative">
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
                                                    <p className="text-sm sm:text-base font-medium mb-1">
                                                        Upload featured image
                                                    </p>
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

                                {/* Slug + YouTube Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">
                                            Custom Slug
                                            <span className="text-muted-foreground font-normal ml-1">
                                                (optional)
                                            </span>
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
                                            <span className="text-muted-foreground font-normal">
                                                (optional)
                                            </span>
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
                                        placeholder="Write your engaging news content here..."
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
                                        disabled={isSubmitting}
                                        className="flex-1"
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                                                <span>Saving...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                                <span>{submitButtonText}</span>
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