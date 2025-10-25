import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';
import dotenv from "dotenv"
dotenv.config();
const wss = new WebSocketServer({ port: Number(process.env.PORT) ||8080 });

const gameManager = new GameManager();


wss.on('connection', function connection(ws) {
    gameManager.addUser(ws)

    ws.on("disconnect",()=>{
        gameManager.removeUser(ws);
    })
});