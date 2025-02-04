import mongoose, { Schema, Document } from "mongoose";

// Define interface for Comment
interface IComment extends Document {
    text: string;
    like: mongoose.Types.ObjectId[];
    unlike: mongoose.Types.ObjectId[];
    user: mongoose.Types.ObjectId;
}

// Define interface for Post
interface IPost extends Document {
    user: mongoose.Types.ObjectId;
    text: string;
    img: string;
    video: string;
    like: mongoose.Types.ObjectId[];
    unlike: mongoose.Types.ObjectId[];
    comments: IComment[];
}

// Comment Schema
const commentSchema = new Schema<IComment>({
    text: { type: String, required: true },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    unlike: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Post Schema
const postSchema = new Schema<IPost>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    img: { type: String },
    video: { type: String },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    unlike: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
}, { timestamps: true });

// Export models with types
export const Post = mongoose.model<IPost>("Post", postSchema);

export const Comment = mongoose.model("Comment", commentSchema);
