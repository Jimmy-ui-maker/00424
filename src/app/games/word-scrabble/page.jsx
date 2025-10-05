"use client";
import ScrabbleGame from "@/components/GamesComponents/ScrabbleGame";
import { useEffect, useState } from "react";

export default function ScrabblePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", difficulty: "simple" });
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("scrabble-user");
    if (stored) setSavedUser(JSON.parse(stored));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(form);
    localStorage.setItem("scrabble-user", JSON.stringify(form));
  };

  const handleQuickStart = () => {
    if (savedUser) setUser(savedUser);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      {!user ? (
        <div className="card col-12 col-md-6 p-4 shadow-lg position-relative">
          <h2 className="mb-4 text-center">🧩 Start Scrabble Challenge</h2>
          <form onSubmit={handleSubmit}>
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

            <div className="mb-3 text-center">
              <label className="form-label fw-bold d-block">
                Select Difficulty
              </label>
              <div className="d-flex justify-content-center gap-3">
                {["simple", "medium", "hard"].map((level) => (
                  <div className="form-check" key={level}>
                    <input
                      className="form-check-input shadow-none"
                      type="radio"
                      id={level}
                      name="difficulty"
                      checked={form.difficulty === level}
                      onChange={() => setForm({ ...form, difficulty: level })}
                    />
                    <label
                      htmlFor={level}
                      className={`form-check-label fw-semibold ${
                        level === "simple"
                          ? "text-success"
                          : level === "medium"
                          ? "text-warning"
                          : "text-danger"
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-primary px-4">Start Game</button>
            </div>
          </form>

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
              title={`Quick Start: ${savedUser.name}, ${savedUser.difficulty}`}
            >
              ▶
            </button>
          )}
        </div>
      ) : (
        <ScrabbleGame user={user} />
      )}
    </div>
  );
}
