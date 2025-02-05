"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: (req, file) => ({
        resource_type: "video", // Set resource type
        public_id: `video_${Date.now()}`, // Generate unique name for the video
        format: "mp4", // Set the format for the video
        folder: "posts", // Specify the folder in Cloudinary
    }),
});
exports.upload = (0, multer_1.default)({ storage });
