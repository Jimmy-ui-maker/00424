"use client";
import { useState, useEffect } from "react";

export default function MemoryGame({ user }) {
  const difficulties = {
    simple: 6,   // 6 pairs = 12 cards
    medium: 10,  // 10 pairs = 20 cards
    hard: 15     // 15 pairs = 30 cards
  };

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize cards based on difficulty
  useEffect(() => {
    const pairs = difficulties[user.difficulty] || 6;
    const cardValues = Array.from({ length: pairs }, (_, i) => i + 1);
    const gameCards = shuffle([...cardValues, ...cardValues]);
    setCards(gameCards);
  }, [user.difficulty]);

  // Shuffle function
  const shuffle = (array) => {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const handleFlip = (index) => {
    if (flipped.includes(index) || matched.includes(index) || gameOver) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameOver(true);
    }
  }, [matched, cards]);

  const restartGame = () => {
    const pairs = difficulties[user.difficulty] || 6;
    const cardValues = Array.from({ length: pairs }, (_, i) => i + 1);
    const gameCards = shuffle([...cardValues, ...cardValues]);
    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameOver(false);
  };

  return (
    <div className="container d-flex flex-column align-items-center py-5">
      <h2 className="mb-4 text-center">🧠 Memory Game</h2>

      {!gameOver ? (
        <>
          <div
            className="memory-board"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(6, Math.ceil(cards.length / 3))}, 100px)`,
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {cards.map((value, index) => (
              <button
                key={index}
                className={`btn fs-3 ${
                  flipped.includes(index) || matched.includes(index)
                    ? "btn-primary text-white"
                    : "btn-outline-secondary"
                }`}
                style={{ width: "100px", height: "100px" }}
                onClick={() => handleFlip(index)}
              >
                {flipped.includes(index) || matched.includes(index) ? value : "❓"}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <h5>Moves: {moves}</h5>
          </div>

          <div className="mt-3 d-flex flex-wrap justify-content-center">
            <button className="btn btn-success me-2 mb-2" onClick={restartGame}>
              🔄 Restart
            </button>
            <a href="/games" className="btn btn-outline-primary mb-2">
              ⬅ Back to Games
            </a>
          </div>
        </>
      ) : (
        <div className="card col-12 col-md-6 p-4 mt-4 shadow-lg text-center">
          <h2 className="text-danger">🎉 Game Over!</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Difficulty:</strong> {user.difficulty}</p>
          <p><strong>Total Moves:</strong> {moves}</p>
          <button className="btn btn-success mt-3" onClick={restartGame}>
            🔄 Restart Game
          </button>
          <a href="/games" className="btn btn-outline-primary mt-3 ms-2">
            ⬅ Back to Games
          </a>
        </div>
      )}
    </div>
  );
}
