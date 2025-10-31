// components/Footer.tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
    Facebook,
    Youtube,
    Mail,
    Phone,
    MapPin,
    Newspaper
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";

// X (Twitter) icon component since it's not in Lucide
const XIcon = ({ className }: { className?: string }) => (
    <svg 
        className={className} 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const Footer = () => {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            href: "https://facebook.com/khagarianews18",
            color: "hover:text-blue-600"
        },
        {
            name: "YouTube",
            icon: Youtube,
            href: "https://youtube.com/@khagarianews18",
            color: "hover:text-red-600"
        },
        {
            name: "X",
            icon: XIcon,
            href: "https://x.com/khagarianews18",
            color: "hover:text-gray-400"
        }
    ];

    return (
        <footer className={cn("bg-linear-to-br from-slate-900 via-gray-900 to-black text-white",pathname === "/login" || pathname.startsWith("/admin") ? "hidden" : "")}>
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary rounded-lg">
                                <Newspaper className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold">Khagaria News 18</h3>
                                <p className="text-primary text-sm font-medium">Trusted Local News</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-3 pt-2">
                            <div className="flex items-center gap-3 text-gray-300">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span className="text-sm">Khagaria, Bihar, India - 851204</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <Mail className="w-4 h-4 text-primary" />
                                <span className="text-sm">contact@khagarianews18.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                                <Phone className="w-4 h-4 text-primary" />
                                <span className="text-sm">+91 XXXXX XXXXX</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
                            <p className="text-gray-300 text-sm">
                                Follow us on social media for the latest updates and breaking news.
                            </p>
                            <div className="flex gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 ${social.color} group`}
                                        aria-label={`Follow us on ${social.name}`}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-around items-center gap-4">
                        <div className="text-gray-400 text-sm text-center md:text-left">
                            © {currentYear} Khagaria News 18. All rights reserved.
                            <span className="mx-2">•</span>
                            <span>Proudly serving Khagaria community</span>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <Link href="/" className={cn("hover:text-gray-100 transition-colors", pathname === "/" || pathname.startsWith("/news") ? "hidden" : "")}>
                                Home
                            </Link>
                            <Link href="/admin" className={cn("hover:text-gray-100 transition-colors", pathname === "/admin" ? "hidden" : "")}>
                                Admin Panel
                            </Link>
                            <Link href="/about" className={cn("hover:text-gray-100 transition-colors", pathname === "/about" ? "hidden" : "")}>
                                About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;