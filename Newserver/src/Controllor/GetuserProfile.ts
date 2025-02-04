import express, { Request, Response, NextFunction } from "express";
import User from "../DATABASE/usermodel";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

async function getme(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    console.log(req.user?._id)
    
    try {
        if (!req.user) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        const user = await User.findOne({ _id: req.user._id }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
       
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default getme;


