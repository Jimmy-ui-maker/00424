"use client";
import { useState, useEffect } from "react";

export default function TicTacToe({ user }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameOver(false);
    setWinner(null);
  };

  const calculateWinner = (b) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b1, c] = line;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || gameOver || !xIsNext) return;
    makeMove(index, "X");
  };

  const makeMove = (index, player) => {
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const w = calculateWinner(newBoard);
    if (w) {
      setWinner(w);
      setGameOver(true);
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
      setGameOver(true);
    } else {
      setXIsNext(player === "O");
    }
  };

  // AI logic
  useEffect(() => {
    if (xIsNext || gameOver) return;

    const aiMove = () => {
      let index;

      switch (user.difficulty) {
        case "simple":
          index = randomMove(board);
          break;
        case "medium":
          index = mediumMove(board);
          break;
        case "hard":
          index = minimaxMove(board);
          break;
        default:
          index = randomMove(board);
      }
      makeMove(index, "O");
    };

    const timeout = setTimeout(aiMove, 500);
    return () => clearTimeout(timeout);
  }, [xIsNext, board, gameOver, user.difficulty]);

  const randomMove = (b) => {
    const empty = b.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
  };

  const mediumMove = (b) => {
    const winMove = findWinningMove(b, "O");
    if (winMove !== null) return winMove;
    const blockMove = findWinningMove(b, "X");
    if (blockMove !== null) return blockMove;
    return randomMove(b);
  };

  const findWinningMove = (b, player) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b1, c] = line;
      const values = [b[a], b[b1], b[c]];
      if (values.filter((v) => v === player).length === 2 && values.includes(null)) {
        return line[values.indexOf(null)];
      }
    }
    return null;
  };

  const minimaxMove = (b) => {
    const best = minimax(b, "O");
    return best.index;
  };

  const minimax = (newBoard, player) => {
    const availSpots = newBoard.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);

    const w = calculateWinner(newBoard);
    if (w === "X") return { score: -10 };
    if (w === "O") return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
      move.index = availSpots[i];
      newBoard[availSpots[i]] = player;

      const result = minimax(newBoard, player === "O" ? "X" : "O");
      move.score = result.score;

      newBoard[availSpots[i]] = null;
      moves.push(move);
    }

    let bestMove;
    if (player === "O") {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    }
    return bestMove;
  };

  return (
    <div className="container d-flex flex-column align-items-center py-5">
      <h2 className="mb-4 text-center">Tic-Tac-Toe 🎮</h2>

      {!gameOver ? (
        <>
          <div
            className="board"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 100px)",
              gap: "10px",
            }}
          >
            {board.map((cell, i) => (
              <button
                key={i}
                className="btn btn-outline-primary fs-3"
                style={{ width: "100px", height: "100px" }}
                onClick={() => handleClick(i)}
              >
                {cell}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <h5>Next Player: {xIsNext ? "X (You)" : "O (AI)"}</h5>
          </div>

          <div className="mt-3 d-flex flex-wrap justify-content-center">
            <button className="btn btn-success me-2 mb-2" onClick={restartGame}>
              🔄 Restart
            </button>
            <a href="/games" className="btn btn-outline-primary mb-2">
              ⬅ Back to Games
            </a>
          </div>
        </>
      ) : (
        <div className="card col-12 col-md-6 p-4 mt-4 shadow-lg text-center">
          <h2 className="text-danger">🎉 Game Over!</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Difficulty:</strong> {user.difficulty}</p>
          <p><strong>Winner:</strong> {winner}</p>
          <button className="btn btn-success mt-3" onClick={restartGame}>
            🔄 Restart Game
          </button>
          <a href="/games" className="btn btn-outline-primary mt-3 ms-2">
            ⬅ Back to Games
          </a>
        </div>
      )}
    </div>
  );
}
