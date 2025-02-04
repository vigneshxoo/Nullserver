import express, { Request, Response } from "express";
import { Post } from "../DATABASE/postmodel";
import cloudinary from 'cloudinary'
import { io } from "../app";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

export async function delitePost(req: AuthenticatedRequest, res: Response) {
    try {
        const { id } = req.params;
        console.log(`Attempting to delete post with ID: ${id}`);

        // Check if post exists
        const post = await Post.findOne({ _id: id });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the current user is the owner of the post
        if (post.user.toString() !== req.user?._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to delete this post" });
        }

    
        if (post.img) {
            const videoId = post.img.split("/").pop()?.split(".")[0];
            if (videoId) {
                await cloudinary.v2.uploader.destroy(videoId);
                console.log(`Image deleted from Cloudinary: ${videoId}`);
            }
        }
        await Post.deleteOne({ _id: id });
        io.emit("postDeleted", { postId: id });

        res.status(200).json({ message: "Post deleted successfully" });

    } catch (error) {
        console.error(`Error in delete post controller: ${error}`);
        res.status(500).json({ error: "Internal server error  deleting post" });
    }
}
