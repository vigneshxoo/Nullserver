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
const mongoose_1 = __importDefault(require("mongoose"));
const connectdb = () => __awaiter(void 0, void 0, void 0, function* () {
    const cluster = process.env.MONGO_URI || 'mongodb+srv://vigneshvicky07971:CfThkrBeZtLdQEf8@vickynull.jqd9i.mongodb.net/Addpoints?retryWrites=true&w=majority&appName=vickynull';
    const connectingStirng = process.env.DB || 'mongodb://localhost:27017/nullclas';
    //console.log(cluster)
    try {
        yield mongoose_1.default.connect(cluster);
        console.log("db connecting succesfully");
    }
    catch (error) {
        console.log("db error");
        console.log(error);
        process.exit(1);
    }
});
exports.default = connectdb;
