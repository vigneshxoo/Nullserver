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
exports.WatchVidoes = void 0;
const postmodel_1 = require("../DATABASE/postmodel");
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
const WatchVidoes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const currentUser = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!currentUser) {
            return res.status(401).json({ error: "User is not authenticated" });
        }
        const user = yield usermodel_1.default.findById(currentUser).select("watchvidoes");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const watchedVideosDetails = yield postmodel_1.Post.find({
            _id: { $in: user.watchvidoes }
        });
        console.log(watchedVideosDetails);
        res.json(watchedVideosDetails);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "internel server error" });
    }
});
exports.WatchVidoes = WatchVidoes;
