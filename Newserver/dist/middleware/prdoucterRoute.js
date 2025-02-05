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
exports.producterRoute = producterRoute;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
function producterRoute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const scretkey = process.env.SECRET_KEY;
        // console.log(scretkey)
        try {
            const token = req.cookies.jwt;
            console.log(token);
            if (!scretkey) {
                return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
            }
            if (!token) {
                return res.status(400).json({ message: "Token not provided" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, scretkey);
            if (!decoded || !decoded.userId) {
                return res.status(401).json({ message: "Token unauthorized" });
            }
            console.log(decoded.userId);
            const userp = yield usermodel_1.default.findOne({ _id: decoded.userId }).select('-password');
            if (!userp) {
                return res.status(404).json({ message: "User not found" });
            }
            req.user = userp;
            next();
            //  res.status(200).json({ message: "User authenticated", userp });
        }
        catch (error) {
            console.error("Error verifying token:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
