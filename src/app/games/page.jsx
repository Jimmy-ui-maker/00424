"use client";
import Link from "next/link";

export default function GamesPage() {
  const games = [
    { name: "Snake", slug: "snake", desc: "Classic snake game with difficulty levels." },
    { name: "Tic-Tac-Toe", slug: "tic-tac-toe", desc: "Play against a friend or AI." },
    { name: "Memory Game", slug: "memory", desc: "Test your memory with card flips." },
    { name: "Endless Runner", slug: "runner", desc: "Run as fast as you can and dodge obstacles." },
    { name: "Word Scramble", slug: "word-scramble", desc: "Unscramble letters to find hidden words. Includes timer and difficulty levels." },
    { name: "Word Scrabble", slug: "word-scrabble", desc: "Unscrabble letters to find hidden words. Includes timer and difficulty levels." },
    { name: "Quiz Game", slug: "quiz", desc: "Answer trivia questions and test your knowledge." },
    { name: "Pong", slug: "pong", desc: "Classic paddle-and-ball game against AI or a friend." },
    { name: "2048", slug: "2048", desc: "Combine tiles to reach the 2048 number." },
    { name: "Sudoku", slug: "sudoku", desc: "Solve challenging number puzzles." },
    { name: "Minesweeper", slug: "minesweeper", desc: "Uncover tiles while avoiding mines." },
    { name: "Chess", slug: "chess", desc: "Challenge yourself or a friend in chess." },
    { name: "Hangman", slug: "hangman", desc: "Guess the word before it's too late." },
    { name: "Flappy Ball", slug: "flappy", desc: "Tap to keep the ball flying and avoid pipes." },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4">🎮 Game Dashboard</h1>
      <div className="row">
        {games.map((game) => (
          <div className="col-md-4 mb-4" key={game.slug}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text flex-grow-1">{game.desc}</p>
                <Link href={`/games/${game.slug}`} className="btn btn-primary mt-auto">
                  Play {game.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
