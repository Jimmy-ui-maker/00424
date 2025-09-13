"use client";
import { useState } from "react";
import SnakeGame from "@/components/GamesComponents/SnakeGame";

export default function SnakePage() {
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
          <h2 className="mb-4 text-center">🐍 Start Snake Game</h2>
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

            {/* Difficulty - check buttons */}
            <div className="mb-3">
              <label className="form-label fw-bold d-block">Difficulty</label>
              <div className="btn-group " role="group" aria-label="Difficulty">
                <input
                  type="radio"
                  className="btn-check"
                  name="difficulty"
                  id="simple"
                  checked={form.difficulty === "simple"}
                  onChange={() => setForm({ ...form, difficulty: "simple" })}
                />
                <label className="btn btn-outline-success" htmlFor="simple">
                  Simple
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="difficulty"
                  id="medium"
                  checked={form.difficulty === "medium"}
                  onChange={() => setForm({ ...form, difficulty: "medium" })}
                />
                <label className="btn btn-outline-warning mx-1" htmlFor="medium">
                  Medium
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="difficulty"
                  id="hard"
                  checked={form.difficulty === "hard"}
                  onChange={() => setForm({ ...form, difficulty: "hard" })}
                />
                <label className="btn btn-outline-danger" htmlFor="hard">
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
        <SnakeGame user={user} />
      )}
    </div>
  );
}
