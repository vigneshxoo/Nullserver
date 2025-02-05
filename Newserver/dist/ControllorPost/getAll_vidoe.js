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
exports.getAll = getAll;
const postmodel_1 = require("../DATABASE/postmodel");
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const view = yield postmodel_1.Post.find().sort({ createdAt: -1 });
            if (view.length == 0) {
                return res.status(400).json([]);
            }
            res.status(200).json(view);
        }
        catch (error) {
            console.log(`error on get vidoe ${error}`);
            res.status(500).json({ error: "internal serveer error an all vidoes get" });
        }
    });
}
