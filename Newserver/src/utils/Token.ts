
import jwt from "jsonwebtoken"


const generateToken=(userId:any,res:any)=>{
    const scretkey=process.env.scretkey
    if(!scretkey){
        return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
    }

    const token=jwt.sign({userId},scretkey,{expiresIn:"2h"})
    res.cookie("jwt",token,{
        maxAge:15*24*60*1000, 
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="development"
    })
        
    

}
export default generateToken 