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
exports.comments = void 0;
const postmodel_1 = require("../DATABASE/postmodel");
const postmodel_2 = require("../DATABASE/postmodel");
const app_1 = require("../app");
const comments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { text } = req.body; // Comment text from the request body
        console.log(text);
        const postid = req.params.id; // Post ID from URL parameters
        const currentuser = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Current user ID (from authenticated request)
        if (!text) {
            return res.status(400).json({ error: "Comment text is required." });
        }
        if (!currentuser) {
            return res.status(401).json({ error: "You must be logged in to comment." });
        }
        const post = yield postmodel_1.Post.findOne({ _id: postid });
        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }
        const comment = new postmodel_2.Comment({
            user: currentuser,
            text: text,
            like: [],
            unlike: [],
        });
        post.comments.push(comment);
        yield post.save();
        app_1.io.emit("post", post);
        res.status(200).json(post);
    }
    catch (error) {
        console.error("Error on comment controller:", error);
        res.status(500).json({ error: "Internal server error in the comments section." });
    }
});
exports.comments = comments;
