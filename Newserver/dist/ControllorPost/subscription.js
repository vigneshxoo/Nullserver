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
exports.subcriptionfun = void 0;
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
const postmodel_1 = require("../DATABASE/postmodel");
const subcriptionfun = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const currentUser = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!currentUser) {
            return res.status(400).json({ error: "user not authedicaed" });
        }
        const user = yield usermodel_1.default.findById(currentUser).populate({ path: 'subcription' });
        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }
        console.log(user);
        const planname = user.subcription.planname;
        console.log(planname);
        let timeLimit = 5;
        if (planname === "bronze") {
            timeLimit = 7;
        }
        else if (planname === "gold") {
            timeLimit = "unlimited";
        }
        const post = yield postmodel_1.Post.find().sort({ createdAt: -1 });
        if (post.length === 0) {
            return res.status(200).json({ posts: [], timeLimit });
        }
        res.status(200).json({ post, timeLimit });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error while fetching videos", er: error });
    }
});
exports.subcriptionfun = subcriptionfun;
