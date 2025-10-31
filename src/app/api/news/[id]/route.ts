import News from "@/models/News";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import slugify from "slugify";

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
        let { title, content, image, youtubeVideoId, slug } = body;

        // 1. Find the post we are trying to edit
        // ✅ CHANGE HERE: Find by ID
        const postToEdit = await News.findById(id);

        if (!postToEdit) {
            return NextResponse.json(
                { success: false, message: "News not found." },
                { status: 404 }
            );
        }

        // 2. Handle slug generation and conflicts
        if (!slug || slug.trim() === "" || slug === "-") {
            slug = title
            .normalize("NFKD")
            .replace(/[^\u0900-\u097FA-Za-z0-9\s-]/g, "") // keep Devanagari + English letters + numbers
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .toLowerCase();
        }

        let uniqueSlug = slug;
        let counter = 1;
        while (await News.findOne({ slug: uniqueSlug, _id: { $ne: postToEdit._id } })) {
            uniqueSlug = `${slug}-${counter++}`;
        }

        // 4. Perform update
        postToEdit.title = title;
        postToEdit.content = content;
        postToEdit.image = image || null;
        postToEdit.youtubeVideoId = youtubeVideoId || null;
        postToEdit.slug = uniqueSlug;

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

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> } // 1. Use 'id' from params
) {
    const { id } = await context.params; // 2. Destructure 'id'
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token)
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        jwt.verify(token, JWT_SECRET);
        await dbConnect();

        // 3. Use findByIdAndDelete with the 'id'
        const deleted = await News.findByIdAndDelete(id);

        if (!deleted)
            return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

        return NextResponse.json({ success: true, message: "Deleted successfully" });
    } catch (error) {
        console.error("DELETE /api/news/[id] error:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}