import mongoose, { Schema, Document } from "mongoose";

interface VideoDocument extends Document {
    title: string;
    description: string;
    url: string;
}

const videoSchema = new Schema<VideoDocument>(
    {
        title: {
            type: String,
            required: true, 
        },
        description: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Video = mongoose.model<VideoDocument>('Video', videoSchema);
export default Video;
export type { VideoDocument };
