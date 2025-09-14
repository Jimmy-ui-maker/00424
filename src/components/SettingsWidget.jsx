"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/context/TranslationContext"; // ⬅️ import context

export default function SettingsWidget() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState({ x: 30, y: 30 });
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showTracks, setShowTracks] = useState(false);

  const audioRef = useRef(null);
  const widgetRef = useRef(null);

  // ⬅️ use language context
  const { language, changeLanguage, t } = useTranslation();
  const languages = ["English", "Hausa", "Igbo", "Yoruba", "Chinese"];

  // Playlist
  const playlist = ["/audio/coolmusic.mp3", "/audio/coolmusic1.mp3"];

  /* ✅ Load saved settings */
  useEffect(() => {
    const savedDark = localStorage.getItem("dark-theme") === "true";
    const savedPlaying = localStorage.getItem("music-playing") === "true";
    const savedPos = JSON.parse(localStorage.getItem("widget-pos"));
    const savedTrack = parseInt(localStorage.getItem("current-track") || "0");

    if (savedPos) setPos(savedPos);
    setDark(savedDark);
    setPlaying(savedPlaying);
    setCurrentTrack(savedTrack);

    document.body.classList.toggle("dark-theme", savedDark);
    document.body.classList.toggle("light-theme", !savedDark);
  }, []);

  /* ✅ Save theme */
  useEffect(() => {
    localStorage.setItem("dark-theme", dark);
    document.body.classList.toggle("dark-theme", dark);
    document.body.classList.toggle("light-theme", !dark);
  }, [dark]);

  /* ✅ Music logic */
  useEffect(() => {
    let audioEl = document.getElementById("global-audio");

    if (!audioEl) {
      audioEl = document.createElement("audio");
      audioEl.id = "global-audio";
      document.body.appendChild(audioEl);
    }

    audioEl.src = playlist[currentTrack];
    audioEl.loop = false;

    const savedTrack = parseInt(localStorage.getItem("current-track") || "0");
    const savedTime = parseFloat(localStorage.getItem("music-time") || "0");
    if (savedTrack === currentTrack && !isNaN(savedTime)) {
      audioEl.currentTime = savedTime;
    }

    audioEl.ontimeupdate = () => {
      localStorage.setItem("music-time", audioEl.currentTime);
    };

    audioEl.onended = () => {
      let nextTrack = (currentTrack + 1) % playlist.length;
      setCurrentTrack(nextTrack);
      localStorage.setItem("current-track", nextTrack.toString());
      audioEl.src = playlist[nextTrack];
      if (playing) audioEl.play();
    };

    audioRef.current = audioEl;

    if (playing) {
      audioEl.play().catch(() => {});
    } else {
      audioEl.pause();
    }

    localStorage.setItem("music-playing", playing);
    localStorage.setItem("current-track", currentTrack.toString());
  }, [playing, currentTrack]);

  /* ✅ Draggable widget */
  useEffect(() => {
    const widget = widgetRef.current;
    let offsetX,
      offsetY,
      dragging = false;

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
    const onMouseDown = (e) => {
      dragging = true;
      offsetX = e.clientX - widget.getBoundingClientRect().left;
      offsetY = e.clientY - widget.getBoundingClientRect().top;
    };
    const onMouseMove = (e) => {
      if (!dragging) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() =>
        updatePosition(e.clientX - offsetX, e.clientY - offsetY)
      );
    };
    const onMouseUp = () => (dragging = false);

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
      animationFrame = requestAnimationFrame(() =>
        updatePosition(touch.clientX - offsetX, touch.clientY - offsetY)
      );
    };
    const onTouchEnd = () => (dragging = false);

    widget.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    widget.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      widget.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      widget.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  /* ✅ Cycle language */
  const handleLanguageChange = () => {
    const nextLang =
      languages[(languages.indexOf(language) + 1) % languages.length];
    changeLanguage(nextLang);
  };

  return (
    <div
      ref={widgetRef}
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        zIndex: 2000,
        cursor: "grab",
        touchAction: "none",
        transition: "top 0.05s linear, left 0.05s linear",
      }}
    >
      {/* Main settings button */}
      <button
        className="btn mt-2  rounded-circle soft-shadow"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-gear-fill fs-5"></i>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="mt-2 p-2 soft-card bg-body">
          {/* Theme */}
          <button
            className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center gap-2"
            onClick={() => setDark(!dark)}
          >
            <i
              className={`bi ${dark ? "bi-sun-fill" : "bi-moon-stars-fill"}`}
            />
            {dark ? t("lightMode") : t("darkMode")}
          </button>

          {/* Language Switcher 🔥 */}
          <button
            className="btn btn-outline-warning w-100 mb-2 d-flex align-items-center gap-2"
            onClick={handleLanguageChange}
          >
            <i className="bi bi-translate"></i>
            {t("language")}: {language}
          </button>

          {/* Track Dropdown */}
          <div className="dropdown mb-2">
            <button
              className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-between"
              onClick={() => setShowTracks(!showTracks)}
            >
              <span className="d-flex align-items-center gap-2">
                <i className="bi bi-music-note-list"></i>
                {`${t("track")} ${currentTrack + 1}`}
              </span>
              <i
                className={`bi ${
                  showTracks ? "bi-caret-up-fill" : "bi-caret-down-fill"
                }`}
              />
            </button>

            {showTracks && (
              <div className="mt-2 d-flex flex-column gap-2">
                {playlist.map((_, idx) => (
                  <button
                    key={idx}
                    className={`btn w-100 ${
                      idx === currentTrack
                        ? "btn-primary"
                        : "btn-outline-primary"
                    } d-flex align-items-center gap-2`}
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                      }
                      setCurrentTrack(idx);
                      setShowTracks(false);

                      if (playing && audioRef.current) {
                        setTimeout(() => {
                          audioRef.current.src = playlist[idx];
                          audioRef.current.play().catch(() => {});
                        }, 50);
                      }
                    }}
                  >
                    <i className="bi bi-music-note"></i>
                    {t("track")} {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Play/Pause */}
          <button
            className="btn btn-outline-success w-100 d-flex align-items-center gap-2"
            onClick={() => setPlaying(!playing)}
          >
            <i
              className={`bi ${
                playing ? "bi-pause-circle-fill" : "bi-music-note-beamed"
              }`}
            />
            {playing ? t("pauseMusic") : t("playMusic")}
          </button>
        </div>
      )}
    </div>
  );
}
