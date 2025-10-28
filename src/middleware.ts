import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET!;

    // Protect all /admin routes
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        try {
            jwt.verify(token, JWT_SECRET);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"], // Apply only to /admin routes
};
