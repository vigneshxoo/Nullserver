import { Request, Response } from "express";
import { Post } from "../DATABASE/postmodel";
import { io } from "../app";
import { upload } from "../middleware/Uploaded";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string; 
  };
}
export const videoUpload = upload.single("video");

export async function createpost(req: AuthenticatedRequest, res: Response) {
  let { text } = req.body
  console.log(text)
  console.log(req.file
  )

  try {
   
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "User is not authenticated" });
    }

    const currentUser = req.user._id;


    if (!text && !req.file) {
      return res.status(400).json({ error: "Post must have text or a video" });
    }

    let videoUrl = null;
    if (req.file) {
      videoUrl = req.file.path;
    }
  //  console.log(videoUrl)

    const newPost = new Post({
      user: currentUser,
      text,
      video: videoUrl,
    });

    await newPost.save();

   
    io.emit("newPost", newPost);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
