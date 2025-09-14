"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GamesWidget() {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const widgetRef = useRef(null);
  const router = useRouter();

  /* ✅ Load saved position */
  useEffect(() => {
    const savedPos = JSON.parse(localStorage.getItem("games-widget-pos"));
    if (savedPos) setPos(savedPos);
  }, []);

  /* ✅ Draggable widget */
  useEffect(() => {
    const widget = widgetRef.current;
    let offsetX, offsetY, dragging = false;

    const clampPosition = (x, y) => {
      const rect = widget.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width;
      const maxY = window.innerHeight - rect.height;
      return {
        x: Math.min(Math.max(0, x), maxX),
        y: Math.min(Math.max(0, y), maxY),
      };
    };

    const updatePosition = (x, y) => {
      const clamped = clampPosition(x, y);
      setPos(clamped);
      localStorage.setItem("games-widget-pos", JSON.stringify(clamped));
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
      {/* 🎮 Games Button */}
      <button
        className="btn mt-2  rounded-circle soft-shadow"
        onClick={() => router.push("/games")}
      >
        <i className="bi bi-controller fs-4"></i>
      </button>
    </div>
  );
}
