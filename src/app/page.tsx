"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Newspaper, Calendar, Play, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import NewsCards from "@/components/NewsCards";

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  image?: string;
  youtubeVideoId?: string;
  createdAt: string;
  slug: string;
}

export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(`/api/news?page=1&limit=4`);
      setNews(res.data.data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 flex justify-center items-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground font-medium">Loading latest news...</p>
        </div>
      </div>
    );
  }

  const [featured, ...rest] = news;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* 📰 Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 mb-16 lg:mb-20"
        >
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0">
              <Sparkles className="w-4 h-4 mr-2" />
              Stay Informed, Stay Ahead
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Your Daily Dose of{" "}
            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              News
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the latest stories, technology breakthroughs, and trending updates — 
            all curated to keep you informed and inspired.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Live Updates</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-500" />
                <span>Trusted Sources</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 🌟 Featured News */}
        <AnimatePresence>
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16 lg:mb-20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">Featured Story</h2>
              </div>

              <Card className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image/Video Section */}
                  <div 
                    className="relative aspect-video lg:aspect-square overflow-hidden"
                    onMouseEnter={() => featured.youtubeVideoId && setHoveredVideo('featured')}
                    onMouseLeave={() => setHoveredVideo(null)}
                  >
                    {featured.image ? (
                      <>
                        {imageLoading && (
                          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
                            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                          </div>
                        )}
                        <img
                          src={featured.image}
                          alt={featured.title}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${
                            imageLoading ? 'opacity-0' : 'opacity-100'
                          }`}
                          onLoad={() => setImageLoading(false)}
                        />
                      </>
                    ) : featured.youtubeVideoId ? (
                      <div className="w-full h-full bg-black relative">
                        <iframe
                          src={`https://www.youtube.com/embed/${featured.youtubeVideoId}?rel=0&modestbranding=1`}
                          title={featured.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full pointer-events-auto"
                          frameBorder="0"
                          loading="lazy"
                        />
                        {/* Overlay that disappears on hover to allow video interaction */}
                        <div 
                          className={`absolute inset-0 bg-linear-to-r from-black/30 to-transparent transition-opacity duration-300 ${
                            hoveredVideo === 'featured' ? 'opacity-0 pointer-events-none' : 'opacity-100'
                          }`}
                        />
                        <div className={`absolute top-4 left-4 transition-opacity duration-300 ${
                          hoveredVideo === 'featured' ? 'opacity-0' : 'opacity-100'
                        }`}>
                          <Badge variant="destructive" className="bg-red-600 hover:bg-red-700">
                            <Play className="w-3 h-3 mr-1" />
                            Watch Video
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full bg-linear-to-br from-muted to-muted/50">
                        <div className="text-center space-y-3">
                          <Newspaper className="w-16 h-16 text-muted-foreground/50 mx-auto" />
                          <p className="text-muted-foreground/70 text-sm">Featured Story</p>
                        </div>
                      </div>
                    )}
                    {/* Hover overlay for non-video content */}
                    {!featured.youtubeVideoId && (
                      <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                    <div className="space-y-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-0">
                        Featured
                      </Badge>
                      <h2 className="text-3xl lg:text-4xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                        {featured.title}
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed line-clamp-4">
                        {featured.content}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(featured.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                      
                      <Button
                        onClick={() => (window.location.href = `/news/${featured.slug}`)}
                        className="bg-linear-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                      >
                        Read Full Story
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🗞️ Recent News */}
        <AnimatePresence>
          {rest.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Newspaper className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold">Recent Stories</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Discover more engaging content and stay up to date
                  </p>
                </div>
                
                <Button
                  onClick={() => (window.location.href = "/news")}
                  variant="outline"
                  className="border-primary/20 text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group/btn whitespace-nowrap"
                >
                  View All News
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* News Cards Grid */}
              <NewsCards data={rest} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {news.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Newspaper className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">No news available</h3>
              <p className="text-muted-foreground">
                Check back later for the latest updates and stories.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}