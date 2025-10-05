"use client";
import { useEffect, useState } from "react";
import WordScrambleGame from "@/components/GamesComponents/WordScrambleGame";

export default function WordScramblePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", difficulty: "simple" });
const [savedUser, setSavedUser] = useState(null);

  // Load saved user from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("word-scramble");
    if (stored) {
      setSavedUser(JSON.parse(stored));
    }
  }, []);

  // Save user to localStorage when starting game
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    localStorage.setItem("word-scramble", JSON.stringify(form));
  };

  // Start game with saved user
  const handleQuickStart = () => {
    if (savedUser) setUser(savedUser);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      {!user ? (
        <div className="card col-12 col-md-6 p-4 shadow-lg">
          <h2 className="mb-4 text-center">🔤 Start Word Scramble</h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                className="form-control"
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Difficulty */}
            <div className="mb-3 text-center">
              <label className="form-label fw-bold d-block">
                Select Difficulty
              </label>
              <div className="d-flex justify-content-center gap-3">
                {["simple", "medium", "hard"].map((level) => (
                  <div className="form-check" key={level}>
                    <input
                      className="form-check-input shadow-none"
                      type="checkbox"
                      id={level}
                      checked={form.difficulty === level}
                      onChange={() => setForm({ ...form, difficulty: level })}
                    />
                    <label
                      className={`form-check-label ${
                        level === "simple"
                          ? "text-success"
                          : level === "medium"
                          ? "text-warning"
                          : "text-danger"
                      }`}
                      htmlFor={level}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Start button */}
            <div className="text-center">
              <button className="btn btn-primary px-4">Start Game</button>
            </div>
          </form>
           {/* ✅ Floating Quick Start Button (Top-Left) */}
          {savedUser && (
            <button
              onClick={handleQuickStart}
              className="btn btn-primary rounded-circle shadow-lg position-absolute"
              style={{
                bottom: "-20px",
                right: "-20px",
                width: "60px",
                height: "60px",
                fontSize: "22px",
              }}
              title={`Quick Start: ${savedUser.name}, ${savedUser.age}, ${savedUser.difficulty}`}
            >
              ▶
            </button>
          )}
        </div>
      ) : (
        <WordScrambleGame user={user} />
      )}
    </div>
  );
}
