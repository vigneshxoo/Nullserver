"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.io = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const socket_io_1 = require("socket.io");
const ConnectDb_1 = __importDefault(require("./DATABASE/ConnectDb"));
const Routes_1 = require("./auth_routes/Routes");
dotenv_1.default.config();
cloudinary_1.default.v2.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
    cloud_name: process.env.CLOUD_NAME,
    secure: true,
    timeout: 120000,
});
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// Create an HTTP server to attach socket.io
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.APPLICATION_URL, // Allow your frontend URL
        methods: ['GET', 'POST'], // Allow GET and POST methods
        credentials: true, // Enable credentials (cookies)
    },
    transports: ['websocket', 'polling'],
}); // Initialize socket.io
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 }, });
app.use(body_parser_1.default.json({ limit: "10mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.APPLICATION_URL,
    credentials: true,
}));
(0, ConnectDb_1.default)();
app.use(Routes_1.Allroute);
// Socket.io connection event to listen for client connections
exports.io.on("connection", (socket) => {
    console.log("A user connected");
    // Handle disconnection event
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
const PORT = process.env.PORT || 4000;
exports.default = server;
