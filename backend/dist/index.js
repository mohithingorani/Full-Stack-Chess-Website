"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT) || 8080;
const wss = new ws_1.WebSocketServer({ port: PORT });
const gameManager = new GameManager_1.GameManager();
console.log("Websocket server started at port", PORT);
wss.on("connection", function connection(ws) {
    gameManager.addUser(ws);
    ws.on("disconnect", () => {
        gameManager.removeUser(ws);
    });
});
