import express, { Request, Response } from "express";
import { Post } from "../DATABASE/postmodel";
import mongoose from "mongoose";
import { io } from "../app";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const CommentsLike_unLike = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const postid = req.params.id; 
    const commentid = req.params.commentid;
    const currentuser = req.user?._id;
    const { action } = req.body; 
    //console.log(commentid)
    console.log(postid)
    console.log(action)

    if(!currentuser) {
      return res.status(400).json({ error: "Unauthorized: User not found." });
    }

    if (!postid || !commentid) {
      return res.status(400).json({ error: "Post ID or Comment ID is missing." });
    }

    if (!action || !["like", "unlike", "both"].includes(action)) {
      return res.status(400).json({ error: "Invalid action. Use like, unlike, or both." });
    }

    const post = await Post.findById(postid);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Find the Comment
    const comment = post.comments.find((c:any) => c._id.toString() === commentid);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    const currentUserId = currentuser.toString(); 

    if (action === "like") {
      if (!comment.like.some((id) => id.toString() === currentUserId)) {
        comment.like.push(new mongoose.Types.ObjectId(currentUserId));
      }
      comment.unlike = comment.unlike.filter((id) => id.toString() !== currentUserId);
    } else if (action === "unlike") {
      if (!comment.unlike.some((id) => id.toString() === currentUserId)) {
        comment.unlike.push(new mongoose.Types.ObjectId(currentUserId));
      }
      comment.like = comment.like.filter((id) => id.toString() !== currentUserId);
    } else if (action === "both") {
      comment.like = comment.like.filter((id) => id.toString() !== currentUserId);
      comment.unlike = comment.unlike.filter((id) => id.toString() !== currentUserId);
    }
    if (comment.unlike.length >= 2) {
      post.comments = post.comments.filter((c:any) => c._id.toString() !== commentid);
    }


    post.markModified("comments");
    await post.save();
    io.emit("post",post)

    res.status(200).json({
      message: `Comment successfully updated with action: ${action}`,
      comments: {
        like: comment.like,
        unlike: comment.unlike,
      },
    });
  } catch (error) {
    console.error("Error in CommentsLike_unLike controller:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
