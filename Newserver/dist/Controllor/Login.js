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
exports.login = void 0;
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
const Token_1 = __importDefault(require("../utils/Token"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const subscriptionModel_1 = require("../DATABASE/subscriptionModel");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const loginuser = yield usermodel_1.default.findOne({ username });
        const ispassword = yield bcryptjs_1.default.compare(password, (loginuser === null || loginuser === void 0 ? void 0 : loginuser.password) || "");
        if (!loginuser) {
            return res.status(400).json({ error: "username incoorect" });
        }
        if (!ispassword) {
            return res.status(400).json({ error: "pasincorrect" });
        }
        if (!loginuser.subcription) {
            loginuser.subcription = new subscriptionModel_1.Subscription({
                planname: "normal",
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            });
        }
        loginuser.save();
        (0, Token_1.default)(loginuser._id, res);
        res.status(200).json({ message: 'login succesfully' });
    }
    catch (error) {
        console.log(`login errror${error}`);
        res.status(500).json({ error: "login server eroor" });
    }
});
exports.login = login;
