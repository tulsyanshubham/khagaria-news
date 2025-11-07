// app/not-found.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Newspaper, Home, Satellite, Signal } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-100 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-900/30 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
                
                {/* Floating Orbs */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"
                />
            </div>

            <div className="max-w-lg w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-8"
                >
                    {/* Animated Header */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: 0.3,
                                type: "spring",
                                stiffness: 100
                            }}
                            className="relative"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.6, 0.3],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-32 h-32 bg-primary/20 dark:bg-primary/10 rounded-full blur-xl"
                                />
                            </div>
                            
                            {/* Main Icon */}
                            <div className="relative">
                                <Newspaper className="w-24 h-24 text-primary mx-auto drop-shadow-lg" />
                                {/* <motion.div
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute -top-2 -right-2"
                                >
                                    <Satellite className="w-6 h-6 text-blue-500" />
                                </motion.div> */}
                            </div>
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="text-7xl font-black bg-linear-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent"
                            >
                                404
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="space-y-3"
                            >
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    Signal Lost
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-sm mx-auto leading-relaxed">
                                    This news feed appears to be offline. 
                                    Returning to headquarters...
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Connection Status */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        className="flex items-center justify-center gap-3 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Signal className="w-5 h-5 text-green-500" />
                        </motion.div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Connection stable • Redirect available
                        </div>
                    </motion.div> */}

                    {/* Main Action Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            duration: 0.6, 
                            delay: 1.1,
                            type: "spring",
                            stiffness: 200
                        }}
                    >
                        <Button 
                            asChild 
                            size="lg" 
                            className="group relative gap-3 px-8 py-6 text-lg font-semibold bg-linear-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-purple-600 dark:from-blue-600 dark:to-purple-600 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
                        >
                            <Link href="/">
                                {/* Button Shine Effect */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <motion.div
                                        animate={{
                                            x: [-100, 300],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: 2
                                        }}
                                        className="w-20 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                    />
                                </div>
                                
                                <Home className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                                <span className="relative z-10">Reconnect to News Feed</span>
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Technical Details */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.3 }}
                        className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
                    >
                        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                            <div>Error Code: 404 • Resource Not Found</div>
                            <div>Khagaria News 18 • Secure Connection ✓</div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}