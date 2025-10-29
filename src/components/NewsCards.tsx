import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { motion } from "framer-motion";

type newsObj = {
    _id: string;
    title: string;
    content: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: string;
    slug: string;
}

export default function NewsCards({data}: {data: newsObj[]}) {
    return (
        <div>
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="py-0"
                    >
                        <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card dark:bg-muted/60">
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
                                        Image not available
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-4 flex flex-col gap-2">
                                <h2 className="font-semibold text-lg line-clamp-2">{item.title}</h2>
                                <p className="text-sm text-muted-foreground line-clamp-3">{item.content}</p>
                                <p className="text-xs text-right text-muted-foreground mt-2">
                                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
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

            {/* Mobile Horizontal Tiles Layout (hidden on desktop) */}
            <div className="lg:hidden space-y-4">
                {data.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-card dark:bg-muted/60">
                            <div className="flex flex-row h-32">
                                {/* Image/Video Thumbnail */}
                                <div className="w-1/3 shrink-0 bg-muted overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : item.youtubeVideoId ? (
                                        <div className="w-full h-full bg-black flex items-center justify-center">
                                            <div className="text-white text-xs">Video</div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400 text-sm italic text-center px-2">
                                            No Image
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <CardContent className="p-3 flex-1 flex flex-col justify-between overflow-hidden">
                                    <div className="space-y-1">
                                        <h2 className="font-semibold text-sm line-clamp-2 leading-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                        <Button
                                            variant="link"
                                            className="text-primary font-medium text-xs p-0 h-auto"
                                            onClick={() => (window.location.href = `/news/${item.slug}`)}
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
    )
}
