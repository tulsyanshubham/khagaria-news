import mongoose, { Schema, Document, Model } from "mongoose";

export interface INews extends Document {
    title: string;
    slug: string;
    content: string;
    image?: string;
    youtubeVideoId?: string;
    createdAt: Date;
}

const NewsSchema: Schema<INews> = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        image: { type: String, required: false },
        youtubeVideoId: { type: String, required: false },
    },
    { timestamps: true } // enables createdAt and updatedAt fields
);

// Prevent model overwrite upon hot reloads
const News: Model<INews> =
    mongoose.models.News || mongoose.model<INews>("News", NewsSchema);

export default News;
