import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
    throw new Error("⚠️ Please define the MONGO_URI environment variable in .env.local");
}

// To avoid multiple connections during Next.js hot reloads in dev
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export const dbConnect = async (): Promise<typeof mongoose> => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            dbName: "newsapp",
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
};
