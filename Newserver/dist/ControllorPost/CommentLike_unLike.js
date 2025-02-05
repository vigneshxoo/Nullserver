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
exports.CommentsLike_unLike = void 0;
const postmodel_1 = require("../DATABASE/postmodel");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("../app");
const CommentsLike_unLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const postid = req.params.id;
        const commentid = req.params.commentid;
        const currentuser = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { action } = req.body;
        //console.log(commentid)
        console.log(postid);
        console.log(action);
        if (!currentuser) {
            return res.status(400).json({ error: "Unauthorized: User not found." });
        }
        if (!postid || !commentid) {
            return res.status(400).json({ error: "Post ID or Comment ID is missing." });
        }
        if (!action || !["like", "unlike", "both"].includes(action)) {
            return res.status(400).json({ error: "Invalid action. Use like, unlike, or both." });
        }
        const post = yield postmodel_1.Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }
        // Find the Comment
        const comment = post.comments.find((c) => c._id.toString() === commentid);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }
        const currentUserId = currentuser.toString();
        if (action === "like") {
            if (!comment.like.some((id) => id.toString() === currentUserId)) {
                comment.like.push(new mongoose_1.default.Types.ObjectId(currentUserId));
            }
            comment.unlike = comment.unlike.filter((id) => id.toString() !== currentUserId);
        }
        else if (action === "unlike") {
            if (!comment.unlike.some((id) => id.toString() === currentUserId)) {
                comment.unlike.push(new mongoose_1.default.Types.ObjectId(currentUserId));
            }
            comment.like = comment.like.filter((id) => id.toString() !== currentUserId);
        }
        else if (action === "both") {
            comment.like = comment.like.filter((id) => id.toString() !== currentUserId);
            comment.unlike = comment.unlike.filter((id) => id.toString() !== currentUserId);
        }
        if (comment.unlike.length >= 2) {
            post.comments = post.comments.filter((c) => c._id.toString() !== commentid);
        }
        post.markModified("comments");
        yield post.save();
        app_1.io.emit("post", post);
        res.status(200).json({
            message: `Comment successfully updated with action: ${action}`,
            comments: {
                like: comment.like,
                unlike: comment.unlike,
            },
        });
    }
    catch (error) {
        console.error("Error in CommentsLike_unLike controller:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});
exports.CommentsLike_unLike = CommentsLike_unLike;
