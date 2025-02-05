"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, res) => {
    const scretkey = process.env.SECRET_KEY;
    if (!scretkey) {
        return res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
    }
    const token = jsonwebtoken_1.default.sign({ userId }, scretkey, { expiresIn: "2h" });
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
};
exports.default = generateToken;
