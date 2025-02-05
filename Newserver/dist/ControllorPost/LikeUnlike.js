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
exports.likeunlike = void 0;
const postmodel_1 = require("../DATABASE/postmodel");
const mongoose_1 = require("mongoose");
const app_1 = require("../app");
const likeunlike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const postid = req.params.id;
        const currentuser = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { action } = req.body;
        //console.log(action)
        if (!currentuser) {
            return;
        }
        if (!postid) {
            return res.status(400).json({ error: "Post ID is required." });
        }
        if (!action || !["like", "unlike", "both"].includes(action)) {
            return res.status(400).json({ error: "'error action states" });
        }
        const post = yield postmodel_1.Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }
        // Normalize current user to string for consistent comparisons
        const currentUserId = currentuser.toString();
        if (action === "like") {
            console.log(action);
            if (!post.like.some((val) => val.toString() === currentUserId)) {
                post.like.push(new mongoose_1.Types.ObjectId(currentUserId));
            }
            post.unlike = post.unlike.filter((val) => val.toString() !== currentUserId);
        }
        else if (action === "unlike") {
            if (!post.unlike.some((val) => val.toString() === currentUserId)) {
                post.unlike.push(new mongoose_1.Types.ObjectId(currentUserId));
            }
            post.like = post.like.filter((val) => val.toString() !== currentUserId);
        }
        else if (action === "both") {
            post.like = post.like.filter((val) => val.toString() !== currentUserId);
            post.unlike = post.unlike.filter((val) => val.toString() !== currentUserId);
        }
        else {
            return "Invalid action. Allowed values are like, unlike or both";
        }
        yield post.save();
        app_1.io.emit('post', post);
        res.status(200).json({
            message: `Post successfully updated with action: ${action}`,
            post: {
                like: post.like,
                unlike: post.unlike,
            },
        });
    }
    catch (error) {
        console.error("Error in likeunlike controller:", error);
        res.status(500).json({ error: "Internal server error in like/unlike operation." });
    }
});
exports.likeunlike = likeunlike;
