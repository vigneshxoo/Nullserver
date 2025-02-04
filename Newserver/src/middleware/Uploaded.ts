import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => ({
    resource_type: "video", // Set resource type
    public_id: `video_${Date.now()}`, // Generate unique name for the video
    format: "mp4", // Set the format for the video
    folder: "posts", // Specify the folder in Cloudinary
  }),
});

export const upload = multer({ storage });