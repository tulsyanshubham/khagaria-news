import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import News from "@/models/News";

export async function GET(req: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const q = searchParams.get("q") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "6");

        // Build case-insensitive regex for partial match
        const query = q
            ? { title: { $regex: q, $options: "i" } }
            : {};

        const total = await News.countDocuments(query);
        const results = await News.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return NextResponse.json({
            success: true,
            data: results,
            total,
            page,
            limit,
        });
    } catch (error) {
        console.error("GET /api/news/search error:", error);
        return NextResponse.json(
            { success: false, message: "Search failed" },
            { status: 500 }
        );
    }
}
