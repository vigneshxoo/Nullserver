import express,{Application,Request,Response} from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cloudinary from "cloudinary";
import cors from 'cors';
import multer from 'multer';
import http from "http";
import cookieParser from "cookie-parser";
import { Server as SocketIOServer, Socket } from 'socket.io';
import connectdb from "./DATABASE/ConnectDb";
import { Allroute } from "./auth_routes/Routes";
dotenv.config()


cloudinary.v2.config({
    api_key: process.env.API_KEY,
    api_secret:process.env. API_SECRET_KEY,
    cloud_name:process.env. CLOUD_NAME,
    secure: true,
    timeout: 120000,
});

const app: Application = express();
const server = http.createServer(app); 


// Create an HTTP server to attach socket.io
export const io = new SocketIOServer(server,{
    cors: {
        origin: process.env.APLLICATION_URL,  // Allow your frontend URL
        methods: ['GET', 'POST'],        // Allow GET and POST methods
        credentials: true,               // Enable credentials (cookies)
    },
})  // Initialize socket.io


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage,limits: { fileSize: 10 * 1024 * 1024 }, });

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json())

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

connectdb();
app.use(Allroute);

// Socket.io connection event to listen for client connections
io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    // Handle disconnection event
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});



const PORT = process.env.PORT || 4000; // Use Vercel assigned port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
