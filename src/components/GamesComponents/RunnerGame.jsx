"use client";
import { useEffect, useRef, useState } from "react";

export default function RunnerGame({ user }) {   // ✅ accept user from props
  const canvasRef = useRef(null);
  const obstacles = useRef([]);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const animationRef = useRef(null);

  const player = useRef({ x: 50, y: 200, size: 20, dy: 0 });

  // ✅ difficulty config
  const difficultySettings = {
    simple: { speed: 3, spawnRate: 120 },
    medium: { speed: 5, spawnRate: 90 },
    hard: { speed: 7, spawnRate: 70 },
  };

  const { speed, spawnRate } =
    difficultySettings[user?.difficulty || "simple"];

  // ✅ Responsive screen check
  useEffect(() => {
    const checkScreenSize = () => setIsSmallScreen(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ Draw rounded square
  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // ✅ Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = isSmallScreen ? window.innerWidth - 40 : 600;
    canvas.height = isSmallScreen ? 300 : 400;

    let obstacleTimer = 0;
    const gravity = 0.6;

    const spawnObstacle = () => {
      const size = 20 + Math.random() * 20;
      obstacles.current.push({
        x: canvas.width,
        y: canvas.height - size - 10,
        size,
        speed, // ✅ from difficulty
      });
    };

    const update = () => {
      if (!isRunning || isPaused || gameOver) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // runner
      player.current.y += player.current.dy;
      player.current.dy += gravity;
      if (player.current.y + player.current.size > canvas.height - 10) {
        player.current.y = canvas.height - player.current.size - 10;
        player.current.dy = 0;
      }
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(
        player.current.x,
        player.current.y,
        player.current.size,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // obstacles
      obstacles.current.forEach((obs) => {
        obs.x -= obs.speed;
        ctx.fillStyle = "red";
        drawRoundedRect(ctx, obs.x, obs.y, obs.size, obs.size, 6);
        ctx.fill();
      });
      obstacles.current = obstacles.current.filter(
        (obs) => obs.x + obs.size > 0
      );

      // spawn new
      obstacleTimer++;
      if (obstacleTimer > spawnRate) {   // ✅ controlled by difficulty
        spawnObstacle();
        obstacleTimer = 0;
      }

      // collision
      for (let obs of obstacles.current) {
        if (
          player.current.x < obs.x + obs.size &&
          player.current.x + player.current.size > obs.x &&
          player.current.y < obs.y + obs.size &&
          player.current.y + player.current.size > obs.y
        ) {
          setIsRunning(false);
          setGameOver(true);
          cancelAnimationFrame(animationRef.current);
          return;
        }
      }

      // score
      setScore((s) => s + 1);
      animationRef.current = requestAnimationFrame(update);
    };

    if (isRunning && !isPaused && !gameOver) {
      animationRef.current = requestAnimationFrame(update);
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, isPaused, isSmallScreen, gameOver, speed, spawnRate]);

  // ✅ Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !isSmallScreen) {
        if (gameOver) {
          restartGame();
        } else if (isRunning) {
          setIsPaused((p) => !p);
        } else {
          startGame();
        }
      }
      if (e.code === "ArrowUp" && !gameOver) {
        player.current.dy = -10;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, gameOver, isSmallScreen]);

  // ✅ Helpers
  const startGame = () => {
    player.current = { x: 50, y: 200, size: 20, dy: 0 };
    obstacles.current = [];
    setScore(0);
    setGameOver(false);
    setIsRunning(true);
    setIsPaused(false);
  };

  const restartGame = () => {
    startGame();
  };

  const togglePauseResume = () => {
    if (isRunning) {
      setIsPaused((p) => !p);
    } else {
      startGame();
    }
  };

  return (
    <div className="text-center position-relative section">
      <h2 className="mb-3">
        Runner Game - <span className="text-capitalize">{user?.difficulty}</span>
      </h2>
      <p className="fw-bold">Score: {score}</p>

      {/* Game canvas */}
      <canvas ref={canvasRef} />

      {/* Overlay when Paused */}
      {isPaused && !gameOver && (
        <div className="overlay-card">
          <h3>⏸ Paused</h3>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="overlay-card">
          <h2>💀 Game Over</h2>
          <p className="mb-3">Your Score: {score}</p>
          <button
            className="btn btn-danger d-flex align-items-center gap-2 mx-auto"
            onClick={restartGame}
          >
            <i className="bi bi-arrow-repeat"></i> Restart
          </button>
          <a href="/games" className="btn btn-outline-primary mt-3 ms-2">
            ⬅ Back to Games
          </a>
        </div>
      )}

      {/* ✅ Desktop Controls */}
      {!isSmallScreen && !gameOver && (
        <div className="mt-3">
          <button
            className="btn btn-primary d-flex align-items-center gap-2 soft-shadow"
            onClick={togglePauseResume}
          >
            {!isRunning ? (
              <>
                <i className="bi bi-play-fill"></i> Start
              </>
            ) : isPaused ? (
              <>
                <i className="bi bi-play-fill"></i> Resume
              </>
            ) : (
              <>
                <i className="bi bi-pause-fill"></i> Pause
              </>
            )}
          </button>
          <p className="mt-2">Use ↑ to Jump, SPACE to Pause/Resume</p>
        </div>
      )}

      {/* ✅ Mobile Controls */}
      {isSmallScreen && !gameOver && (
        <div className="mt-3 d-flex flex-column align-items-center gap-2">
          <button
            className="btn btn-primary d-flex align-items-center gap-2 soft-shadow"
            onClick={togglePauseResume}
          >
            {!isRunning ? (
              <>
                <i className="bi bi-play-fill"></i> Start
              </>
            ) : isPaused ? (
              <>
                <i className="bi bi-play-fill"></i> Resume
              </>
            ) : (
              <>
                <i className="bi bi-pause-fill"></i> Pause
              </>
            )}
          </button>

          <button
            className="btn btn-success d-flex align-items-center gap-2 soft-shadow"
            onClick={() => {
              if (!gameOver) {
                player.current.dy = -10;
              }
            }}
          >
            <i className="bi bi-arrow-up-circle-fill"></i> Jump
          </button>
        </div>
      )}
    </div>
  );
}
