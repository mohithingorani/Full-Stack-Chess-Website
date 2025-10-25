import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import dotenv from "dotenv";
dotenv.config();
const PORT = Number(process.env.PORT) || 8080;
const wss = new WebSocketServer({ port: PORT });

const gameManager = new GameManager();

console.log("Websocket server started at port",PORT);

wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);

  ws.on("disconnect", () => {
    gameManager.removeUser(ws);
  });
});
