"use client";

import { useAtom } from "jotai";
import { themeAtom, ThemeMode } from "@/atoms/themeAtom";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const modes: ThemeMode[] = ["light", "dark", "system"];
const icons = {
    light: <Sun className="w-4 h-4" />,
    dark: <Moon className="w-4 h-4" />,
    system: <Monitor className="w-4 h-4" />,
};

export default function ThemeToggleButton() {
    const [theme, setTheme] = useAtom(themeAtom);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const toggleTheme = () => {
        const currentIndex = modes.indexOf(theme);
        const next = modes[(currentIndex + 1) % modes.length];
        setTheme(next);
        localStorage.setItem("theme", next);
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            title={`Switch theme (current: ${theme})`}
        >
            {icons[theme]}
        </Button>
    );
}
