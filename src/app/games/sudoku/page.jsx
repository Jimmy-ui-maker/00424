"use client";
import SudokuGame from "@/components/GamesComponents/SudokuGame";
import { useEffect, useState } from "react";

export default function SudokuPage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", age: "" });
  const [savedUser, setSavedUser] = useState(null);

  // Load saved user from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("sudoku");
    if (stored) {
      setSavedUser(JSON.parse(stored));
    }
  }, []);

  // Save user to localStorage when starting game
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    localStorage.setItem("sudoku", JSON.stringify(form));
  };

  // Start game with saved user
  const handleQuickStart = () => {
    if (savedUser) setUser(savedUser);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      {!user ? (
        <div className="card col-12 col-md-6 p-4 shadow-lg">
          <h2 className="mb-4 text-center">🧩 Start Sudoku Game</h2>
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
                bottom: "-20px",
                right: "-20px",
                width: "60px",
                height: "60px",
                fontSize: "22px",
              }}
              title={`Quick Start: ${savedUser.name}, ${savedUser.age}`}
            >
              ▶
            </button>
          )}
        </div>
      ) : (
        <SudokuGame user={user} />
      )}
    </div>
  );
}
