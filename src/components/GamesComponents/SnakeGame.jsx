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
  const [started, setStarted] = useState(false); // 🆕 track start
  const touchStart = useRef({ x: 0, y: 0 });

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
    setStarted(false); // require Start again
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || gameOver || paused || !started) return; // 🛑 only run when started
    const ctx = canvas.getContext("2d");

    const interval = setInterval(() => {
      if (dir.x === 0 && dir.y === 0) {
        // idle state
        ctx.fillStyle = "#111";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // snake
        snake.forEach((s, i) => {
          ctx.fillStyle = i === 0 ? "#32cd32" : "lime";
          ctx.beginPath();
          ctx.arc(
            s.x * gridSize + gridSize / 2,
            s.y * gridSize + gridSize / 2,
            gridSize / 2 - 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        });

        // food
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

      // wrap around edges
      if (head.x < 0) head.x = tileCount - 1;
      if (head.y < 0) head.y = tileCount - 1;
      if (head.x >= tileCount) head.x = 0;
      if (head.y >= tileCount) head.y = 0;

      // self-collision
      if (newSnake.some((s) => s.x === head.x && s.y === head.y)) {
        setGameOver(true);
        clearInterval(interval);
        return;
      }

      newSnake.unshift(head);

      // eat food
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

      // clear canvas
      ctx.fillStyle = "#111";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw snake
      newSnake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? "#1f941f" : "lime";
        ctx.beginPath();
        ctx.arc(
          s.x * gridSize + gridSize / 2,
          s.y * gridSize + gridSize / 2,
          gridSize / 2 - 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // draw food
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
  }, [snake, dir, food, gameOver, paused, started]);

  // keyboard controls
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

  // 🆕 swipe controls for mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e) => {
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30 && dir.x !== -1) setDir({ x: 1, y: 0 }); // swipe right
        else if (dx < -30 && dir.x !== 1) setDir({ x: -1, y: 0 }); // swipe left
      } else {
        if (dy > 30 && dir.y !== -1) setDir({ x: 0, y: 1 }); // swipe down
        else if (dy < -30 && dir.y !== 1) setDir({ x: 0, y: -1 }); // swipe up
      }
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [dir]);

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column">
      {!gameOver ? (
        <>
          <div
            className="d-flex justify-content-between align-items-center w-100 mb-3"
            style={{ maxWidth: "420px" }}
          >
            <h3 className="badge bg-success fs-5 p-2 mb-0">Score: {score}</h3>
            <button
              className={`btn btn-sm ${paused ? "btn-primary" : "btn-warning"}`}
              onClick={() => setPaused(!paused)}
            >
              {paused ? (
                <i className="bi bi-play-fill"></i>
              ) : (
                <i className="bi bi-pause-fill"></i>
              )}
            </button>
          </div>

          <div className="position-relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="border border-light rounded shadow"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            {!started && (
              <button
                className="btn btn-lg btn-success position-absolute top-50 start-50 translate-middle"
                onClick={() => setStarted(true)}
              >
                ▶ Start
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="card col-12 col-md-6 p-4 mt-4 shadow-lg">
          <h2 className="text-danger">🎉 Game Over!</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Difficulty:</strong> {user.difficulty}</p>
          <p><strong>Final Score:</strong> {score}</p>
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
