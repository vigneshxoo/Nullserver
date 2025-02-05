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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delitePost = delitePost;
const postmodel_1 = require("../DATABASE/postmodel");
const cloudinary_1 = __importDefault(require("cloudinary"));
const app_1 = require("../app");
function delitePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { id } = req.params;
            console.log(`Attempting to delete post with ID: ${id}`);
            // Check if post exists
            const post = yield postmodel_1.Post.findOne({ _id: id });
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            // Check if the current user is the owner of the post
            if (post.user.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
                return res.status(401).json({ error: "Unauthorized to delete this post" });
            }
            if (post.img) {
                const videoId = (_b = post.img.split("/").pop()) === null || _b === void 0 ? void 0 : _b.split(".")[0];
                if (videoId) {
                    yield cloudinary_1.default.v2.uploader.destroy(videoId);
                    console.log(`Image deleted from Cloudinary: ${videoId}`);
                }
            }
            yield postmodel_1.Post.deleteOne({ _id: id });
            app_1.io.emit("postDeleted", { postId: id });
            res.status(200).json({ message: "Post deleted successfully" });
        }
        catch (error) {
            console.error(`Error in delete post controller: ${error}`);
            res.status(500).json({ error: "Internal server error  deleting post" });
        }
    });
}
