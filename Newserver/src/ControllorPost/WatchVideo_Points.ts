import express, { Request, Response } from "express";
import User from "../DATABASE/usermodel";
import { io } from "../app";


interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
export async function AddPointes(req: AuthenticatedRequest, res: Response) {
    try {
        const { vidoeId } = req.body
        console.log(vidoeId)
        const currentuser = req.user?._id
        if (!currentuser) {
            return res.status(401).json({ error: "Unauthorized access" });
        }
    
        if (!vidoeId) {
            return res.status(400).json({ error: "Video ID is required" });
        }

        const user = await User.findOne({ _id: currentuser }).select('-password')
        if (!user) {
            return res.status(400).json({ error: "user not found" })
        }
        const check = user.watchvidoes.includes(vidoeId)
        if (check) {
            return res.status(200).json("no points")
            // return res.status(200).json("you alredy watch tha vidoe")
        } else {
            user.watchvidoes.push(vidoeId)
            user.points = (user.points as number) + 5
            await user.save()
            io.emit('user',user)
            res.status(200).json({ message: "congrats you earn five points" })

        }

    } catch (error) {
        console.log(`internal server error add points ${error}`)
        res.status(500).json({ error: "internal server error in add points" })

    }

}