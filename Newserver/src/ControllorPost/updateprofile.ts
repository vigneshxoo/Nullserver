import express, { Request, Response } from "express";
import User from "../DATABASE/usermodel";
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from "cloudinary";
interface AuthenticatedRequest extends Request {
    user?: {
        _id: string;
    };
}
export const updateuser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?._id
        let { username, fullname, email, currentpassword, newpassword, bio } = req.body;
        let { profileImg, coverImg } = req.body
        let currentUser = await User.findById({ _id: userId })

        if (!currentUser) {
            return res.status(400).json({ error: "user  not found" })
        }

        if (!newpassword && currentpassword || !currentpassword && newpassword) {
            return res.status(400).json({ error: "please provide both filed are required" })
        }
        if (currentpassword && newpassword) {
            const ismatch = await bcrypt.compare(currentpassword, currentUser.password);
            if (!ismatch) {
                return res.status(400).json({ error: "current password incorrect" })
            }
            if (newpassword.length < 6) {
                return res.status(400).json({ error: "password must be 6 characters" })
            }
            const salt = await bcrypt.genSalt(10)
            currentUser.password = await bcrypt.hash(newpassword, salt)
        }
        if (profileImg) {
            if (currentUser.profileImg) {
                let imageId = currentUser.profileImg.split("/").pop()?.split(".")[0]
                if (imageId) {
                    await cloudinary.uploader.destroy(imageId);
                }
            }
            const profileImage = await cloudinary.uploader.upload(profileImg)

            currentUser.profileImg = profileImage.secure_url;
        }
        if (coverImg) {
            if (currentUser.coverImg) {
                let imageId = currentUser.coverImg.split("/").pop()?.split(".")[0]
                if (imageId) {
                    await cloudinary.uploader.destroy(imageId);
                }
            }
            const coverImage = await cloudinary.uploader.upload(coverImg)

            currentUser.coverImg = coverImage.secure_url;
        }

        currentUser.username = username || currentUser.username
        currentUser.fullname = fullname || currentUser.fullname
        currentUser.email = email || currentUser.email
        currentUser.bio = bio || currentUser.bio
        currentUser.profileImg = profileImg || currentUser.profileImg
        currentUser.coverImg = coverImg || currentUser.coverImg

        currentUser.save()
        //   
        return res.status(200).json({ message: "user updated successfully" })



    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error + "internal sever error" })

    }
}