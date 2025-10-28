import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import News from "@/models/News";
import jwt from "jsonwebtoken";

export const dynamic = "force-dynamic"; // ensures fresh data on each request

// ✅ GET — Fetch all news posts
export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // 🔹 Extract query params
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "6", 10);

        const skip = (page - 1) * limit;

        // 🔹 Fetch paginated + sorted (latest first)
        const total = await News.countDocuments();
        const newsList = await News.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return NextResponse.json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            data: newsList,
        });
    } catch (error) {
        console.error("GET /api/news error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch news" },
            { status: 500 }
        );
    }
}


// ✅ POST — Create a new news post (admin only)
export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const token = req.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        // Verify JWT
        try {
            jwt.verify(token, process.env.JWT_SECRET!);
        } catch {
            return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
        }

        const body = await req.json();
        let { title, slug, content, image, youtubeVideoId } = body;

        // ✅ Either image or YouTube link must be provided
        if (!title || !content || (!image && !youtubeVideoId)) {
            return NextResponse.json(
                { success: false, message: "Missing required fields (title, content, and either image or YouTube URL)" },
                { status: 400 }
            );
        }

        // 🧩 Auto-generate slug if not provided
        if (!slug) {
            slug = title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-");
        }

        // 🧩 Ensure slug uniqueness
        let uniqueSlug = slug;
        let counter = 1;
        while (await News.findOne({ slug: uniqueSlug })) {
            uniqueSlug = `${slug}-${counter++}`;
        }

        // ✅ Extract YouTube video ID if full URL is provided
        if (youtubeVideoId) {
            const match = youtubeVideoId.match(
                /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})/
            );
            if (match) youtubeVideoId = match[1];
        }

        const newPost = await News.create({
            title,
            slug: uniqueSlug,
            content,
            image,
            youtubeVideoId,
        });

        return NextResponse.json({ success: true, data: newPost }, { status: 201 });
    } catch (error) {
        console.error("POST /api/news error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to create post" },
            { status: 500 }
        );
    }
}

