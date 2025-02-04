import express, { Request, Response } from "express";
import { Post } from "../DATABASE/postmodel";
import { Types } from "mongoose";
import { io } from "../app";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

export const likeunlike = async (req: AuthenticatedRequest, res: Response) => {

    try {
        const postid = req.params.id;
        const currentuser = req.user?._id;
        const { action } = req.body;
        //console.log(action)
        if (!currentuser) {
            return
        }

        if (!postid) {
            return res.status(400).json({ error: "Post ID is required." });
        }

        if (!action || !["like", "unlike", "both"].includes(action)) {
            return res.status(400).json({ error: "'error action states" });
        }

        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        // Normalize current user to string for consistent comparisons
        const currentUserId = currentuser.toString();

        if (action === "like") {
            console.log(action)
            if (!post.like.some((val) => val.toString() === currentUserId)) {
                post.like.push(new Types.ObjectId(currentUserId));
            }
            post.unlike = post.unlike.filter((val) => val.toString() !== currentUserId);
        } else if (action === "unlike") {
            if (!post.unlike.some((val) => val.toString() === currentUserId)) {
                post.unlike.push(new Types.ObjectId(currentUserId));
            }
            post.like = post.like.filter((val) => val.toString() !== currentUserId);
        } else if (action === "both") {
            post.like = post.like.filter((val) => val.toString() !== currentUserId);
            post.unlike = post.unlike.filter((val) => val.toString() !== currentUserId);
        } else {
            return "Invalid action. Allowed values are like, unlike or both"

        }

        await post.save();
        io.emit('post',post)

        res.status(200).json({
            message: `Post successfully updated with action: ${action}`,
            post: {
                like: post.like,
                unlike: post.unlike,
            },
        });
    } catch (error) {
        console.error("Error in likeunlike controller:", error);
        res.status(500).json({ error: "Internal server error in like/unlike operation." });
    }
};