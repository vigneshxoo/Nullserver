import  express,{Request,Response}  from "express";
import { Post } from "../DATABASE/postmodel";

 export async function getAll(req:Request,res:Response) {
    try {
        const view=await Post.find().sort({ createdAt: -1 })
      if(view.length==0){
        return res.status(400).json([])
      }
      res.status(200).json(view)
        
    } catch (error) {
        console.log(`error on get vidoe ${error}`)
        res.status(500).json({error:"internal serveer error an all vidoes get"})
        
    }
    
}