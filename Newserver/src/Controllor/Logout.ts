import express, { Request, Response, NextFunction } from "express";

async function logut(req: Request, res: Response, next: NextFunction) {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"logout succsfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "internal server eror" })
    }

}
export default logut
