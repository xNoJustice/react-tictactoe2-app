import React from "react";
import "../index.css";

const Square = ({ value, onClick }) => {
  const color = value === "X" ? "text-green-500" : "text-red-500";
  return (
    <div
      className="flex justify-center h-24 text-center align-middle border-2 border-indigo-500 cursor-pointer"
      onClick={() => onClick()}
    >
      <span
        className={`${color} font-extrabold flex items-center justify-center text-3xl`}
      >
        {value}
      </span>
    </div>
  );
};

export default Square;
