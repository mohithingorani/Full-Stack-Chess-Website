import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

const toChessNotation = (rowIndex:number, colIndex:number) => {
  const column = String.fromCharCode("a".charCodeAt(0) + colIndex);
  const row = 8 - rowIndex;
  return column + row;
};

export const ChessBoard = ({
  board,
  socket,
  setBoard,
  chess,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];

  socket: WebSocket;
  setBoard: any;
  chess: any;
}) => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const handleSquareClick = (rowIndex: number, columnIndex: number) => {
    const squareNotation = toChessNotation(rowIndex, columnIndex);
    if (!from) {
      setFrom(squareNotation);
    } else {
      const toSquare = squareNotation;
      setTo(toSquare);
      if (from && toSquare) {
        socket.send(
          JSON.stringify({
            type: "move",
            payload: {
                move: {
                    from,
                    to : toSquare
                },
            },
          })
        );
        console.log({
          from,
          to: toSquare,
        });
        setFrom(null);
        setTo(null);
        try{
            chess.move({
                from,
                to: toSquare,
              });
              setBoard(chess.board());
        }catch(e){
            console.log(e);
            alert("invalid move")
        }
        
      }
    }
  };

  return (
    <div className="text-white-200">
      {JSON.stringify({
        from,
        to,
      })}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((square, columnIndex) => (
            <div
              key={columnIndex}
              onClick={() => handleSquareClick(rowIndex, columnIndex)}
              className={`w-20 h-20 flex justify-center items-center ${
                (rowIndex + columnIndex) % 2 === 0
                  ? "bg-[#779556]"
                  : "bg-[#EBECD0]"
              }`}
            >
              {square?<img className="w-full p-3" src={`/${square?.color === "b"?square?.type:`${square?.type.toUpperCase()} copy`}.png`}/>:null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
