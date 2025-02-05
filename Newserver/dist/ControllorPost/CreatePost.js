"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoUpload = void 0;
exports.createpost = createpost;
const postmodel_1 = require("../DATABASE/postmodel");
const app_1 = require("../app");
const Uploaded_1 = require("../middleware/Uploaded");
exports.videoUpload = Uploaded_1.upload.single("video");
function createpost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { text } = req.body;
        console.log(text);
        console.log(req.file);
        try {
            if (!req.user || !req.user._id) {
                return res.status(401).json({ error: "User is not authenticated" });
            }
            const currentUser = req.user._id;
            if (!text && !req.file) {
                return res.status(400).json({ error: "Post must have text or a video" });
            }
            let videoUrl = null;
            if (req.file) {
                videoUrl = req.file.path;
            }
            //  console.log(videoUrl)
            const newPost = new postmodel_1.Post({
                user: currentUser,
                text,
                video: videoUrl,
            });
            yield newPost.save();
            app_1.io.emit("newPost", newPost);
            res.status(201).json(newPost);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
