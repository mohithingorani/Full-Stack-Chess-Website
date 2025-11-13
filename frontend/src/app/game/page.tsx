"use client"
import { useSocket } from "@/hooks/useSocket";
import { ChessBoard } from "../components/ChessBoard";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER =   "game_over";

export default function Game() {
    const socket = useSocket();
    const [chess,setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);
    useEffect(()=>{
        if(!socket){
            console.log("cant connect to socket")
            return;
        } 
        socket.onmessage = (event)=>{
            const message = JSON.parse(event.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    console.log("Game initialized");
                    setStarted(true)
                    break;
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move Made");
                case GAME_OVER:
                    console.log("Game Over");
                    break;
            }
        }
    },[socket]);

    if(!socket){
        return <div>Connecting....</div>
    }
  return (
    <div className="h-screen w-full bg-blue-950">
      <div className="flex justify-center">
        <div className="pt-8 max-w-screen-lg flex w-full">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6 w-full">
            <div className="col-span-4  w-full flex justify-center">
              <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} />
            </div>
            <div className="col-span-2 bg-green w-full">
              {!started&&<button onClick={()=>{
                socket.send(JSON.stringify({
                    type: INIT_GAME
                }))
              }}>Play</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
