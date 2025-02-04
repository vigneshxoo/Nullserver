import express, { Request, Response } from "express";
import { Post } from "../DATABASE/postmodel";
import { Comment } from "../DATABASE/postmodel";
import { io } from "../app";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

export const comments = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { text } = req.body; // Comment text from the request body
        console.log(text)
        const postid = req.params.id; // Post ID from URL parameters
        const currentuser = req.user?._id; // Current user ID (from authenticated request)


        if (!text) {
            return res.status(400).json({ error: "Comment text is required." });
        }


        if (!currentuser) {
            return res.status(401).json({ error: "You must be logged in to comment." });
        }

        const post = await Post.findOne({ _id: postid });
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        const comment = new Comment({
            user: currentuser,
            text: text,
            like: [],
            unlike: [],
        });

        post.comments.push(comment);


        await post.save();
        io.emit("post", post)

        res.status(200).json(post);

    } catch (error) {
        console.error("Error on comment controller:", error);
        res.status(500).json({ error: "Internal server error in the comments section." });
    }
};
