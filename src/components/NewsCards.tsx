// NewsCards.tsx
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { motion } from "framer-motion";
import { Calendar, Play, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

type newsObj = {
    _id: string;
    title: string;
    content: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: string;
    slug: string;
}

export default function NewsCards({ data }: { data: newsObj[] }) {
    const router = useRouter();
    const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

    const handleReadMore = (slug: string) => {
        router.push(`/news/${slug}`);
    };

    const handleCardClick = (slug: string) => {
        router.push(`/news/${slug}`);
    };

    return (
        <div>
            {/* Desktop Grid Layout */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        layout
                    >
                        <Card 
                            className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden h-full flex flex-col cursor-pointer"
                            onClick={() => handleCardClick(item.slug)}
                        >
                            {/* Image/Video Section */}
                            <div 
                                className="relative aspect-video bg-linear-to-br from-muted/50 to-muted overflow-hidden"
                                onMouseEnter={() => setHoveredVideo(item._id)}
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
                                        <div className="text-center space-y-2">
                                            <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center mx-auto">
                                                <Calendar className="w-6 h-6 text-muted-foreground/60" />
                                            </div>
                                            <p className="text-xs text-muted-foreground/70">No Image</p>
                                        </div>
                                    </div>
                                )}
                                {/* Hover overlay for non-video content */}
                                {!item.youtubeVideoId && (
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                )}
                            </div>

                            {/* Content Section */}
                            <CardContent className="p-6 flex flex-col grow space-y-4">
                                <div className="grow space-y-3">
                                    <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
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

                                    <Button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent card click
                                            handleReadMore(item.slug);
                                        }}
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200 group/btn"
                                    >
                                        Read More
                                        <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Mobile Horizontal Tiles Layout */}
            <div className="lg:hidden space-y-4">
                {data.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card 
                            className="group hover:shadow-lg transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 overflow-hidden cursor-pointer"
                            onClick={() => handleCardClick(item.slug)}
                        >
                            <div className="flex flex-row h-32">
                                {/* Image/Video Thumbnail */}
                                <div 
                                    className="w-1/3 shrink-0 bg-linear-to-br from-muted/50 to-muted overflow-hidden relative"
                                    onTouchStart={() => setHoveredVideo(item._id)}
                                    onTouchEnd={() => setHoveredVideo(null)}
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : item.youtubeVideoId ? (
                                        <div className="w-full h-full bg-black relative">
                                            {/* Mobile: Show thumbnail instead of iframe */}
                                            <div 
                                                className="w-full h-full bg-cover bg-center"
                                                style={{
                                                    backgroundImage: `url(https://img.youtube.com/vi/${item.youtubeVideoId}/hqdefault.jpg)`
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <div className="text-center space-y-1">
                                                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mx-auto">
                                                        <Play className="w-4 h-4 text-white" />
                                                    </div>
                                                    <Badge variant="destructive" className="bg-red-600 text-xs px-1">
                                                        Video
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-linear-to-br from-muted to-muted/50">
                                            <Calendar className="w-6 h-6 text-muted-foreground/60" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <CardContent className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
                                    <div className="space-y-2">
                                        <h2 className="font-semibold text-sm line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h2>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </div>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click
                                                handleReadMore(item.slug);
                                            }}
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary hover:text-primary/80 hover:bg-primary/10 text-xs p-0 h-auto transition-all duration-200"
                                        >
                                            Read →
                                        </Button>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}