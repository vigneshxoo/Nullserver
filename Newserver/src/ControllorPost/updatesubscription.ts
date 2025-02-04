import express, { Request, Response } from "express";
import { SubscriptionModel } from "../DATABASE/subscriptionModel";
import User from "../DATABASE/usermodel";

interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}

export const updatesubscription = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const currentUser = req.user?._id;
        const { newplan } = req.body;
        console.log(newplan);

        const validPlans = ["normal", "bronze", "gold"];

        if (!validPlans.includes(newplan.toLowerCase())) {
            return res.status(400).json({ error: "Invalid subscription plan" });
        }

        if (!currentUser) {
            return res.status(400).json({ error: "User not authenticated" });
        }

        const user = await User.findById(currentUser).populate("subcription");

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!user.subcription) {
            return res.status(400).json({ error: "User does not have a subscription plan" });
        }

        
        const subscription = user.subcription as SubscriptionModel;
        subscription.planname = newplan.toLowerCase();  
        await subscription.save();  

       
        await user.save();

        
        res.status(200).json({ message: "Subscription updated successfully", user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error while updating subscription", er: error });
    }
};
