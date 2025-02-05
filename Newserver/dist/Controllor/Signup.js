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
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Token_1 = __importDefault(require("../utils/Token"));
const subscriptionModel_1 = require("../DATABASE/subscriptionModel");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, fullname, email, password } = req.body;
            // console.log(username,fullname,email,password)
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(email)) {
                return res.status(400).json({ error: "invalid email format" });
            }
            const checkemail = yield usermodel_1.default.findOne({ email: email });
            const checkusername = yield usermodel_1.default.findOne({ username });
            if (checkemail || checkusername) {
                return res.status(400).json({ error: "Alredy existeer email or usrname" });
            }
            if (password.length < 6) {
                return res.status(500).json({ error: "password is very sort" });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const haspasword = yield bcryptjs_1.default.hash(password, salt);
            const subscription = new subscriptionModel_1.Subscription({
                planname: "normal",
                startDate: new Date(),
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            });
            yield subscription.save();
            const newUser = new usermodel_1.default({
                username,
                fullname,
                email,
                password: haspasword,
                subcription: subscription.id
            });
            if (newUser) {
                (0, Token_1.default)(newUser._id, res);
                yield newUser.save();
                res.status(200).json({ message: "user created succesfully", user: newUser });
            }
            else {
                res.status(400).json({ message: "invalid user Data" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "internal server error" });
        }
    });
}
exports.default = signup;
