import { Request, Response } from "express"
import { Post } from "../DATABASE/postmodel";
import User from "../DATABASE/usermodel";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

export const WatchVidoes = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const currentUser = req.user?._id;

        if (!currentUser) {
            return res.status(401).json({ error: "User is not authenticated" })
        }
        const user = await User.findById(currentUser).select("watchvidoes")
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        const watchedVideosDetails = await Post.find({
            _id: { $in: user.watchvidoes }
        });
        console.log(watchedVideosDetails)
        res.json(watchedVideosDetails);


    } catch (err) {
        console.log(err)
        return res.status(500).json({error:"internel server error"})
    }
}