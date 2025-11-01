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
    User
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import FounderImage from "@/assets/kundan-image.png"; // Add this import

export default function AboutPage() {
    const stats = [
        { icon: Users, value: "50K+", label: "Monthly Readers" },
        { icon: Newspaper, value: "1K+", label: "Articles Published" },
        { icon: MapPin, value: "50+", label: "Local Areas Covered" },
        { icon: Award, value: "2018", label: "Serving Since" }
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
        experience: `${new Date().getFullYear() - 2023}+ years in journalism`,
        specialty: "Local News & Community Affairs",
        bio: "Passionate about bringing accurate and timely news to the people of Khagaria. Working tirelessly to keep our community informed and connected.",
        image: FounderImage // Use the imported image
    };

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
                            <Newspaper className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                            About Khagaria News 18
                        </Badge>

                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-2">
                            Trusted Voice of{" "}
                            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Khagaria
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
                            For years, I've been dedicated to delivering accurate, timely, and relevant news
                            to the people of Khagaria. My commitment to truth and community makes this your most reliable local news source.
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
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-0 text-xs">
                                Our Mission
                            </Badge>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                                Empowering Khagaria Through{" "}
                                <span className="text-primary">Independent Journalism</span>
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                I am dedicated to delivering news that matters to the people of Khagaria.
                                My mission is to provide accurate, unbiased, and timely information that empowers
                                our community to make informed decisions and stay connected with local developments.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                    <span className="font-medium text-sm sm:text-base">Real-time local updates</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                                    <span className="font-medium text-sm sm:text-base">Verified and fact-checked news</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                                    <span className="font-medium text-sm sm:text-base">Community-focused reporting</span>
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
                                        <h3 className="text-xl sm:text-2xl font-bold">Our Vision</h3>
                                    </div>
                                    <p className="text-muted-foreground text-base leading-relaxed">
                                        To be the most trusted and comprehensive news source for Khagaria,
                                        bridging information gaps and fostering an informed, engaged, and
                                        progressive community through excellence in journalism.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>Committed to serving Khagaria since 2018</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-12 lg:py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 mb-8 lg:mb-12"
                    >
                        <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium bg-primary/10 text-primary border-0">
                            What Drives Us
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Our Core Values</h2>
                        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                            These principles guide every story I publish and every decision I make
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

            {/* Founder Section */}
            <section className="py-12 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 mb-8 lg:mb-12"
                    >
                        <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium bg-primary/10 text-primary border-0">
                            Behind Khagaria News 18
                        </Badge>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Meet Your Local Journalist</h2>
                        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
                            Dedicated to bringing you the most accurate and relevant local news
                        </p>
                    </motion.div>

                    <div className="max-w-md mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Card className="border-0 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 overflow-hidden">
                                <CardContent className="p-6 sm:p-8 text-center space-y-6">
                                    {/* Circular Image */}
                                    <div className="flex justify-center">
                                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-primary/20 bg-gray-100 dark:bg-gray-700">
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
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            <Badge variant="outline" className="text-xs sm:text-sm bg-gray-50 dark:bg-gray-700">
                                                {founder.experience}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs sm:text-sm bg-gray-50 dark:bg-gray-700">
                                                {founder.specialty}
                                            </Badge>
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                        {founder.bio}
                                    </p>
                                    
                                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground pt-4 border-t">
                                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>Serving Khagaria since 2018</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}