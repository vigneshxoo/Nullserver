import  express,{Request,Response}from "express";
import { SubscriptionModel } from "../DATABASE/subscriptionModel";
import User from "../DATABASE/usermodel";
import { Post } from "../DATABASE/postmodel";

interface AuthenticatedRequest extends Request {
    user?: {
      _id: string;
    };
  }

 export const subcriptionfun=async(req:AuthenticatedRequest,res:Response)=>{
    try {
        const currentUser=req.user?._id
        if(!currentUser){
            return res.status(400).json({error:"user not authedicaed"})
        }

        const user=await User.findById(currentUser).populate({ path:'subcription'})
        
        
        if(!user){
            return res.status(400).json({error:"user not found"})
        }
        console.log(user)
        
        const planname=(user.subcription as SubscriptionModel).planname 
        console.log(planname)
        let timeLimit:any=5;

        if(planname==="bronze"){
            timeLimit=7

        }else if(planname==="gold"){
            timeLimit="unlimited"
        }
        const post=await Post.find().sort({ createdAt: -1 })

        if (post.length === 0) {
            return res.status(200).json({ posts: [], timeLimit });
          }
          res.status(200).json({ post, timeLimit });
        
    } catch (error) {
     
        console.log(error)
    res.status(500).json({ error: "Internal server error while fetching videos",er:error });
    }

  }