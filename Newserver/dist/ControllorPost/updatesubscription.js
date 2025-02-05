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
exports.updatesubscription = void 0;
const usermodel_1 = __importDefault(require("../DATABASE/usermodel"));
const updatesubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const currentUser = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const { newplan } = req.body;
        console.log(newplan);
        const validPlans = ["normal", "bronze", "gold"];
        if (!validPlans.includes(newplan.toLowerCase())) {
            return res.status(400).json({ error: "Invalid subscription plan" });
        }
        if (!currentUser) {
            return res.status(400).json({ error: "User not authenticated" });
        }
        const user = yield usermodel_1.default.findById(currentUser).populate("subcription");
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        if (!user.subcription) {
            return res.status(400).json({ error: "User does not have a subscription plan" });
        }
        const subscription = user.subcription;
        subscription.planname = newplan.toLowerCase();
        yield subscription.save();
        yield user.save();
        res.status(200).json({ message: "Subscription updated successfully", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error while updating subscription", er: error });
    }
});
exports.updatesubscription = updatesubscription;
