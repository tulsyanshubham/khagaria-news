"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Newspaper } from "lucide-react";
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
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  const [featured, ...rest] = news;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted dark:from-gray-950 dark:to-gray-900 text-foreground transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* 📰 Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Your Daily Dose of <span className="text-primary">News</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the latest stories, technology breakthroughs, and trending updates — all in one place.
          </p>
        </motion.section>

        {/* 🌟 Featured News */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl bg-card dark:bg-muted/60 transition-all duration-300"
          >
            <div className="aspect-video w-full overflow-hidden">
              {featured.image ? (
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                />
              ) : featured.youtubeVideoId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${featured.youtubeVideoId}`}
                  title={featured.title}
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex items-center justify-center h-full bg-muted text-gray-400 text-sm italic">
                  Image not available
                </div>
              )}
            </div>

            <div className="p-6 space-y-3">
              <h2 className="text-2xl md:text-3xl font-semibold">{featured.title}</h2>
              <p className="text-muted-foreground line-clamp-3">{featured.content}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {new Date(featured.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <Button
                  variant="link"
                  className="text-primary font-medium"
                  onClick={() => (window.location.href = `/news/${featured.slug}`)}
                >
                  Read Full Story →
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 🗞️ Recent News - Different layouts for mobile and desktop */}
        {rest.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-bold">Recent Stories</h3>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                onClick={() => (window.location.href = "/news")}
              >
                View All News →
              </Button>
            </div>

            {/* Desktop Grid Layout (hidden on mobile) */}
            <NewsCards data={rest} />
          </section>
        )}
      </div>
    </div>
  );
}