"use client";

import { useState } from "react";
import { evaluate } from "mathjs";

export default function ScienceCal() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      const evalResult = evaluate(input);
      setResult(evalResult.toString());
    } catch {
      setResult("Error");
    }
  };

  const buttons = [
    ["SHIFT", "MODE", "DEL", "AC"],
    ["sin(", "cos(", "tan(", "log("],
    ["(", ")", "^", "√("],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "π", "+"],
    ["EXP", "Ans", "REPLAY", "="],
  ];

  return (
    <div className="container py-4 text-center">
      <h2 className=" fw-bold mb-3">CASIO fx-991MS (Replica)</h2>

      <div className="calc-body mx-auto shadow-lg p-3 rounded-4">
        {/* LCD Display */}
        <div className="calc-display mb-3">
          <div className="calc-top">
            <span className="input-text">{input || "0"}</span>
          </div>
          <div className="calc-bottom">
            <span className="result-text">{result}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="calc-buttons">
          {buttons.map((row, i) => (
            <div key={i} className="d-flex justify-content-between mb-2">
              {row.map((btn) => (
                <button
                  key={btn}
                  className={` btn-calc flex-fill mx-1 ${
                    btn === "AC"
                      ? "btn-danger"
                      : btn === "DEL"
                      ? "btn-warning"
                      : btn === "="
                      ? "btn-success"
                      : btn === "SHIFT"
                      ? "btn-shift"
                      : btn === "MODE"
                      ? "btn-mode"
                      : btn === "REPLAY"
                      ? "btn-replay"
                      : "btn-dark"
                  }`}
                  onClick={() => {
                    if (btn === "AC") handleClear();
                    else if (btn === "DEL") handleDelete();
                    else if (btn === "=") handleEqual();
                    else if (btn === "π") handleClick("pi");
                    else if (btn === "√(") handleClick("sqrt(");
                    else if (btn === "EXP") handleClick("E");
                    else if (btn === "Ans") handleClick(result);
                    else if (btn === "REPLAY") return; // non-functional yet
                    else handleClick(btn);
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
