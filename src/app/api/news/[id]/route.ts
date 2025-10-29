import News from "@/models/News";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> } // Changed from slug
) {
    const { id } = await context.params; // Changed from slug

    try {
        await dbConnect();
        // ✅ CHANGE HERE: Find by ID
        const post = await News.findById(id);

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
    context: { params: Promise<{ id: string }> } // Changed from slug
) {
    try {
        const { id } = await context.params; // The ID from the URL
        // ... token validation (same as before) ...

        await dbConnect();
        const body = await req.json();
        let { title, content, image, youtubeVideoId, slug: newSlug } = body;

        // 1. Find the post we are trying to edit
        // ✅ CHANGE HERE: Find by ID
        const postToEdit = await News.findById(id);

        if (!postToEdit) {
            return NextResponse.json(
                { success: false, message: "News not found." },
                { status: 404 }
            );
        }

        // ... rest of your validation logic ...

        // 2. Handle slug generation and conflicts
        if (!newSlug) {
            newSlug = postToEdit.slug; // Keep old slug if new one isn't provided
        }

        // 3. Check for conflicts ONLY if the slug has changed
        if (newSlug !== postToEdit.slug) {
            const conflict = await News.findOne({
                slug: newSlug,
                _id: { $ne: postToEdit._id } // Your correct logic!
            });

            if (conflict) {
                return NextResponse.json(
                    { success: false, message: "Slug already exists." },
                    { status: 409 }
                );
            }
        }

        // 4. Perform update
        postToEdit.title = title;
        postToEdit.content = content;
        postToEdit.image = image || null;
        postToEdit.youtubeVideoId = youtubeVideoId || null;
        postToEdit.slug = newSlug;

        const updated = await postToEdit.save();

        return NextResponse.json({ success: true, news: updated });

    } catch (error) {
        console.error("PUT /api/news/[id] error:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}