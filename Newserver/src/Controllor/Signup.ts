import  express,{Request,Response}  from "express";
import User from "../DATABASE/usermodel";
import bcrypt from 'bcrypt'
import generateToken from "../utils/Token";
import { Subscription } from "../DATABASE/subscriptionModel";


async function signup(req: Request, res: Response,) {
    try {

        const { username, fullname, email, password } = req.body
       // console.log(username,fullname,email,password)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(email)) {
            return res.status(400).json({ error: "invalid email format" })
        }
        const checkemail = await User.findOne({ email: email })
        const checkusername = await User.findOne({ username })

        if (checkemail || checkusername) {
            return res.status(400).json({ error: "Alredy existeer email or usrname" })
        }
        if (password.length < 6) {
            return res.status(500).json({ error: "password is very sort" })
        }

        const salt=await bcrypt.genSalt(10);
        const haspasword=await bcrypt.hash(password,salt)

        const subscription=new Subscription({
            planname: "normal", 
            startDate: new Date(),
            endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))

        })
        await subscription.save()

        const newUser=new User({
            
         username,
         fullname,
         email,
         password:haspasword,
         subcription:subscription.id

        })
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(200).json({message:"user created succesfully",user:newUser})
        }else{
            res.status(400).json({message:"invalid user Data"})
            
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server error" })

    }

}
export default signup

