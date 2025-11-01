// app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import {
    Target,
    Users,
    Eye,
    Award,
    Newspaper,
    MapPin,
    Clock,
    Shield,
    TrendingUp,
    Heart,
    User,
    Sparkles,
    TrendingUp as Growth
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import FounderImage from "@/assets/kundan-image.png";

export default function AboutPage() {
    const stats = [
        { icon: Users, value: "Growing", label: "Community Reach" },
        { icon: Newspaper, value: "100+", label: "Stories Published" },
        { icon: MapPin, value: "25+", label: "Local Areas Covered" },
        { icon: TrendingUp, value: "Rapid", label: "Growth Trajectory" }
    ];

    const values = [
        {
            icon: Eye,
            title: "Transparency",
            description: "Open and honest journalism, showing sources and methods to build trust with our readers."
        },
        {
            icon: Shield,
            title: "Integrity",
            description: "Commitment to truth and ethical reporting guides every story we publish."
        },
        {
            icon: Target,
            title: "Accuracy",
            description: "Every fact is verified and every source is checked to ensure complete accuracy."
        },
        {
            icon: Heart,
            title: "Community First",
            description: "Prioritizing local stories that matter to Khagaria residents, keeping our community connected."
        }
    ];

    const founder = {
        name: "Vikram Singh",
        role: "Founder & Editor",
        experience: "Emerging voice in local journalism",
        specialty: "Community Reporting & Digital Media",
        bio: "Passionate about building a reliable news source for Khagaria from the ground up. Committed to growing alongside our community and bringing you the stories that matter most.",
        image: FounderImage,
        commitment: [
            "24/7 news monitoring",
            "On-ground reporting",
            "Digital content creation",
            "Community engagement"
        ]
    };

    const coverageAreas = [
        "Politics", "Education", "Healthcare", "Infrastructure",
        "Business", "Events", "Sports", "Culture", "Development"
    ];

    return (
        <div className="pt-16 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-4"
                    >
                        <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium bg-primary/10 text-primary border-0">
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            New Voice of Khagaria
                        </Badge>

                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-2">
                            The Rising Voice of{" "}
                            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Khagaria
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                            Launched in 2023, we're Khagaria's newest dedicated news platform, growing rapidly to become
                            your most trusted source for local news, community stories, and important updates from across the district.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 lg:py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center space-y-2 sm:space-y-3"
                            >
                                <div className="flex justify-center">
                                    <div className="p-2 sm:p-3 bg-primary/10 rounded-xl">
                                        <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-muted-foreground font-medium px-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-4"
                        >
                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-0 text-xs">
                                Fresh Perspective
                            </Badge>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                                Building Khagaria's{" "}
                                <span className="text-primary">Digital News Legacy</span>
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                As a new voice in Khagaria's media landscape, we're committed to modern, digital-first journalism.
                                We're building our reputation story by story, focusing on what truly matters to our community
                                while embracing innovative ways to deliver news.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                    <span className="font-medium text-sm sm:text-base">Rapidly expanding coverage</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                    <span className="font-medium text-sm sm:text-base">Quality over quantity approach</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                                    <span className="font-medium text-sm sm:text-base">Community-driven content</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <Card className="border-0 bg-linear-to-br from-primary/5 to-primary/10 backdrop-blur-sm overflow-hidden">
                                <CardContent className="p-6 lg:p-8 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary rounded-lg">
                                            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold">Our Promise</h3>
                                    </div>
                                    <p className="text-muted-foreground text-base leading-relaxed">
                                        To grow with Khagaria, learning from our community while providing reliable,
                                        timely news. We're here for the long haul, committed to becoming your most
                                        trusted local news source through consistent, quality journalism.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>Pioneering digital news in Khagaria since 2023</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Founder Section - Updated Layout */}
            <section className="py-12 lg:py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 mb-12"
                    >
                        <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium bg-primary/10 text-primary border-0">
                            Behind the News
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Your Dedicated Local Journalist</h2>
                        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                            One person, countless stories - committed to bringing Khagaria the news it deserves
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                        {/* Founder Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-1"
                        >
                            <Card className="border-0 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 overflow-hidden sticky top-24">
                                <CardContent className="p-6 sm:p-8 text-center space-y-6">
                                    {/* Circular Image */}
                                    <div className="flex justify-center">
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/20 bg-gray-100 dark:bg-gray-700 shadow-lg">
                                            <Image
                                                src={founder.image}
                                                alt={founder.name}
                                                fill
                                                className="object-cover"
                                                placeholder="blur"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="text-xl sm:text-2xl font-bold">{founder.name}</h3>
                                        <p className="text-primary font-medium text-lg">{founder.role}</p>
                                        <div className="flex flex-col gap-2 justify-center">
                                            <Badge variant="outline" className="text-xs sm:text-sm bg-gray-50 dark:bg-gray-700 mx-auto">
                                                {founder.experience}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs sm:text-sm bg-gray-50 dark:bg-gray-700 mx-auto">
                                                {founder.specialty}
                                            </Badge>
                                        </div>
                                    </div>

                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        {founder.bio}
                                    </p>

                                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground pt-4 border-t">
                                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>Building Khagaria's news future since 2023</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Commitment & Responsibilities */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-2 space-y-8"
                        >
                            {/* Daily Commitment */}
                            <Card className="border-0 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-blue-500 rounded-lg">
                                            <Clock className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold">Daily Commitment</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {founder.commitment.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Coverage Areas */}
                            <Card className="border-0 bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-1 bg-green-500 rounded">
                                            <MapPin className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold">Coverage Focus</h3>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        {coverageAreas.map((area, index) => (
                                            <div
                                                key={index}
                                                className="text-center p-2 bg-white/80 dark:bg-gray-800/80 rounded-xl text-xs font-medium hover:bg-white hover:shadow-sm transition-all"
                                            >
                                                {area}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Personal Message */}
                            <Card className="border-0 bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-orange-500 rounded-lg">
                                            <Heart className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold">A Personal Note</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        "As your local journalist, I believe every story matters. From the smallest community event
                                        to the biggest development project, I'm committed to bringing you accurate, timely, and
                                        meaningful news. Your trust is my most valuable asset, and I work every day to earn it
                                        through honest, transparent journalism."
                                    </p>
                                    {/* <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                                        <User className="w-4 h-4" />
                                        <span className="font-medium">{founder.name}</span>
                                    </div> */}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 mb-8 lg:mb-12"
                    >
                        <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium bg-primary/10 text-primary border-0">
                            Our Foundation
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">What Guides Us</h2>
                        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                            The principles that shape our journalism as we build Khagaria's news future
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="border-0 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 h-full">
                                    <CardContent className="p-4 sm:p-6 text-center space-y-3">
                                        <div className="flex justify-center">
                                            <div className="p-2 sm:p-3 bg-primary/10 rounded-xl">
                                                <value.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                                            </div>
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold">{value.title}</h3>
                                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}