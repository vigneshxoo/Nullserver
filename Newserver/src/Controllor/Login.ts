import express, { Request, Response } from "express";
import User from "../DATABASE/usermodel";
import generateToken from "../utils/Token";
import bcrypt from 'bcrypt';
import { Subscription } from "../DATABASE/subscriptionModel";


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body
        
        const loginuser = await User.findOne({ username })
        
        
        
        const ispassword = await bcrypt.compare(password, loginuser?.password || "");
        if (!loginuser) {
            return res.status(400).json({ error: "username incoorect" });
        }

        if (!ispassword) {
            return res.status(400).json({ error: "pasincorrect" });
        }
        if(!loginuser.subcription){
            loginuser.subcription= new Subscription( {
                planname:"normal",
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))

            })
        }
        loginuser.save()
        generateToken(loginuser._id, res)
     
        res.status(200).json({message:'login succesfully'})


    } catch (error) {
        console.log(`login errror${error}`)
        res.status(500).json({ error: "login server eroor" })

    }

}
