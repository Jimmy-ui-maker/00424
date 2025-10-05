"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const WORDS = {
  simple: [
    "apple",
    "book",
    "chair",
    "grass",
    "mouse",
    "table",
    "bread",
    "water",
  ],
  medium: [
    "elephant",
    "football",
    "computer",
    "building",
    "airplane",
    "library",
  ],
  hard: [
    "javascript",
    "imagination",
    "encyclopedia",
    "architecture",
    "astronaut",
  ],
};

export default function WordScrambleGame({ user }) {
  const [difficulty, setDifficulty] = useState(user?.difficulty || "simple");
  const [words, setWords] = useState([...WORDS[user?.difficulty || "simple"]]);
  const [currentWord, setCurrentWord] = useState("");
  const [scrambledWord, setScrambledWord] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [message, setMessage] = useState("");
  const [usedWords, setUsedWords] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Shuffle a word
  const scrambleWord = (word) =>
    word
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

  // Start new game or next word
  const startGame = () => {
    if (words.length === 0) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambledWord(scrambleWord(word));
    setInput("");
    setMessage("");
    setIsPlaying(true);
    setPaused(false);
    setTime(difficulty === "simple" ? 40 : difficulty === "medium" ? 30 : 20);
  };

  // Timer logic
  useEffect(() => {
    if (!isPlaying || paused) return;
    if (time <= 0) {
      setMessage("⏰ Time’s up!");
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, isPlaying, paused]);

  // Handle guess
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === currentWord.toLowerCase()) {
      setScore(score + 10);
      setMessage("✅ Correct!");
      const updatedUsedWords = [...usedWords, currentWord];
      const remainingWords = words.filter((w) => w !== currentWord);

      setUsedWords(updatedUsedWords);
      setWords(remainingWords);

      if (remainingWords.length === 0) {
        // ✅ Trigger game over properly
        setTimeout(() => {
          setGameOver(true);
          setIsPlaying(false);
          setMessage("🎯 You’ve completed all words!");
        }, 800);
      } else {
        setTimeout(() => startGame(), 800);
      }
    } else {
      setMessage("❌ Try again!");
    }
  };

  // Shuffle / Skip
  const handleShuffle = () => {
    const shuffled = scrambleWord(currentWord);
    setScrambledWord(shuffled);
    setMessage("🔄 Shuffled!");
  };

  // Cheat (pause for 5 seconds)
  const handleCheat = () => {
    setPaused(true);
    setMessage(`😈 Cheat mode activated! Word: ${currentWord}`);
    setTimeout(() => {
      setPaused(false);
      setMessage("⏳ Back to play!");
    }, 5000);
  };

  // Restart
  const resetGame = () => {
    setScore(0);
    setMessage("");
    setIsPlaying(false);
    setPaused(false);
    setGameOver(false);
    setWords([...WORDS[difficulty]]);
    setUsedWords([]);
    setTime(30);
  };

  return (
    <div className="container py-4 text-center">
      {!gameOver ? (
        <div
          className="card shadow-lg mx-auto p-4"
          style={{ maxWidth: "520px" }}
        >
          <h2 className="mb-3">🧠 Word Scramble</h2>
          <p className="text-muted mb-1">Player: {user?.name}</p>
          <p className="text-muted">Difficulty: {difficulty.toUpperCase()}</p>

          {isPlaying ? (
            <>
              <div className="my-3">
                <h4 className="fw-bold text-primary display-6">
                  {scrambledWord || "------"}
                </h4>
              </div>

              <div className="mb-3">
                <h5>⏱️ Time Left: {time}s</h5>
                <h5>🏆 Score: {score}</h5>
                <p>
                  Words Left:{" "}
                  <strong>
                    {words.length} / {WORDS[difficulty].length}
                  </strong>
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="form-control text-center mb-3"
                  placeholder="Type your guess..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                  autoFocus
                  disabled={paused}
                />
                <button
                  className="btn btn-success w-100 mb-2"
                  disabled={paused}
                >
                  Submit
                </button>
              </form>

              <div className="d-flex justify-content-between mt-2">
                <button
                  onClick={handleShuffle}
                  className="btn btn-outline-primary flex-fill me-1"
                  disabled={paused}
                >
                  🔀 Shuffle
                </button>
                <button
                  onClick={handleCheat}
                  className="btn btn-outline-danger flex-fill ms-1"
                  disabled={paused}
                >
                  😈 Cheat (5s)
                </button>
              </div>

              <p className="mt-3 fs-5">{message}</p>
            </>
          ) : (
            <button onClick={startGame} className="btn btn-primary w-100 mt-3">
              Start Game
            </button>
          )}

          {!isPlaying && usedWords.length > 0 && (
            <button
              onClick={resetGame}
              className="btn btn-outline-danger mt-3 w-100"
            >
              Restart
            </button>
          )}
        </div>
      ) : (
        <div
          className="card shadow-lg mx-auto p-4 mt-5"
          style={{ maxWidth: "520px" }}
        >
          <h2 className="">🎉 Game Over!</h2>
          <p className="fs-5">Final Score: {score}</p>
          <p>
            Words Completed: {usedWords.length} / {WORDS[difficulty].length}
          </p>

          <div className="d-flex justify-content-center mt-3 gap-2">
            <button onClick={resetGame} className="btn btn-success">
              🔄 Restart
            </button>
            <Link href="/games" className="btn btn-outline-primary">
              ⬅ Back to Games
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
