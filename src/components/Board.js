import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => (
  <div className="grid w-64 grid-cols-3 mx-auto">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
