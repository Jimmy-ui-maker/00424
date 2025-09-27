"use client";
import { useEffect, useRef, useState } from "react";

export default function PongGame({ user }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Fixed simple speed
  const ballSpeed = 3;
  const aiSpeed = 2;
  const paddleW = 140;

  // refs for paddles and ball
  const playerPaddle = useRef({ x: 0, y: 0, w: paddleW, h: 12, dx: 0 });
  const aiPaddle = useRef({ x: 0, y: 0, w: paddleW, h: 12, dx: 0 });
  const ball = useRef({ x: 0, y: 0, r: 8, dx: ballSpeed, dy: ballSpeed });

  // layout setup
  const layout = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = isSmallScreen ? window.innerWidth : 600;
    canvas.height = isSmallScreen ? Math.round(canvas.width * 0.6) : 400;

    const cw = canvas.width;
    const ch = canvas.height;

    playerPaddle.current.w = paddleW;
    aiPaddle.current.w = paddleW;

    playerPaddle.current.x = Math.round((cw - paddleW) / 2);
    playerPaddle.current.y = ch - playerPaddle.current.h - 8;

    aiPaddle.current.x = Math.round((cw - paddleW) / 2);
    aiPaddle.current.y = 8;

    ball.current.x = Math.round(cw / 2);
    ball.current.y = Math.round(ch / 2);
    ball.current.dx = (Math.random() > 0.5 ? 1 : -1) * ballSpeed;
    ball.current.dy = (Math.random() > 0.5 ? 1 : -1) * ballSpeed;
  };

  // detect screen size
  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    layout();
  }, [isSmallScreen]);

  // start game
  const startGame = () => {
    layout();
    setWinner(null);
    setGameOver(false);
    setIsPaused(false);
    setIsRunning(true);
  };

  const restartGame = () => startGame();

  const togglePauseResume = () => {
    if (!isRunning) {
      startGame();
      return;
    }
    if (gameOver) return;
    setIsPaused((p) => !p);
  };

  // game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    layout();

    const update = () => {
      if (!isRunning || isPaused || gameOver) return;
      const cw = canvas.width;
      const ch = canvas.height;

      // update player paddle
      playerPaddle.current.x += playerPaddle.current.dx;
      if (playerPaddle.current.x < 0) playerPaddle.current.x = 0;
      if (playerPaddle.current.x + playerPaddle.current.w > cw)
        playerPaddle.current.x = cw - playerPaddle.current.w;

      // AI movement
      if (ball.current.x < aiPaddle.current.x + aiPaddle.current.w / 2) {
        aiPaddle.current.x -= aiSpeed;
      } else {
        aiPaddle.current.x += aiSpeed;
      }
      if (aiPaddle.current.x < 0) aiPaddle.current.x = 0;
      if (aiPaddle.current.x + aiPaddle.current.w > cw)
        aiPaddle.current.x = cw - aiPaddle.current.w;

      // move ball
      ball.current.x += ball.current.dx;
      ball.current.y += ball.current.dy;

      // clear canvas
      ctx.clearRect(0, 0, cw, ch);

      // draw paddles
      ctx.fillStyle = "#0d6efd";
      ctx.fillRect(
        playerPaddle.current.x,
        playerPaddle.current.y,
        playerPaddle.current.w,
        playerPaddle.current.h
      );
      ctx.fillStyle = "#198754";
      ctx.fillRect(
        aiPaddle.current.x,
        aiPaddle.current.y,
        aiPaddle.current.w,
        aiPaddle.current.h
      );

      // draw ball
      ctx.fillStyle = "#dc3545";
      ctx.beginPath();
      ctx.arc(ball.current.x, ball.current.y, ball.current.r, 0, Math.PI * 2);
      ctx.fill();

      // wall bounce
      if (ball.current.x - ball.current.r < 0) {
        ball.current.x = ball.current.r;
        ball.current.dx *= -1;
      } else if (ball.current.x + ball.current.r > cw) {
        ball.current.x = cw - ball.current.r;
        ball.current.dx *= -1;
      }

      // player paddle collision
      if (
        ball.current.y + ball.current.r >= playerPaddle.current.y &&
        ball.current.x > playerPaddle.current.x &&
        ball.current.x < playerPaddle.current.x + playerPaddle.current.w &&
        ball.current.dy > 0
      ) {
        ball.current.dy *= -1;
        ball.current.y = playerPaddle.current.y - ball.current.r - 0.1;
      }

      // AI paddle collision
      if (
        ball.current.y - ball.current.r <=
          aiPaddle.current.y + aiPaddle.current.h &&
        ball.current.x > aiPaddle.current.x &&
        ball.current.x < aiPaddle.current.x + aiPaddle.current.w &&
        ball.current.dy < 0
      ) {
        ball.current.dy *= -1;
        ball.current.y =
          aiPaddle.current.y + aiPaddle.current.h + ball.current.r + 0.1;
      }

      // game over
      if (ball.current.y - ball.current.r <= 0) {
        setWinner(`${user.name} 😂`);
        setGameOver(true);
        setIsRunning(false);
        return;
      }
      if (ball.current.y + ball.current.r >= ch) {
        setWinner("AI 😂");
        setGameOver(true);
        setIsRunning(false);
        return;
      }

      animationRef.current = requestAnimationFrame(update);
    };

    if (isRunning && !isPaused && !gameOver) {
      animationRef.current = requestAnimationFrame(update);
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, isPaused, isSmallScreen, gameOver, user]);

  // desktop keyboard
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === "Space" && !isSmallScreen) {
        e.preventDefault();
        if (gameOver) restartGame();
        else togglePauseResume();
        return;
      }
      if (e.code === "ArrowLeft") playerPaddle.current.dx = -6;
      if (e.code === "ArrowRight") playerPaddle.current.dx = 6;
    };
    const onKeyUp = (e) => {
      if (["ArrowLeft", "ArrowRight"].includes(e.code)) {
        playerPaddle.current.dx = 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [isSmallScreen, gameOver]);

  // mobile pointer controls
  const pointerDownLeft = () => (playerPaddle.current.dx = -6);
  const pointerUpLeft = () => (playerPaddle.current.dx = 0);
  const pointerDownRight = () => (playerPaddle.current.dx = 6);
  const pointerUpRight = () => (playerPaddle.current.dx = 0);

  return (
    <div className="text-center position-relative section">
      <h2 className="mb-3">🏓 Pong Game</h2>

      <div className="position-relative d-inline-block">
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: isSmallScreen ? "100vw" : 600,
            maxWidth: "100%",
            height: isSmallScreen
              ? Math.round((window.innerWidth || 360) * 0.6)
              : 400,
            borderRadius: 12,
            boxShadow: "8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff",
            background: "#fff",
          }}
        />
        {(isPaused || gameOver) && (
          <div
            className="overlay-card"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ pointerEvents: "auto", textAlign: "center" }}>
              {gameOver ? (
                <>
                  <h3>🏁 Game Over</h3>
                  <p className="fw-bold">{winner} Wins!</p>
                  <button className="btn btn-danger me-2" onClick={restartGame}>
                    <i className="bi bi-arrow-repeat"></i> Restart
                  </button>
                  <a href="/games" className="btn btn-outline-primary ms-2">
                    ⬅ Back to Games
                  </a>
                </>
              ) : (
                <>
                  <h3>⏸ Paused</h3>
                  <button
                    className="btn btn-success"
                    onClick={togglePauseResume}
                  >
                    <i className="bi bi-play-fill"></i> Resume
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop controls */}
      {!isSmallScreen && !gameOver && (
        <div className="mt-3">
          <button className="btn btn-primary me-2" onClick={togglePauseResume}>
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
          <p className="mt-2">Controls: ⬅ → arrows = Move | SPACE = Pause</p>
        </div>
      )}

      {/* Mobile controls */}
      {isSmallScreen && !gameOver && (
        <div className="mt-3 d-flex flex-column align-items-center gap-2">
          <button
            className="btn btn-primary mb-2"
            onClick={togglePauseResume}
            style={{ minWidth: 140 }}
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
          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onMouseDown={pointerDownLeft}
              onMouseUp={pointerUpLeft}
              onTouchStart={pointerDownLeft}
              onTouchEnd={pointerUpLeft}
            >
              ⬅ Left
            </button>
            <button
              className="btn btn-success"
              onMouseDown={pointerDownRight}
              onMouseUp={pointerUpRight}
              onTouchStart={pointerDownRight}
              onTouchEnd={pointerUpRight}
            >
              ➡ Right
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
