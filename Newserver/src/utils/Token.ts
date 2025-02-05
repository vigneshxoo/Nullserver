
import jwt from "jsonwebtoken"


const generateToken=(userId:any,res:any)=>{
    const scretkey=process.env.SECRET_KEY
    if(!scretkey){
        return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
    }

    const token=jwt.sign({userId},scretkey,{expiresIn:"2h"})
    res.cookie("jwt",token,{
        maxAge:15*24*60*1000, 
        secure:true,
        httpOnly:true,
        sameSite: "None",
        
    })
        
    

}
export default generateToken 