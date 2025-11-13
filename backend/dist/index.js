"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const WS_PORT = Number(process.env.PORT) || 8080;
const wss = new ws_1.WebSocketServer({ port: WS_PORT });
const cors_1 = __importDefault(require("cors"));
const signup_1 = __importDefault(require("./routes/signup"));
const app = (0, express_1.default)();
// Body parser middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
// API ROUTES
app.use("/auth", signup_1.default);
const gameManager = new GameManager_1.GameManager();
console.log("Websocket server started at port", WS_PORT);
wss.on("connection", function connection(ws) {
    gameManager.addUser(ws);
    ws.on("disconnect", () => {
        gameManager.removeUser(ws);
    });
});
const API_PORT = 5000;
app.listen(5000);
