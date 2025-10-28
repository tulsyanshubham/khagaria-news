import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const ADMIN_USER = process.env.ADMIN_USER;
    const ADMIN_PASS = process.env.ADMIN_PASS;
    const JWT_SECRET = process.env.JWT_SECRET!;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

        return NextResponse.json(
            { message: "Login successful", token },
            { status: 200 }
        );
    }

    return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
    );
}
