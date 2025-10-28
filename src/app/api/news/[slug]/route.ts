import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import News from "@/models/News";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// GET → Fetch a single post by slug
export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params;

    try {
        await dbConnect();
        const post = await News.findOne({ slug });

        if (!post) {
            return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, news: post });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

// PUT → Update existing post (admin only)
export async function PUT(
    req: Request,
    context: { params: { slug: string } }
) {
    try {
        const { slug } = context.params;
        const token = req.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // ✅ Verify JWT
        try {
            jwt.verify(token, JWT_SECRET);
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        let { title, content, image, youtubeVideoId, slug : newSlug } = body;

        // ✅ Ensure title and content exist
        if (!title || !content) {
            return NextResponse.json(
                { success: false, message: "Title and content are required." },
                { status: 400 }
            );
        }

        // ✅ Extract YouTube video ID if a full URL is provided
        if (youtubeVideoId) {
            const match = youtubeVideoId.match(
                /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})/
            );
            if (match) youtubeVideoId = match[1];
        }

        // ✅ If newSlug is provided, check for conflicts
        if (newSlug && newSlug !== slug) {
            const existingSlug = await News.findOne({ slug: newSlug });
            if (existingSlug) {
                return NextResponse.json(
                    { success: false, message: "Slug already exists." },
                    { status: 409 }
                );
            }
        }

        // 🧩 Perform update
        const updated = await News.findOneAndUpdate(
            { slug },
            {
                title,
                content,
                image: image || null,
                youtubeVideoId: youtubeVideoId || null,
                slug: newSlug || slug, // ✅ overwrite slug if provided
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json(
                { success: false, message: "News not found." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, news: updated });
    } catch (error) {
        console.error("PUT /api/news/[slug] error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}

// DELETE → Delete post (admin only)
export async function DELETE(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params; // 👈 FIXED HERE
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        jwt.verify(token, JWT_SECRET);
        await dbConnect();

        const deleted = await News.findOneAndDelete({ slug });

        if (!deleted)
            return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
