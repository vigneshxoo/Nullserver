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
exports.clickvidoe = void 0;
const postmodel_1 = require("../DATABASE/postmodel");
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
const clickvidoe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the video by ID
        const clickvidoe = yield postmodel_1.Post.findById(id);
        if (!clickvidoe) {
            return res.status(400).json({ error: "Video not found" });
        }
        const postuser = yield usermodel_1.default.findById(clickvidoe.user);
        if (!postuser) {
            return res.status(400).json({ error: "Post user not found" });
        }
        console.log(postuser);
        const getVidoeAll = yield postmodel_1.Post.find({ _id: { $ne: id } });
        if (getVidoeAll.length === 0) {
            return res.status(400).json({ error: "No related videos found" });
        }
        res.status(200).json({ clickvidoe, getVidoeAll, postuser });
    }
    catch (error) {
        console.log("Error in click video controller:", error);
        return res.status(500).json({ error: "Error in click video controller" });
    }
});
exports.clickvidoe = clickvidoe;
