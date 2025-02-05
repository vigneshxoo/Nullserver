import  express,{Request,Response,NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { UserDocument } from "../DATABASE/usermodel";
import User from "../DATABASE/usermodel";

interface AuthenticatedRequest extends Request {
    user?: UserDocument;
}

export async function producterRoute(req: AuthenticatedRequest, res: Response, next: NextFunction)  {
    const scretkey=process.env.SECRET_KEY
    // console.log(scretkey)
    try {
      
        const token = req.cookies.jwt;
        console.log(token)
        if (!scretkey) {
            return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
        }

        if (!token) {
            return res.status(400).json({ message: "Token not provided" });
        }

        const decoded = jwt.verify(token, scretkey) as JwtPayload;

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Token unauthorized" });
        }
        console.log(decoded.userId)
        

        const userp = await User.findOne({ _id: decoded.userId }).select('-password')
        if (!userp) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user=userp
        next()
        //  res.status(200).json({ message: "User authenticated", userp });
        
        
  
  
    } catch (error) {
        console.error("Error verifying token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
