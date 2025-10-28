import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { token } = await req.json();
        const JWT_SECRET = process.env.JWT_SECRET!;

        const decoded = jwt.verify(token, JWT_SECRET);
        return NextResponse.json({ valid: true, user: decoded });
    } catch (error) {
        return NextResponse.json({ valid: false, error: "Invalid or expired token" }, { status: 401 });
    }
}
