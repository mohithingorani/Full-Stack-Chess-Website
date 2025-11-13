import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const WS_PORT = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port: WS_PORT });
import cors from "cors";

import signupRoute from "./routes/signup";

const app = express();

// Body parser middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// API ROUTES
app.use("/auth", signupRoute);

const gameManager = new GameManager();

console.log("Websocket server started at port", WS_PORT);

wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);

  ws.on("disconnect", () => {
    gameManager.removeUser(ws);
  });
});

const API_PORT = 5000;
app.listen(5000);