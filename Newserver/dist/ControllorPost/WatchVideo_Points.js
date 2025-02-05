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
exports.AddPointes = AddPointes;
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
const app_1 = require("../app");
function AddPointes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { vidoeId } = req.body;
            console.log(vidoeId);
            const currentuser = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!currentuser) {
                return res.status(401).json({ error: "Unauthorized access" });
            }
            if (!vidoeId) {
                return res.status(400).json({ error: "Video ID is required" });
            }
            const user = yield usermodel_1.default.findOne({ _id: currentuser }).select('-password');
            if (!user) {
                return res.status(400).json({ error: "user not found" });
            }
            const check = user.watchvidoes.includes(vidoeId);
            if (check) {
                return res.status(200).json("no points");
                // return res.status(200).json("you alredy watch tha vidoe")
            }
            else {
                user.watchvidoes.push(vidoeId);
                user.points = user.points + 5;
                yield user.save();
                app_1.io.emit('user', user);
                res.status(200).json({ message: "congrats you earn five points" });
            }
        }
        catch (error) {
            console.log(`internal server error add points ${error}`);
            res.status(500).json({ error: "internal server error in add points" });
        }
    });
}
