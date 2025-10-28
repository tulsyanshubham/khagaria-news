import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import News from "@/models/News";

export async function GET() {
    try {
        await dbConnect();

        const total = await News.countDocuments();

        return NextResponse.json({
            success: true,
            total,
        });
    } catch (error) {
        console.error("GET /api/news/count error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to count news" },
            { status: 500 }
        );
    }
}
