import { Color, PieceSymbol, Square } from "chess.js";

export const ChessBoard = ({
  board,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}) => {
  return (
    <div className="text-white-200">
      {board.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="flex">
            {row.map((square, columnIndex) => {
              return (
                <div
                  key={columnIndex}
                  className={`w-20 h-20 flex justify-center items-center ${
                    (rowIndex + columnIndex) %2===0 ? "bg-[#779556]" : "bg-[#EBECD0]"
                  }` }
                >
                  {square ? square.type : ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
