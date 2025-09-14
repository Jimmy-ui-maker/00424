"use client";
import MemoryGame from "@/components/GamesComponents/MemoryGame";
import { useState } from "react";

export default function TicTacToePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", age: "", difficulty: "simple" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
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
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Age */}
            <div className="mb-3">
              <label className="form-label fw-bold">Age</label>
              <input
                type="number"
                value={form.age}
                required
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
            </div>

            {/* Difficulty */}
            <div className="mb-3">
              <label className="form-label fw-bold d-block">Difficulty</label>
              <div className="btn-group" role="group" aria-label="Difficulty">
                {/* Simple */}
                <input
                  type="radio"
                  className="btn-check"
                  name="difficulty"
                  id="simple"
                  checked={form.difficulty === "simple"}
                  onChange={() => setForm({ ...form, difficulty: "simple" })}
                />
                <label
                  className={`btn ${
                    form.difficulty === "simple"
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  htmlFor="simple"
                >
                  Simple
                </label>

                {/* Medium */}
                <input
                  type="radio"
                  className="btn-check"
                  name="difficulty"
                  id="medium"
                  checked={form.difficulty === "medium"}
                  onChange={() => setForm({ ...form, difficulty: "medium" })}
                />
                <label
                  className={`btn mx-1 ${
                    form.difficulty === "medium"
                      ? "btn-warning text-dark"
                      : "btn-outline-warning"
                  }`}
                  htmlFor="medium"
                >
                  Medium
                </label>

                {/* Hard */}
                <input
                  type="radio"
                  className="btn-check"
                  name="difficulty"
                  id="hard"
                  checked={form.difficulty === "hard"}
                  onChange={() => setForm({ ...form, difficulty: "hard" })}
                />
                <label
                  className={`btn ${
                    form.difficulty === "hard"
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  htmlFor="hard"
                >
                  Hard
                </label>
              </div>
            </div>

            {/* Start button */}
            <div className="text-center">
              <button className="btn btn-success px-4">Start Game</button>
            </div>
          </form>
        </div>
      ) : (
        <MemoryGame user={user} />
      )}
    </div>
  );
}
