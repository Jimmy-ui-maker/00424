"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const LETTER_VALUES = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

// Word categories by difficulty
const WORDS = {
  simple: [
    "CAT",
    "DOG",
    "SUN",
    "TREE",
    "BOOK",
    "MOON",
    "BALL",
    "LOVE",
    "GAME",
    "CODE",
  ],
  medium: [
    "HOUSE",
    "APPLE",
    "BRIGHT",
    "GARDEN",
    "MONEY",
    "TABLE",
    "SCHOOL",
    "PENCIL",
    "FRIEND",
  ],
  hard: [
    "JAVASCRIPT",
    "ELEPHANT",
    "COMPUTER",
    "ARCHITECT",
    "KNOWLEDGE",
    "PYTHON",
    "ASTRONAUT",
  ],
};

export default function ScrabbleGame({ user }) {
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const difficulty = user?.difficulty || "simple";
  const MAX_ROUNDS = 10;

  // helper: generate tiles based on difficulty
  const generateTiles = () => {
    const letters =
      difficulty === "simple"
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, 12)
        : difficulty === "medium"
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, 20)
        : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let arr = [];
    for (let i = 0; i < (difficulty === "hard" ? 9 : 7); i++) {
      arr.push(letters[Math.floor(Math.random() * letters.length)]);
    }
    setTiles(arr);
    setSelected([]);
  };

  // start new round
  const nextRound = () => {
    if (round >= MAX_ROUNDS) {
      setGameOver(true);
      return;
    }
    setRound(round + 1);
    setMessage("");
    generateTiles();
  };

  // check word validity and score
  const checkWord = () => {
    const word = selected.join("");
    const validWords = WORDS[difficulty];
    if (!word) {
      setMessage("❗Pick some letters first!");
      return;
    }

    if (validWords.includes(word)) {
      let wordScore = 0;
      word.split("").forEach((ch) => (wordScore += LETTER_VALUES[ch]));
      setScore(score + wordScore);
      setMessage(`✅ "${word}" is valid! +${wordScore} pts`);
      setTimeout(nextRound, 1000);
    } else {
      setMessage(`❌ "${word}" is not in the list!`);
    }
  };

  // reset game
  const restartGame = () => {
    setScore(0);
    setRound(1);
    setMessage("");
    setGameOver(false);
    generateTiles();
  };

  useEffect(() => {
    generateTiles();
  }, []);

  // render game over
  if (gameOver) {
    return (
      <div className="container py-5 text-center">
        <div
          className="card shadow-lg mx-auto p-4"
          style={{ maxWidth: "500px" }}
        >
          <h2>🏁 Game Over!</h2>
          <h4 className="my-3">Final Score: {score}</h4>
          <p>Great job, {user?.name || "Player"}!</p>
          <div className="d-flex flex-column gap-2 mt-3">
            <button onClick={restartGame} className="btn btn-success">
              🔁 Restart Game
            </button>
            <Link href="/games" className="btn btn-outline-primary">
              🎮 Back to Games
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 text-center">
      <div className="card shadow-lg mx-auto p-4" style={{ maxWidth: "700px" }}>
        <h2 className="mb-3">🔡 Scrabble Challenge</h2>
        <p className="">
          Player: {user?.name || "Guest"} | Difficulty:{" "}
          <strong
            className={
              difficulty === "hard"
                ? "text-danger"
                : difficulty === "medium"
                ? "text-warning"
                : "text-success"
            }
          >
            {difficulty.toUpperCase()}
          </strong>
        </p>

        <div className="d-flex justify-content-between mb-2">
          <p>🏆 Score: {score}</p>
          <p>
            🕹️ Round: {round}/{MAX_ROUNDS}
          </p>
        </div>

        {/* 🔤 Display all possible valid words */}
        <div
          className=" rounded p-2 mb-3"
          style={{ background: "" }}
        >
          <h6 className=" mb-2">Valid Words ({difficulty}):</h6>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {WORDS[difficulty].map((w, i) => (
              <span key={i} className="badge text-success ">
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="my-3">
          {tiles.map((tile, i) => (
            <button
              key={i}
              onClick={() =>
                setSelected((prev) =>
                  prev.includes(tile)
                    ? prev.filter((t, idx) => idx !== prev.indexOf(tile))
                    : [...prev, tile]
                )
              }
              className={`btn btn-lg m-1 ${
                selected.includes(tile) ? "btn-success" : "btn-outline-dark"
              }`}
            >
              {tile}
              <small
                className="d-block "
                style={{ fontSize: "0.7rem" }}
              >
                {LETTER_VALUES[tile]}
              </small>
            </button>
          ))}
        </div>

        <h4 className="my-2 text-primary">
          Word: {selected.join("") || "---"}
        </h4>

        <div className="d-flex flex-column gap-2 mt-3">
          <button onClick={checkWord} className="btn btn-primary mb-2 w-100">
            ✅ Check Word
          </button>
          <button onClick={generateTiles} className="btn btn-warning w-100">
            🔄 Shuffle / New Tiles
          </button>
        </div>

        <p className="mt-3 fs-5">{message}</p>
      </div>
    </div>
  );
}
