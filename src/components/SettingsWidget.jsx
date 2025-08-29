"use client";

import { useState, useRef, useEffect } from "react";

export default function SettingsWidget() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState({ x: 30, y: 30 });

  const audioRef = useRef(null);
  const widgetRef = useRef(null);

  /* ✅ Load saved theme, music, and widget position */
  useEffect(() => {
    const savedDark = localStorage.getItem("dark-theme") === "true";
    const savedPlaying = localStorage.getItem("music-playing") === "true";
    const savedPos = JSON.parse(localStorage.getItem("widget-pos"));

    if (savedPos) setPos(savedPos);
    setDark(savedDark);
    setPlaying(savedPlaying);

    if (savedDark) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, []);

  /* ✅ Watch theme toggle */
  useEffect(() => {
    localStorage.setItem("dark-theme", dark);
    if (dark) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [dark]);

  /* ✅ Persist music across refresh & restore position */
  useEffect(() => {
    let audioEl = document.getElementById("global-audio");

    if (!audioEl) {
      audioEl = document.createElement("audio");
      audioEl.id = "global-audio";
      audioEl.src = "/audio/coolmusic.mp3";
      audioEl.loop = true;
      document.body.appendChild(audioEl);

      // Restore last saved time if available
      const savedTime = parseFloat(localStorage.getItem("music-time") || "0");
      if (!isNaN(savedTime)) {
        audioEl.currentTime = savedTime;
      }

      // Keep updating position
      audioEl.addEventListener("timeupdate", () => {
        localStorage.setItem("music-time", audioEl.currentTime);
      });
    }

    audioRef.current = audioEl;

    if (playing) {
      audioEl.play().catch(() => {});
    } else {
      audioEl.pause();
    }

    localStorage.setItem("music-playing", playing);
  }, [playing]);

  /* ✅ Draggable widget (mouse + touch + clamp + smooth) */
  useEffect(() => {
    const widget = widgetRef.current;
    let offsetX, offsetY, dragging = false;

    const clampPosition = (x, y) => {
      const widgetRect = widget.getBoundingClientRect();
      const maxX = window.innerWidth - widgetRect.width;
      const maxY = window.innerHeight - widgetRect.height;

      return {
        x: Math.min(Math.max(0, x), maxX),
        y: Math.min(Math.max(0, y), maxY),
      };
    };

    const updatePosition = (x, y) => {
      const clamped = clampPosition(x, y);
      setPos(clamped);
      localStorage.setItem("widget-pos", JSON.stringify(clamped));
    };

    let animationFrame;

    // 🖱️ Mouse events
    const onMouseDown = (e) => {
      dragging = true;
      offsetX = e.clientX - widget.getBoundingClientRect().left;
      offsetY = e.clientY - widget.getBoundingClientRect().top;
    };
    const onMouseMove = (e) => {
      if (!dragging) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        updatePosition(e.clientX - offsetX, e.clientY - offsetY);
      });
    };
    const onMouseUp = () => (dragging = false);

    // 📱 Touch events
    const onTouchStart = (e) => {
      dragging = true;
      const touch = e.touches[0];
      offsetX = touch.clientX - widget.getBoundingClientRect().left;
      offsetY = touch.clientY - widget.getBoundingClientRect().top;
    };
    const onTouchMove = (e) => {
      if (!dragging) return;
      const touch = e.touches[0];
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        updatePosition(touch.clientX - offsetX, touch.clientY - offsetY);
      });
    };
    const onTouchEnd = () => (dragging = false);

    // ✅ Attach listeners
    widget.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    widget.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    // ✅ Cleanup
    return () => {
      widget.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      widget.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        zIndex: 2000,
        cursor: "grab",
        touchAction: "none", // ✅ prevents scroll interference on mobile
        transition: "top 0.05s linear, left 0.05s linear", // ✅ smooth feel
      }}
    >
      {/* Main settings button */}
      <button
        className="btn mt-2 text-bg-primary rounded-circle soft-shadow"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-gear-fill fs-5"></i>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="mt-2 p-2 soft-card bg-body">
          <button
            className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center gap-2"
            onClick={() => setDark(!dark)}
          >
            <i className={`bi ${dark ? "bi-sun-fill" : "bi-moon-stars-fill"}`} />
            {dark ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            className="btn btn-outline-success w-100 d-flex align-items-center gap-2"
            onClick={() => setPlaying(!playing)}
          >
            <i
              className={`bi ${
                playing ? "bi-pause-circle-fill" : "bi-music-note-beamed"
              }`}
            />
            {playing ? "Pause Music" : "Play Music"}
          </button>
        </div>
      )}
    </div>
  );
}
