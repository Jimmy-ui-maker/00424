"use client";
import { useState, useEffect, useRef } from "react";

export default function SnakeGame({ user }) {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [dir, setDir] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  const gridSize = 20;
  const tileCount = 20;
  const speedMap = { simple: 200, medium: 120, hard: 80 };
  const speed = speedMap[user.difficulty] || 150;

  // reset game
  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDir({ x: 0, y: 0 });
    setScore(0);
    setGameOver(false);
    setPaused(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameOver || paused) return;
    const ctx = canvas.getContext("2d");

    const interval = setInterval(() => {
      if (dir.x === 0 && dir.y === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.forEach((s, i) => {
          ctx.fillStyle = i === 0 ? "#32cd32" : "lime";
          ctx.beginPath();
          ctx.arc(
            s.x * gridSize + gridSize / 2,
            s.y * gridSize + gridSize / 2,
            i === 0 ? gridSize / 2 : gridSize / 2 - 2, // head bigger
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(
          food.x * gridSize + gridSize / 2,
          food.y * gridSize + gridSize / 2,
          gridSize / 2 - 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
        return;
      }

      let newSnake = [...snake];
      let head = { x: newSnake[0].x + dir.x, y: newSnake[0].y + dir.y };

      if (head.x < 0) head.x = tileCount - 1;
      if (head.y < 0) head.y = tileCount - 1;
      if (head.x >= tileCount) head.x = 0;
      if (head.y >= tileCount) head.y = 0;

      if (newSnake.some((s) => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        clearInterval(interval);
        return;
      }

      newSnake.unshift(head);

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 1);
        setFood({
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount),
        });
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      newSnake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#1f941f" : "lime";
        ctx.beginPath();
        ctx.arc(
          s.x * gridSize + gridSize / 2,
          s.y * gridSize + gridSize / 2,
          i === 0 ? gridSize / 2 : gridSize / 2 - 2, // head bigger
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }, speed);

    return () => clearInterval(interval);
  }, [snake, dir, food, gameOver, paused]);

  // keyboard
  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (dir.y === 1) break;
          setDir({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          if (dir.y === -1) break;
          setDir({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          if (dir.x === 1) break;
          setDir({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          if (dir.x === -1) break;
          setDir({ x: 1, y: 0 });
          break;
        case " ":
          setPaused((p) => !p);
          break;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [dir]);

  // D-Pad control
  const move = (direction) => {
    switch (direction) {
      case "up":
        if (dir.y !== 1) setDir({ x: 0, y: -1 });
        break;
      case "down":
        if (dir.y !== -1) setDir({ x: 0, y: 1 });
        break;
      case "left":
        if (dir.x !== 1) setDir({ x: -1, y: 0 });
        break;
      case "right":
        if (dir.x !== -1) setDir({ x: 1, y: 0 });
        break;
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      {!gameOver ? (
        <>
          <div
            className="d-flex justify-content-center align-items-center w-100 mb-3"
            style={{ maxWidth: "420px" }}
          >
            <h3 className="badge bg-success fs-5 p-2 mb-0">Score: {score}</h3>
          </div>

          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border rounded shadow"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {/* D-Pad with Play/Pause button in center */}
          <div className="d-md-none mt-3">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-dark m-1 p-3 rounded-circle"
                style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                onClick={() => move("up")}
              >
                ↑
              </button>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <button
                className="btn btn-dark m-1 p-3 rounded-circle"
                style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                onClick={() => move("left")}
              >
                ←
              </button>
              <button
                className={`btn m-1 p-3 rounded-circle ${
                  paused ? "btn-primary" : "btn-warning"
                }`}
                style={{ width: "80px", height: "80px", fontSize: "1.8rem" }}
                onClick={() => setPaused(!paused)}
              >
                {paused ? (
                  <i className="bi bi-play-fill"></i>
                ) : (
                  <i className="bi bi-pause-fill"></i>
                )}
              </button>
              <button
                className="btn btn-dark m-1 p-3 rounded-circle"
                style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                onClick={() => move("right")}
              >
                →
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-dark m-1 p-3 rounded-circle"
                style={{ width: "70px", height: "70px", fontSize: "1.5rem" }}
                onClick={() => move("down")}
              >
                ↓
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="card col-12 col-md-6 p-4 mt-4 shadow-lg">
          <h2 className="text-danger">🎉 Game Over!</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Difficulty:</strong> {user.difficulty}
          </p>
          <p>
            <strong>Final Score:</strong> {score}
          </p>
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
