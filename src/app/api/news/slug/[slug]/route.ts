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
// export async function PUT(
//     req: Request,
//     context: { params: { slug: string } }
// ) {
//     try {
//         const { slug } = context.params; // The ORIGINAL slug from the URL
//         const token = req.headers.get("authorization")?.split(" ")[1];

//         if (!token) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }

//         // ✅ Verify JWT
//         try {
//             jwt.verify(token, JWT_SECRET);
//         } catch {
//             return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//         }

//         await dbConnect();
//         const body = await req.json();
//         let { title, content, image, youtubeVideoId, slug: newSlug } = body;

//         // --- START OF NEW, SAFER LOGIC ---

//         // 1. Find the post we are trying to edit
//         const postToEdit = await News.findOne({ slug });

//         if (!postToEdit) {
//             return NextResponse.json(
//                 { success: false, message: "News not found." },
//                 { status: 404 }
//             );
//         }

//         // 2. Validate required fields
//         if (!title || !content) {
//             return NextResponse.json(
//                 { success: false, message: "Title and content are required." },
//                 { status: 400 }
//             );
//         }

//         // 3. Handle slug generation and conflicts
//         // If no new slug is provided, use the old one.
//         if (!newSlug) {
//             newSlug = slug;
//         }

//         // 4. Check for conflicts ONLY if the slug has changed
//         if (newSlug !== slug) {
//             const conflict = await News.findOne({
//                 slug: newSlug,
//                 _id: { $ne: postToEdit._id } // Check for a post with this slug, that IS NOT the current post
//             });

//             if (conflict) {
//                 return NextResponse.json(
//                     { success: false, message: "Slug already exists." },
//                     { status: 409 }
//                 );
//             }
//         }

//         // --- END OF NEW LOGIC ---

//         // 5. Extract YouTube video ID (your logic is fine)
//         if (youtubeVideoId) {
//             const match = youtubeVideoId.match(
//                 /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})/
//             );
//             if (match) youtubeVideoId = match[1];
//         }

//         // 6. Perform update by modifying the found document
//         // This is safer than findOneAndUpdate
//         postToEdit.title = title;
//         postToEdit.content = content;
//         postToEdit.image = image || null;
//         postToEdit.youtubeVideoId = youtubeVideoId || null;
//         postToEdit.slug = newSlug; // Set the new or old slug

//         const updated = await postToEdit.save();

//         return NextResponse.json({ success: true, news: updated });

//     } catch (error) {
//         console.error("PUT /api/news/[slug] error:", error);
//         return NextResponse.json(
//             { success: false, error: "Server error" },
//             { status: 500 }
//         );
//     }
// }

// DELETE → Delete post (admin only)
// export async function DELETE(
//     req: Request,
//     context: { params: Promise<{ slug: string }> }
// ) {
//     const { slug } = await context.params; // 👈 FIXED HERE
//     const token = req.headers.get("authorization")?.split(" ")[1];

//     if (!token)
//         return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     try {
//         jwt.verify(token, JWT_SECRET);
//         await dbConnect();

//         const deleted = await News.findOneAndDelete({ slug });

//         if (!deleted)
//             return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

//         return NextResponse.json({ success: true, message: "Deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
//     }
// }
