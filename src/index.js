import React from "react";
import ReactDOM from "react-dom";
import Game from "./components/Game";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <div className="flex items-center justify-center w-full h-screen py-8 bg-gray-200 dark:bg-gray-800">
    <Game />
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
