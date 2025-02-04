import Express, { Request, Response } from "express";
import { Post } from "../DATABASE/postmodel";
import User from "../DATABASE/usermodel";

export const clickvidoe = async (req: Request, res: Response) => {
    try {
        const { id }: any = req.params;
    
        // Find the video by ID
        const clickvidoe = await Post.findById(id);
        if (!clickvidoe) {
            return res.status(400).json({ error: "Video not found" });
        }

        
        const postuser = await User.findById(clickvidoe.user);
        if (!postuser) {
            return res.status(400).json({ error: "Post user not found" });
        }
        console.log(postuser);

        const getVidoeAll = await Post.find({ _id: { $ne: id } });
        if (getVidoeAll.length === 0) {
            return res.status(400).json({ error: "No related videos found" });
        }

        res.status(200).json({ clickvidoe, getVidoeAll,postuser });

    } catch (error) {
        console.log("Error in click video controller:", error);
        return res.status(500).json({ error: "Error in click video controller" });
    }
};
