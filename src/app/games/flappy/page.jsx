"use client";
import { useState } from "react";
import FlappyBall from "@/components/GamesComponents/FlappyBall";

export default function FlappyPage() {
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
          <h2 className="mb-4 text-center">🏐 Start Flappy Ball</h2>
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
                className="form-select"
                value={form.age}
                required
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
                {["simple", "medium", "hard"].map((level) => (
                  <div className="form-check" key={level}>
                    <input
                      className="form-check-input shadow-none"
                      type="checkbox"
                      id={level}
                      checked={form.difficulty === level}
                      onChange={() =>
                        setForm({ ...form, difficulty: level })
                      }
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

            {/* Start */}
            <div className="text-center">
              <button className="btn btn-success px-4">Start Game</button>
            </div>
          </form>
        </div>
      ) : (
        <FlappyBall user={user} />
      )}
    </div>
  );
}
