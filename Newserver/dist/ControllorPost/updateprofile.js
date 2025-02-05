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
exports.updateuser = void 0;
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cloudinary_1 = require("cloudinary");
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        let { username, fullname, email, currentpassword, newpassword, bio } = req.body;
        let { profileImg, coverImg } = req.body;
        let currentUser = yield usermodel_1.default.findById({ _id: userId });
        if (!currentUser) {
            return res.status(400).json({ error: "user  not found" });
        }
        if (!newpassword && currentpassword || !currentpassword && newpassword) {
            return res.status(400).json({ error: "please provide both filed are required" });
        }
        if (currentpassword && newpassword) {
            const ismatch = yield bcryptjs_1.default.compare(currentpassword, currentUser.password);
            if (!ismatch) {
                return res.status(400).json({ error: "current password incorrect" });
            }
            if (newpassword.length < 6) {
                return res.status(400).json({ error: "password must be 6 characters" });
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            currentUser.password = yield bcryptjs_1.default.hash(newpassword, salt);
        }
        if (profileImg) {
            if (currentUser.profileImg) {
                let imageId = (_b = currentUser.profileImg.split("/").pop()) === null || _b === void 0 ? void 0 : _b.split(".")[0];
                if (imageId) {
                    yield cloudinary_1.v2.uploader.destroy(imageId);
                }
            }
            const profileImage = yield cloudinary_1.v2.uploader.upload(profileImg);
            currentUser.profileImg = profileImage.secure_url;
        }
        if (coverImg) {
            if (currentUser.coverImg) {
                let imageId = (_c = currentUser.coverImg.split("/").pop()) === null || _c === void 0 ? void 0 : _c.split(".")[0];
                if (imageId) {
                    yield cloudinary_1.v2.uploader.destroy(imageId);
                }
            }
            const coverImage = yield cloudinary_1.v2.uploader.upload(coverImg);
            currentUser.coverImg = coverImage.secure_url;
        }
        currentUser.username = username || currentUser.username;
        currentUser.fullname = fullname || currentUser.fullname;
        currentUser.email = email || currentUser.email;
        currentUser.bio = bio || currentUser.bio;
        currentUser.profileImg = profileImg || currentUser.profileImg;
        currentUser.coverImg = coverImg || currentUser.coverImg;
        currentUser.save();
        //   
        return res.status(200).json({ message: "user updated successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error + "internal sever error" });
    }
});
exports.updateuser = updateuser;
