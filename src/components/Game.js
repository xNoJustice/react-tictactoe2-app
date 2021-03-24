import React, { useEffect, useState } from "react";
import Board from "./Board";
import Winner from "./Winner";
import { findBestMove } from "./AI";
import logo from "./logo.svg";
import "./logo.css";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = Winner(history[stepNumber], stepNumber);
  const x0 = xIsNext ? "X" : "O";
  const [gameType, setGameType] = useState("");

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];

    if (winner || squares[i]) return;
    squares[i] = x0;

    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };
  useEffect(() => {
    if (x0 === "X" && gameType === "PC") {
      const historyPoint = history.slice(0, stepNumber + 1);
      const current = historyPoint[stepNumber];
      const squares = [...current];
      const i = findBestMove(squares, x0);
      if (winner || squares[i]) return;
      squares[i] = x0;

      setHistory([...historyPoint, squares]);
      setStepNumber(historyPoint.length);
      setXisNext(!xIsNext);
    }
  }, [x0, gameType, history, stepNumber, winner, xIsNext]);

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <button
          key={move}
          className="block p-2 my-1 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => jumpTo(move)}
        >
          {destination}
        </button>
      );
    });

  const reset = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXisNext(true);
  };

  const changeGameType = (type) => {
    setGameType(type);
    reset();
  };

  const resetButton = () => {
    return (
      <button
        className="p-2 my-1 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={() => reset()}
      >
        New Game
      </button>
    );
  };

  const nextText = () => {
    if (x0 === "X") {
      let text = "Next Player: " + x0;
      return <span className="text-green-500">{text}</span>;
    } else {
      let text = "Next Player: " + x0;
      return <span className="text-red-500">{text}</span>;
    }
  };

  const winnerText = () => {
    if (winner === "draw") {
      return "It's a draw!";
    } else {
      return "Winner : " + winner;
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-800">
        <div className="flex flex-col justify-between max-h-full min-h-full overflow-hidden text-gray-800 bg-white bg-center dark:text-gray-50 dark:bg-gray-800 w-72 sm:w-96">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="mt-3 mb-3 text-2xl font-semibold text-center text-black dark:text-gray-100 tracking-ringtighter sm:text-2xl title-font">
            TicTacToe App
          </h1>
          <div className="flex justify-center">
            <button
              className={
                gameType === "PLAYER"
                  ? "p-2 m-1 font-semibold text-center text-white transition duration-200 ease-in bg-indigo-900 rounded-lg shadow-md p-2text-base hover:bg-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-1 focus:ring-offset-1"
                  : "p-2 m-1 font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md p-2text-base hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-1 focus:ring-offset-1"
              }
              onClick={() => changeGameType("PLAYER")}
            >
              Player vs Player
            </button>
            <button
              className={
                gameType === "PC"
                  ? "p-2 m-1 font-semibold text-center text-white transition duration-200 ease-in bg-indigo-900 rounded-lg shadow-md p-2text-base hover:bg-indigo-800 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-1 focus:ring-offset-1"
                  : "p-2 m-1 font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md p-2text-base hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-1 focus:ring-offset-1"
              }
              onClick={() => changeGameType("PC")}
            >
              Player vs Computer
            </button>
          </div>
          <div className="flex justify-center">{resetButton()}</div>
          <h3 className="block mb-2 text-2xl font-bold text-center">
            {winner ? winnerText() : nextText()}
          </h3>
          <Board squares={history[stepNumber]} onClick={handleClick} />
        </div>
        <div className="flex flex-col items-center justify-center h-full overflow-hidden text-gray-800 bg-white bg-center dark:text-gray-50 dark:bg-gray-800 w-36 sm:w-48">
          <div>
            <h2 className="p-2 text-2xl font-bold dark:text-gray-50">
              History
            </h2>
            {renderMoves()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
