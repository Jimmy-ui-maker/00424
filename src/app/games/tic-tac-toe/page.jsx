"use client";
import { useEffect, useState } from "react";
import TicTacToe from "@/components/GamesComponents/TicTacToe";

export default function TicTacToePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", difficulty: "simple" });
  const [savedUser, setSavedUser] = useState(null);

  // Load saved user from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("tictactor");
    if (stored) {
      setSavedUser(JSON.parse(stored));
    }
  }, []);

  // Save user to localStorage when starting game
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    localStorage.setItem("tictactor", JSON.stringify(form));
  };

  // Start game with saved user
  const handleQuickStart = () => {
    if (savedUser) setUser(savedUser);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      {!user ? (
        <div className="card col-12 col-md-6 p-4 shadow-lg">
          <h2 className="mb-4 text-center">🎮 Start Tic-Tac-Toe Game</h2>
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

            {/* Age */}
            <div className="mb-3">
              <label className="form-label fw-bold">Age</label>
              <select
                value={form.age}
                required
                type="select"
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              >
                <option value="">Select Age</option>
                {[...Array(101).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="mb-3 text-center">
              <label className="form-label fw-bold d-block">Difficulty</label>
              <div className="d-flex justify-content-center gap-3">
                {/* Simple */}
                <div className="form-check">
                  <input
                    className="form-check-input shadow-none "
                    type="checkbox"
                    id="simple"
                    checked={form.difficulty === "simple"}
                    onChange={() => setForm({ ...form, difficulty: "simple" })}
                  />
                  <label
                    className="form-check-label text-success "
                    htmlFor="simple"
                  >
                    Simple
                  </label>
                </div>

                {/* Medium */}
                <div className="form-check">
                  <input
                    className="form-check-input shadow-none"
                    type="checkbox"
                    id="medium"
                    checked={form.difficulty === "medium"}
                    onChange={() => setForm({ ...form, difficulty: "medium" })}
                  />
                  <label
                    className="form-check-label text-warning"
                    htmlFor="medium"
                  >
                    Medium
                  </label>
                </div>

                {/* Hard */}
                <div className="form-check">
                  <input
                    className="form-check-input shadow-none"
                    type="checkbox"
                    id="hard"
                    checked={form.difficulty === "hard"}
                    onChange={() => setForm({ ...form, difficulty: "hard" })}
                  />
                  <label
                    className="form-check-label text-danger"
                    htmlFor="hard"
                  >
                    Hard
                  </label>
                </div>
              </div>
            </div>

            {/* Start button */}
            <div className="text-center">
              <button className="btn btn-success px-4">Start Game</button>
            </div>
          </form>
          {/* ✅ Floating Quick Start Button (Top-Left) */}
          {savedUser && (
            <button
              onClick={handleQuickStart}
              className="btn btn-primary rounded-circle shadow-lg position-absolute"
              style={{
                top: "-20px",
                left: "-20px",
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
        <TicTacToe user={user} />
      )}
    </div>
  );
}
