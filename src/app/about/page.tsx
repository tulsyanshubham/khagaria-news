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
    Heart
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
    const stats = [
        { icon: Users, value: "50K+", label: "Monthly Readers" },
        { icon: Newspaper, value: "5K+", label: "Articles Published" },
        { icon: MapPin, value: "100+", label: "Local Areas Covered" },
        { icon: Award, value: "2018", label: "Serving Since" }
    ];

    const values = [
        {
            icon: Eye,
            title: "Transparency",
            description: "We believe in open and honest journalism, showing our sources and methods to build trust with our readers."
        },
        {
            icon: Shield,
            title: "Integrity",
            description: "Our commitment to truth and ethical reporting guides every story we publish, without bias or influence."
        },
        {
            icon: Target,
            title: "Accuracy",
            description: "Every fact is verified, every source is checked, and every story is reviewed to ensure complete accuracy."
        },
        {
            icon: Heart,
            title: "Community First",
            description: "We prioritize local stories that matter to Khagaria residents, keeping our community informed and connected."
        }
    ];

    const team = [
        {
            name: "Rajesh Kumar",
            role: "Editor-in-Chief",
            experience: "15+ years in journalism",
            specialty: "Political & Social Affairs"
        },
        {
            name: "Priya Singh",
            role: "Senior Reporter",
            experience: "8+ years in news reporting",
            specialty: "Education & Development"
        },
        {
            name: "Amit Sharma",
            role: "Tech & Innovation Lead",
            experience: "10+ years in tech journalism",
            specialty: "Technology & Startups"
        },
        {
            name: "Sunita Devi",
            role: "Local Correspondent",
            experience: "12+ years in local reporting",
            specialty: "Community & Cultural Events"
        }
    ];

    return (
        <div className="pt-16 min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center space-y-6"
                    >
                        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0">
                            <Newspaper className="w-4 h-4 mr-2" />
                            About Khagaria News 18
                        </Badge>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                            Trusted Voice of{" "}
                            <span className="bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Khagaria
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            For years, we've been at the forefront of delivering accurate, timely, and relevant news
                            to the people of Khagaria. Our commitment to truth and community makes us your most reliable news source.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 lg:py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center space-y-3"
                            >
                                <div className="flex justify-center">
                                    <div className="p-3 bg-primary/10 rounded-xl">
                                        <stat.icon className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-0">
                                Our Mission
                            </Badge>
                            <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                                Empowering Khagaria Through{" "}
                                <span className="text-primary">Informed Journalism</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We are dedicated to delivering news that matters to the people of Khagaria.
                                Our mission is to provide accurate, unbiased, and timely information that empowers
                                our community to make informed decisions and stay connected with local developments.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                    <span className="font-medium">Real-time local updates</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    <span className="font-medium">Verified and fact-checked news</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-red-600" />
                                    <span className="font-medium">Community-focused reporting</span>
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
                                <CardContent className="p-8 lg:p-12 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary rounded-lg">
                                            <Target className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Our Vision</h3>
                                    </div>
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        To be the most trusted and comprehensive news source for Khagaria,
                                        bridging information gaps and fostering an informed, engaged, and
                                        progressive community through excellence in journalism.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>Committed to serving Khagaria since 2018</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 lg:py-24 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 mb-12 lg:mb-16"
                    >
                        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0">
                            What Drives Us
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold">Our Core Values</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            These principles guide every story we publish and every decision we make
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="border-0 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 h-full">
                                    <CardContent className="p-6 lg:p-8 text-center space-y-4">
                                        <div className="flex justify-center">
                                            <div className="p-3 bg-primary/10 rounded-xl">
                                                <value.icon className="w-6 h-6 text-primary" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-4 mb-12 lg:mb-16"
                    >
                        <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-0">
                            Meet Our Team
                        </Badge>
                        <h2 className="text-3xl lg:text-4xl font-bold">Dedicated Journalists</h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Our experienced team of journalists and reporters are committed to bringing you the best local news
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="border-0 bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 h-full group">
                                    <CardContent className="p-6 lg:p-8 text-center space-y-4">
                                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Users className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-bold">{member.name}</h3>
                                            <p className="text-primary font-medium">{member.role}</p>
                                            <p className="text-sm text-muted-foreground">{member.experience}</p>
                                            <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-700">
                                                {member.specialty}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {/* <section className="py-16 lg:py-24 bg-linear-to-r from-primary to-primary/90 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Stay Connected With Khagaria News 18
                        </h2>
                        <p className="text-lg text-white/90 max-w-2xl mx-auto">
                            Join thousands of informed readers who trust us for accurate and timely news from Khagaria and beyond.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
                    >
                        <a
                            href="/news"
                            className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                        >
                            Explore Latest News
                        </a>
                        <a
                            href="/contact"
                            className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300"
                        >
                            Contact Our Team
                        </a>
                    </motion.div>
                </div>
            </section> */}
        </div>
    );
}