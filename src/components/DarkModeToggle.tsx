"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    // Check if we're currently in dark mode (respects system theme)
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";

    return (
        <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-primary text-white dark:bg-yellow-400 dark:text-gray-900 hover:scale-110 transition-transform duration-300"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </motion.button>
    );
}