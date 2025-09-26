"use client";
import { useEffect, useRef, useState } from "react";

export default function FlappyBall({ user }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ballY = useRef(150);
  const ballVelocity = useRef(0);
  const pipes = useRef([]);

  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Difficulty settings
  const speeds = { simple: 2, medium: 3, hard: 4 };
  const gravityLevels = { simple: 0.4, medium: 0.6, hard: 0.8 };
  const jumpLevels = { simple: -8, medium: -10, hard: -12 };
  const gapSizes = { simple: 180, medium: 150, hard: 120 };

  const gravity = gravityLevels[user.difficulty] || 0.6;
  const jump = jumpLevels[user.difficulty] || -10;
  const pipeSpeed = speeds[user.difficulty] || 3;
  const pipeGap = gapSizes[user.difficulty] || 150;

  const ballRadius = 15;
  const ballX = 50;

  // Responsive canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    const resizeCanvas = () => {
      if (window.innerWidth < 992) {
        canvas.width = container.offsetWidth;
        canvas.height = (container.offsetWidth * 5) / 4;
      } else {
        canvas.width = 800;
        canvas.height = 400;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Reset
    ballY.current = 150;
    ballVelocity.current = 0;
    pipes.current = [];
    setScore(0);
    setGameOver(false);

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ballX, ballY.current, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    };

    const drawPipes = () => {
      pipes.current.forEach((pipe) => {
        ctx.fillStyle = "green";
        ctx.strokeStyle = "darkgreen";
        ctx.lineWidth = 8;

        // Top
        ctx.beginPath();
        ctx.rect(pipe.x, 0, 50, pipe.top);
        ctx.fill();
        ctx.stroke();

        // Bottom
        ctx.beginPath();
        ctx.rect(pipe.x, canvas.height - pipe.bottom, 50, pipe.bottom);
        ctx.fill();
        ctx.stroke();
      });
    };

    const drawHUD = () => {
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "left";
      ctx.fillText(`Score: ${score}`, 10, 25);
      ctx.fillText(`High Score: ${highScore}`, 10, 50);
    };

    const drawGameOver = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, canvas.height / 2 - 80, canvas.width, 160);

      ctx.fillStyle = "white";
      ctx.font = "36px Arial";
      ctx.textAlign = "center";
      ctx.fillText("🎉 GAME OVER 🎉", canvas.width / 2, canvas.height / 2 - 20);

      ctx.font = "20px Arial";
      ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 50);
    };

    const endGame = () => {
      setIsRunning(false);
      setGameOver(true);
      setHighScore((prev) => (score > prev ? score : prev));
      drawGameOver();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ball physics
      ballVelocity.current += gravity;
      ballY.current += ballVelocity.current;

      // Spawn pipes
      if (
        pipes.current.length === 0 ||
        pipes.current[pipes.current.length - 1].x < canvas.width - 200
      ) {
        const pipeHeight =
          Math.floor(Math.random() * (canvas.height - pipeGap - 50)) + 50;
        pipes.current.push({
          x: canvas.width,
          top: pipeHeight,
          bottom: canvas.height - pipeHeight - pipeGap,
          passed: false,
        });
      }

      // Move pipes
      pipes.current.forEach((pipe) => {
        pipe.x -= pipeSpeed;
      });

      // Remove old
      pipes.current = pipes.current.filter((pipe) => pipe.x + 50 > 0);

      // Collision detection
      for (let pipe of pipes.current) {
        if (
          ballX + ballRadius > pipe.x &&
          ballX - ballRadius < pipe.x + 50 &&
          (ballY.current - ballRadius < pipe.top ||
            ballY.current + ballRadius > canvas.height - pipe.bottom)
        ) {
          endGame();
          return;
        }
      }

      // ✅ Scoring
      pipes.current.forEach((pipe) => {
        if (!pipe.passed && pipe.x + 50 < ballX - ballRadius) {
          setScore((prev) => prev + 1);
          pipe.passed = true;
        }
      });

      // Ceiling/floor
      if (
        ballY.current + ballRadius > canvas.height ||
        ballY.current - ballRadius < 0
      ) {
        endGame();
        return;
      }

      // Draw
      drawBall();
      drawPipes();
      drawHUD();

      animationFrameId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, pipeGap, gravity, jump, pipeSpeed, highScore]);

  const handleJump = () => {
    if (!isRunning) return;
    ballVelocity.current = jump;
  };

  return (
    <div className="text-center" ref={containerRef}>
      <h4 className="mb-3">
        🏐 Welcome {user.name}, Age {user.age} ({user.difficulty})
      </h4>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="border rounded shadow"
        onClick={handleJump}
      />

      {/* Controls */}
      <div className="mt-3">
        {!isRunning ? (
          <>
            <button
              className="btn btn-primary"
              onClick={() => setIsRunning(true)}
            >
              {gameOver ? "Restart Game" : "Start Game"}
            </button>
            {gameOver && (
              <a href="/games" className="btn btn-outline-primary ms-2">
                ⬅ Back to Games
              </a>
            )}
          </>
        ) : (
          <p className="text-muted">Tap/click to bounce!</p>
        )}
      </div>
    </div>
  );
}
