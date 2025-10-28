// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // You can still protect API routes here if needed
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
        const token =
            req.cookies.get("token")?.value ||
            req.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/admin/:path*"], // Only protect backend APIs
};
